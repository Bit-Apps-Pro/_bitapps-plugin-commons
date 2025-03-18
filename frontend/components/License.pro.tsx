import { __ } from '@common/helpers/i18nWrap'
import request from '@common/helpers/request'
import config from '@config/config'
import LucideIcn from '@icons/LucideIcn'
import If from '@utilities/If'
import { Badge, Button, Space, Tag, Typography } from 'antd'
import Title from 'antd/es/typography/Title'
import { useEffect, useRef } from 'react'
import { useAsync, useSearchParam } from 'react-use'

import LicenseActivationNotice from './LicenseActivationNotice.pro'
import CheckNewUpdate from './SupportPage/CheckNewUpdate'
import pluginInfo from './SupportPage/data/pluginInfoData'

const SUBS_URL =
  `h_t_tps_:/_/subscription_.bitapps_.pro/wp/activateLicense/?slug=${config.PRO_SLUG}&redirect=${encodeURIComponent(window.location.href)}`.replaceAll(
    '_',
    ''
  )

const SITE_BASE_URL = config.SITE_BASE_URL?.endsWith('/')
  ? config.SITE_BASE_URL.slice(0, -1)
  : config.SITE_BASE_URL

const handleDeactivateLicense = async () => {
  if (SITE_BASE_URL !== config.SITE_URL) return

  await request('pro_license/deactivate')

  window.location.reload()
}

const getCurrentBuildCodeName = (): string | undefined => {
  const scripts = [...document.scripts]
  for (const sc of scripts) {
    if (sc.src.includes('bit-pi') && sc.src.includes('main')) {
      return sc?.src
        ?.split('/')
        ?.at(-1)
        ?.replace('main', '')
        ?.replace('.js', '')
        ?.split('-')
        .filter(Boolean)
        .join('-')
    }
  }
}

export default function License({ pluginSlug }: { pluginSlug: string }) {
  const aboutPlugin = pluginInfo.plugins[pluginSlug as keyof typeof pluginInfo.plugins]
  const licenseKey = useRef(useSearchParam('licenseKey'))
  const freeBuildCodeName = useAsync(async () => {
    const res = await fetch(`/wp-content/plugins/${config.PLUGIN_SLUG}/assets/build-code-name.txt`)
    const text = await res.text()
    return text
  })

  const proBuildCodeName = useAsync(async () => {
    const res = await fetch(`/wp-content/plugins/${config.PRO_SLUG}/assets/build-code-name.txt`)
    const text = await res.text()
    return text
  })

  const currentBuildCodeName = getCurrentBuildCodeName()

  const {
    FREE_VERSION: freeVersion,
    IS_PRO: isLicenseConnected,
    IS_PRO_EXIST: hasProPlugin,
    PRO_VERSION: proVersion
  } = config

  const handleActivateLicense = () => {
    if (isLicenseConnected || SITE_BASE_URL !== config.SITE_URL) return

    const openedWindow = window.open(SUBS_URL, 'newWindow', 'width=800,height=600')

    const windowCloseChecker = setInterval(() => {
      if (!openedWindow?.closed) return

      clearInterval(windowCloseChecker)

      window.location.reload()
    }, 1000)
  }

  const activateLicense = async () => {
    await request('pro_license/activate', { licenseKey: licenseKey.current })

    //remote validity check data from local storage
    localStorage.removeItem(btoa(`${config.PRO_SLUG}-check-validity`))

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

      <If conditions={currentBuildCodeName === '.tsx'}>
        <Tag className="mb-2 font-bold" color="blue">
          {__('Dev Version On')}
        </Tag>
      </If>

      <div className="mb-2">
        {__('Version')}: {freeVersion}
        <If conditions={[!freeBuildCodeName?.loading, !freeBuildCodeName?.value?.includes('<html')]}>
          <Typography.Text className="ml-2 text-xs" type="secondary">
            {__('Code Name: ')}

            {freeBuildCodeName?.value}
            <If conditions={freeBuildCodeName?.value === currentBuildCodeName}>
              <LucideIcn className="ml-1" name="check" />
            </If>
          </Typography.Text>
        </If>
      </div>
      <If conditions={!hasProPlugin}>
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
      </If>

      <If conditions={hasProPlugin}>
        <div className="mb-2">
          <div className="mb-2">
            {__('Pro Version')}: {proVersion}{' '}
            <If conditions={[!proBuildCodeName?.loading, !proBuildCodeName?.value?.includes('<html')]}>
              <Typography.Text className="ml-2 text-xs" type="secondary">
                {__('Code Name: ')}
                {proBuildCodeName?.value}
                <If conditions={proBuildCodeName?.value === currentBuildCodeName}>
                  <LucideIcn className="ml-1" name="check" />
                </If>
              </Typography.Text>
            </If>
          </div>

          <CheckNewUpdate />

          <div>
            {isLicenseConnected ? (
              <>
                <Button
                  className="mb-2"
                  danger
                  disabled={SITE_BASE_URL !== config.SITE_URL}
                  icon={<LucideIcn name="circle-x" />}
                  onClick={handleDeactivateLicense}
                  size="large"
                  type="primary"
                >
                  {__('Deactivate License')}
                </Button>

                <LicenseActivationNotice />
              </>
            ) : (
              <Button
                disabled={SITE_BASE_URL !== config.SITE_URL}
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
      </If>
    </div>
  )
}
