import LucideIcn from '@icons/LucideIcn'
import { Alert } from 'antd'
import Link from 'antd/es/typography/Link'

export function BitAppsPluginUtilUpdateNotice() {
  if (
    import.meta.env.DEV &&
    typeof VITE_PLUGIN_HAS_SUBMODULE_UPDATES !== 'undefined' &&
    VITE_PLUGIN_HAS_SUBMODULE_UPDATES
  ) {
    return (
      <Alert
        type="warning"
        showIcon
        icon={<LucideIcn name="circle-alert" />}
        closable
        message={
          <>
            "_bitapps-plugin-commons" updated, please pull new changes from{' '}
            <Link href="https://github.com/Bit-Apps-Pro/_bitapps-plugin-commons" target="_blank">
              GitHub
            </Link>
            .
            <br />
            If you already pulled the changes, please restart the dev server.
          </>
        }
      />
    )
  }

  return
}
