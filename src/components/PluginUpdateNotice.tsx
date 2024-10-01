/*
  This component will be displayed in the WordPress admin dashboard if the plugin needs to be updated.
  It will prompt the user to update the plugin to the latest version.
*/

import { SyncOutlined } from '@ant-design/icons'
import useUpdatePlugin from '@bitapps-plugin-utils/components/VersionMismatchedNotice/useUpdatePlugin'
import { Button } from 'antd'

export default function PluginUpdateNotice() {
  const { isLoadingUpdatePlugin, updatePlugin } = useUpdatePlugin()

  const proPluginVersion = SERVER_VARIABLES.proPluginVersion || ''

  const freePLuginVersion = SERVER_VARIABLES.version || ''

  if (proPluginVersion === freePLuginVersion) {
    return
  }

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
          To maintain consistency between the Free and Pro versions, please update your plugin to ensure
          both versions share the same version number.
        </p>
        <Button
          onClick={updatePlugin}
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
      </div>
    </div>
  )
}
