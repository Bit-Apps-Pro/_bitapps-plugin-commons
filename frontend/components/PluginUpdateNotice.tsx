/*
  This component will be displayed in the WordPress admin dashboard if the plugin needs to be updated.
  It will prompt the user to update the plugin to the latest version.
*/

import { SyncOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { type CSSProperties } from 'react'
import { useState } from 'react'

import useUpdatePlugin from './VersionMismatchedNotice/useUpdatePlugin'

export default function PluginUpdateNotice() {
  const { isLoadingUpdatePlugin, updatePlugin } = useUpdatePlugin()
  const [updateResponse, setUpdateResponse] = useState({ data: '', status: '' })

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
    setUpdateResponse(res as { data: string; status: string })

    setTimeout(() => {
      if (res.status === 'success') {
        window.location.reload()
      }
    }, 1000)
  }

  const isError = updateResponse.status === 'error'
  const style: CSSProperties = isError
    ? { background: '', color: 'red', marginBlock: 5, textTransform: 'capitalize' }
    : { background: '', color: 'green', marginBlock: 5, textTransform: 'capitalize' }

  return (
    <div
      style={{
        background: 'white',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
        padding: '10px 4px'
      }}
    >
      <div className="notice notice-warning">
        <h4 className="mt-2">Plugin Update Required (Bit Social) </h4>
        <p>
          Please update both Free and Pro plugins to the latest version. Keeping them the same is crucial
          to avoid potential issues.
        </p>
        <Button
          disabled={isLoadingUpdatePlugin}
          icon={isLoadingUpdatePlugin && <SyncOutlined spin />}
          onClick={handleUpdate}
          style={{
            background: '#3858e9',
            border: 'none',
            borderRadius: 0,
            color: '#fff',
            fontWeight: 500,
            marginBottom: 10
          }}
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
