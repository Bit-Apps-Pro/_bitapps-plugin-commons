/* eslint-disable i18next/no-literal-string */
import LucideIcn from '@icons/LucideIcn'
import { Alert } from 'antd'
import Link from 'antd/es/typography/Link'

export function BitAppsPluginUtilUpdateNotice() {
  if (!import.meta.env.DEV) return

  if (typeof VITE_PLUGIN_HAS_SUBMODULE_UPDATES !== 'undefined' && VITE_PLUGIN_HAS_SUBMODULE_UPDATES) {
    return (
      <Alert
        closable
        css={{ padding: 10 }}
        description={
          <>
            <code>_bitapps-plugin-commons</code> submodule updated, please pull new changes from{' '}
            <Link href="https://github.com/Bit-Apps-Pro/_bitapps-plugin-commons" target="_blank">
              GitHub
            </Link>
            . If you already pulled the changes, please restart the dev server. and run{' '}
            <code>pnpm sync-plugin-commons</code> if needed.
          </>
        }
        icon={<LucideIcn name="circle-alert" />}
        message="Plugin Submodule Update Notice (Dev Only)"
        showIcon
        type="warning"
      />
    )
  }

  return
}
