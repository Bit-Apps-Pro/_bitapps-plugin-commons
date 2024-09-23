/*
  This component will be displayed in the WordPress admin dashboard if the plugin needs to be updated.
  It will prompt the user to update the plugin to the latest version.
*/
export default function PluginUpdateNotice() {
  
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
        <h4 className="mt-2">Plugin Update Required (Bit Social)</h4>
        <p>
          To maintain consistency between the Free and Pro versions, please update your plugin to ensure
          both versions share the same version number.
        </p>
        <button
          style={{
            background: '#3858e9',
            color: '#fff',
            padding: '6px 12px',
            border: 'none',
            marginBottom: 10,
            cursor: 'pointer',
            fontWeight: 400
          }}
        >
          Update Now
        </button>
      </div>
    </div>
  )
}
