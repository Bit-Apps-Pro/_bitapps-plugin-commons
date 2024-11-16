import { __ } from '@common/helpers/i18nwrap'
import request from '@common/helpers/request'
import config from '@config/config'
import LucideIcn from '@icons/LucideIcn'
import { Alert, Badge, Button, Space } from 'antd'
import Title from 'antd/es/typography/Title'
import { useEffect, useRef } from 'react'
import { useSearchParam } from 'react-use'

import CheckNewUpdate from './SupportPage/CheckNewUpdate'
import pluginInfo from './SupportPage/data/pluginInfoData'
import useCheckLicenseValidity from './SupportPage/data/useCheckLicenseValidity'

const SUBS_URL =
  `h_t_tps_:/_/subscription_.bitapps_.pro/wp/activateLicense/?slug=${config.PRO_SLUG}&redirect=${encodeURIComponent(window.location.href)}`.replaceAll(
    '_',
    ''
  )

const handleDeactivateLicense = async () => {
  await request('pro_license/deactivate')

  window.location.reload()
}

export default function License({ pluginSlug }: { pluginSlug: string }) {
  const aboutPlugin = pluginInfo.plugins[pluginSlug as keyof typeof pluginInfo.plugins]
  const licenseKey = useRef(useSearchParam('licenseKey'))
  const { isLicenseValid } = useCheckLicenseValidity()

  const {
    FREE_VERSION: freeVersion,
    IS_PRO: isLicenseConnected,
    IS_PRO_EXIST: hasProPlugin,
    PRO_VERSION: proVersion
  } = config

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
        <div className="mb-2">
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

          <CheckNewUpdate />
        </div>
      )}

      {hasProPlugin && (
        <div className="mb-2">
          <div className="mb-2">
            {__('Pro Version')}: {proVersion}
          </div>

          <CheckNewUpdate />

          <div>
            {isLicenseConnected ? (
              <>
                <Button
                  className="mb-2"
                  danger
                  icon={<LucideIcn name="circle-x" />}
                  onClick={handleDeactivateLicense}
                  size="large"
                  type="primary"
                >
                  {isLicenseValid ? __('Deactivate License') : __('Remove License')}
                </Button>

                {!isLicenseValid && (
                  <Alert
                    description={__(
                      `Please update your license to ensure you receive the latest security updates and bug fixes. 
                      Using an outdated or unofficial license may leave your system vulnerable to security breaches and data leaks. We cannot take responsibility for issues arising from such scenarios. For your safety, always download from the official Bit Apps server.`
                    )}
                    message={__('Your license is invalid')}
                    showIcon
                    type="error"
                  />
                )}
              </>
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
        </div>
      )}
    </div>
  )
}
