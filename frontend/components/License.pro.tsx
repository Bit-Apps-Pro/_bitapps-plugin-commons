import { SyncOutlined } from '@ant-design/icons'
import { __ } from '@common/helpers/i18nwrap'
import request from '@common/helpers/request'
import config from '@config/config'
import LucideIcn from '@icons/LucideIcn'
import { Badge, Button, Flex, theme, Tooltip } from 'antd'
import Paragraph from 'antd/es/typography/Paragraph'
import Title from 'antd/es/typography/Title'
import { useEffect, useRef } from 'react'
import { useSearchParam } from 'react-use'

import pluginInfo from './SupportPage/data/pluginInfoData'

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
  const aboutPlugin = pluginInfo.plugins[pluginSlug as keyof typeof pluginInfo.plugins]

  const isCheckingUpdates = true
  const isNewVersionAvailable = true
  const isProNewVersionAvailable = true
  const isPro = true
  const isProCheckingUpdates = true
  const freeVersion = '1.2.4'
  const availableNewFreeVersion = '1.2.3'
  const proVersion = '1.2.2'
  const availableNewProVersion = '1.2.3'
  // const isFreeUptoDate = !isCheckingUpdates && !isNewVersionAvailable
  // const isProUptoDate = isPro && !isProNewVersionAvailable && !isProCheckingUpdates
  const isLicenseConnected = config.IS_PRO

  const licenseKey = useRef(useSearchParam('licenseKey'))

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
      <Paragraph>
        <Flex align="center" gap={15}>
          Version: {freeVersion}
          {isCheckingUpdates && (
            <b>
              Checking updates &nbsp;&nbsp; <SyncOutlined spin />
            </b>
          )}
          {isNewVersionAvailable && (
            <Flex align="center" gap={10}>
              <b>New version ({availableNewFreeVersion}) available</b>
              <Badge dot>
                <Button icon={<LucideIcn name="circle-fading-arrow-up" />}>Update Now</Button>
              </Badge>
              <Tooltip title="Please update to the latest version to ensure plugin security and optimal performance. Stay safe and enjoy the enhanced features!">
                <div>
                  <LucideIcn css={{ color: token.colorTextTertiary }} name="info" size="22" />
                </div>
              </Tooltip>
            </Flex>
          )}
          {/* {!isCheckingUpdates && !isNewVersionAvailable && (
            <Flex gap={10}>
              <b{__(Latest)}/b>
              <LucideIcn color={token.green6} name="circle-check" />
            </Flex>
          )} */}
        </Flex>

        {!isPro && (
          <Flex align="center" css={{ marginTop: 5 }} gap={15}>
            Pro Version: <b>Not Activated</b>
            <Badge dot>
              <Button
                href={aboutPlugin.buyLink}
                icon={<LucideIcn name="crown" />}
                rel="noopener noreferrer nofollow"
                target="_blank"
              >
                Buy Pro Version
              </Button>
            </Badge>
          </Flex>
        )}

        {isPro && (
          <Flex css={{ marginTop: 5 }} gap={10} vertical>
            <Flex gap={15}>
              Pro Version: {proVersion}
              {isProCheckingUpdates && (
                <b>
                  Checking updates &nbsp;&nbsp; <SyncOutlined spin />
                </b>
              )}
              {isProNewVersionAvailable && (
                <Flex align="center" gap={10}>
                  <b>New version ({availableNewProVersion}) available</b>
                  <Badge dot>
                    <Button icon={<LucideIcn name="circle-fading-arrow-up" />}>Update Now</Button>
                  </Badge>
                  <Tooltip title="Please update to the latest version to ensure plugin security and optimal performance. Stay safe and enjoy the enhanced features!">
                    <div>
                      <LucideIcn css={{ color: token.colorTextTertiary }} name="info" size="22" />
                    </div>
                  </Tooltip>
                </Flex>
              )}
            </Flex>
            {/* {isProUptoDate && (
              <Flex gap={10}>
                <b{__(Latest)}/b>
                <LucideIcn color={token.green6} name="circle-check" />
              </Flex>
            )} */}

            <Flex>
              {isLicenseConnected ? (
                <Button
                  danger
                  icon={<LucideIcn name="circle-x" />}
                  onClick={handleDeactivateLicense}
                  size="large"
                  type="primary"
                >
                  Deactivate License
                </Button>
              ) : (
                <Button
                  icon={<LucideIcn name="badge-check" />}
                  onClick={handleActivateLicense}
                  size="large"
                  type="primary"
                >
                  Activate License
                </Button>
              )}
            </Flex>
          </Flex>
        )}
      </Paragraph>
    </div>
  )
}
