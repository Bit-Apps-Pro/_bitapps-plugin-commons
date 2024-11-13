import { SyncOutlined } from '@ant-design/icons'
import { __ } from '@common/helpers/i18nwrap'
import request from '@common/helpers/request'
import config from '@config/config'
import LucideIcn from '@icons/LucideIcn'
import { Badge, Button, Space, theme, Tooltip } from 'antd'
import Title from 'antd/es/typography/Title'
import { useEffect, useRef } from 'react'
import { useSearchParam } from 'react-use'

import { versionCompare } from '../utils/utils'
import pluginInfo from './SupportPage/data/pluginInfoData'
import useCheckUpdate from './SupportPage/data/useCheckUpdate'

// TODO: add update functionality
// TODO: changelog fetch
// TODO: check license each time user opens the plugin,
// TODO: activate license
// TODO: deactivate license

const SUBS_URL =
  `h_t_tps_:/_/subscription_.bitapps_.pro/wp/activateLicense/?slug=${SERVER_VARIABLES.proSlug}&redirect=${window.location.href}`.replaceAll(
    '_',
    ''
  )

const handleDeactivateLicense = async () => {
  const res = await request('pro_license/deactivate')
  console.log('==== ~ res:', res)

  // window.location.reload()
}

export default function License({ pluginSlug }: { pluginSlug: string }) {
  const { token } = theme.useToken()
  const { isCheckingUpdates, latestAvailableVersion } = useCheckUpdate()
  const aboutPlugin = pluginInfo.plugins[pluginSlug as keyof typeof pluginInfo.plugins]
  const licenseKey = useRef(useSearchParam('licenseKey'))

  const isUpdatable = versionCompare(config.FREE_VERSION, String(latestAvailableVersion), '<')
  const hasProPlugin = config.PRO_VERSION
  const freeVersion = config.FREE_VERSION
  const proVersion = config.PRO_VERSION
  const isLicenseConnected = config.IS_PRO

  const handleActivateLicense = () => {
    if (isLicenseConnected) return

    const openedWindow = window.open(SUBS_URL, 'newWindow', 'width=800,height=600')

    const windowCloseChecker = setInterval(() => {
      if (!openedWindow?.closed) return

      clearInterval(windowCloseChecker)

      window.location.reload()
    }, 1000)
  }

  const activateLicense = async () => {
    await request('pro_license/activate', { licenseKey: licenseKey.current })

    window.close()
  }

  useEffect(() => {
    if (!licenseKey.current) return

    const url = new URL(window.location.href)
    url.searchParams.delete('licenseKey')
    window.history.replaceState({}, '', url)

    activateLicense()
  }, [])

  return (
    <div className="mb-12">
      <Title level={5}>{__('License & Activation')}</Title>

      <div className="mb-2">
        {__('Version')}: {freeVersion}
      </div>

      {!hasProPlugin && (
        <Space className="mb-2">
          <div>
            {__('Pro Version')}: <b>{__('Not Activated')}</b>
          </div>
          <Badge dot>
            <Button
              href={aboutPlugin.buyLink}
              icon={<LucideIcn name="crown" />}
              rel="noopener noreferrer nofollow"
              target="_blank"
              type="primary"
            >
              {__('Buy Pro Version')}
            </Button>
          </Badge>
        </Space>
      )}

      {hasProPlugin && (
        <>
          <div className="mb-2">
            {__('Pro Version')}: {proVersion}
          </div>

          <div className="mb-2">
            {isLicenseConnected ? (
              <Button
                danger
                icon={<LucideIcn name="circle-x" />}
                onClick={handleDeactivateLicense}
                size="large"
                type="primary"
              >
                {__('Deactivate License')}
              </Button>
            ) : (
              <Button
                icon={<LucideIcn name="badge-check" />}
                onClick={handleActivateLicense}
                size="large"
                type="primary"
              >
                {__('Activate License')}
              </Button>
            )}
          </div>
        </>
      )}

      <Space>
        {isCheckingUpdates && (
          <Space>
            <b>{__('Checking updates')}</b>
            <SyncOutlined spin />
          </Space>
        )}

        {isUpdatable && (
          <Space>
            <b>
              {__('New version available')} ({latestAvailableVersion})
            </b>
            <Tooltip
              title={__(
                'Please update to the latest version to ensure plugin security and optimal performance. Stay safe and enjoy the enhanced features!'
              )}
            >
              <div>
                <LucideIcn css={{ color: token.colorTextTertiary }} name="info" size="1rem" />
              </div>
            </Tooltip>
          </Space>
        )}

        {!isCheckingUpdates && !isUpdatable && (
          <Space>
            <b>{__('Latest')}</b>
            <LucideIcn color={token.green6} name="circle-check" size="1rem" />
          </Space>
        )}
      </Space>
    </div>
  )
}
