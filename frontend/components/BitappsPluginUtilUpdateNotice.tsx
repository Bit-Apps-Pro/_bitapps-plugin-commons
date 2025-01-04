import { __ } from '@common/helpers/i18nwrap'
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
            <code>{__('_bitapps-plugin-commons')}</code>
            {__('submodule updated, please pull new changes from')}
            <Link href="https://github.com/Bit-Apps-Pro/_bitapps-plugin-commons" target="_blank">
              {__('GitHub')}
            </Link>
            {__('. If you already pulled the changes, please restart the dev server. and run')}
            <code>{__('pnpm sync-plugin-commons')}</code> {__('if needed.')}
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
