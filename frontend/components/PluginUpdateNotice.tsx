/*
  This component will be displayed in the WordPress admin dashboard if the plugin needs to be updated.
  It will prompt the user to update the plugin to the latest version.
*/

import { SyncOutlined } from '@ant-design/icons'
import useUpdatePlugin from '@bitapps-plugin-commons/components/VersionMismatchedNotice/useUpdatePlugin'
import { Button } from 'antd'
import { type CSSProperties } from 'react'
import { useState } from 'react'

export default function PluginUpdateNotice() {
  const { isLoadingUpdatePlugin, updatePlugin } = useUpdatePlugin()
  const [updateResponse, setUpdateResponse] = useState({ status: '', data: '' })

  const proPluginVersion = SERVER_VARIABLES.proPluginVersion || ''

  const freePLuginVersion = SERVER_VARIABLES.version || ''

  if (proPluginVersion === '' || proPluginVersion === undefined) {
    return
  }

  if (proPluginVersion === undefined || proPluginVersion === '') {
    return
  }

  if (proPluginVersion === freePLuginVersion) {
    return
  }

  const handleUpdate = async () => {
    const res = await updatePlugin()
    setUpdateResponse(res as { status: string; data: string })

    setTimeout(() => {
      if (res.status === 'success') {
        window.location.reload()
      }
    }, 1000)
  }

  const isError = updateResponse.status === 'error'
  const style: CSSProperties = isError
    ? { color: 'red', background: '', marginBlock: 5, textTransform: 'capitalize' }
    : { color: 'green', background: '', marginBlock: 5, textTransform: 'capitalize' }

  return (
    <div
      style={{
        background: 'white',
        padding: '10px 4px',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif'
      }}
    >
      <div className="notice notice-warning">
        <h4 className="mt-2">Plugin Update Required (Bit Social) </h4>
        <p>
          Please update both Free and Pro plugins to the latest version. Keeping them the same is crucial
          to avoid potential issues.
        </p>
        <Button
          onClick={handleUpdate}
          icon={isLoadingUpdatePlugin && <SyncOutlined spin />}
          style={{
            background: '#3858e9',
            color: '#fff',
            border: 'none',
            marginBottom: 10,
            fontWeight: 500,
            borderRadius: 0
          }}
          disabled={isLoadingUpdatePlugin}
        >
          {isLoadingUpdatePlugin ? 'Updating...' : 'Update Now'}
        </Button>

        {updateResponse.status && (
          <div style={style}>
            <b>{updateResponse.status}</b> {updateResponse.data}
          </div>
        )}
      </div>
    </div>
  )
}
