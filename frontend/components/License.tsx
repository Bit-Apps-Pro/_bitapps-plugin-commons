import { SyncOutlined } from '@ant-design/icons'
import pluginInfo from './SupportPage/data/pluginInfoData'
import request from '@common/helpers/request'
import config from '@config/config'
import LucideIcn from '@icons/LucideIcn'
import { Badge, Button, Flex, theme, Tooltip } from 'antd'
import Paragraph from 'antd/es/typography/Paragraph'
import Title from 'antd/es/typography/Title'
import { useEffect, useRef } from 'react'
import { useSearchParam } from 'react-use'

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
  await request('pro_license/deactivate')

  window.location.reload()
}

export default function License({ pluginSlug }: { pluginSlug: string }) {
  const { token } = theme.useToken()
  const aboutPlugin = pluginInfo.plugins[pluginSlug as keyof typeof pluginInfo.plugins]

  const isCheckingUpdates = false
  const isNewVersionAvailable = false
  const isProNewVersionAvailable = false
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
    <>
      <Title level={5}>License & Activation</Title>
      <Paragraph>
        <Flex gap={15} align="center">
          Version: {freeVersion}
          {isCheckingUpdates && (
            <b>
              Checking updates &nbsp;&nbsp; <SyncOutlined spin />
            </b>
          )}
          {isNewVersionAvailable && (
            <Flex gap={10} align="center">
              <b>New version ({availableNewFreeVersion}) available</b>
              <Badge dot>
                <Button icon={<LucideIcn name="circle-fading-arrow-up" />}>Update Now</Button>
              </Badge>
              <Tooltip title="Please update to the latest version to ensure plugin security and optimal performance. Stay safe and enjoy the enhanced features!">
                <div>
                  <LucideIcn name="info" size="22" css={{ color: token.colorTextTertiary }} />
                </div>
              </Tooltip>
            </Flex>
          )}
          {/* {!isCheckingUpdates && !isNewVersionAvailable && (
            <Flex gap={10}>
              <b>Latest</b>
              <LucideIcn color={token.green6} name="circle-check" />
            </Flex>
          )} */}
        </Flex>

        {!isPro && (
          <Flex gap={15} align="center" css={{ marginTop: 5 }}>
            Pro Version: <b>Not Activated</b>
            <Badge dot>
              <Button
                target="_blank"
                icon={<LucideIcn name="crown" />}
                href={aboutPlugin.buyLink}
                rel="noopener noreferrer nofollow"
              >
                Buy Pro Version
              </Button>
            </Badge>
          </Flex>
        )}

        {isPro && (
          <Flex gap={10} vertical css={{ marginTop: 5 }}>
            <Flex gap={15}>
              Pro Version: {proVersion}
              {isProCheckingUpdates && (
                <b>
                  Checking updates &nbsp;&nbsp; <SyncOutlined spin />
                </b>
              )}
              {isProNewVersionAvailable && (
                <Flex gap={10} align="center">
                  <b>New version ({availableNewProVersion}) available</b>
                  <Badge dot>
                    <Button icon={<LucideIcn name="circle-fading-arrow-up" />}>Update Now</Button>
                  </Badge>
                  <Tooltip title="Please update to the latest version to ensure plugin security and optimal performance. Stay safe and enjoy the enhanced features!">
                    <div>
                      <LucideIcn name="info" size="22" css={{ color: token.colorTextTertiary }} />
                    </div>
                  </Tooltip>
                </Flex>
              )}
            </Flex>
            {/* {isProUptoDate && (
              <Flex gap={10}>
                <b>Latest</b>
                <LucideIcn color={token.green6} name="circle-check" />
              </Flex>
            )} */}

            <Flex>
              {isLicenseConnected ? (
                <Button
                  onClick={handleDeactivateLicense}
                  icon={<LucideIcn name="circle-x" />}
                  type="primary"
                  size="large"
                  danger
                >
                  Deactivate License
                </Button>
              ) : (
                <Button
                  onClick={handleActivateLicense}
                  icon={<LucideIcn name="badge-check" />}
                  type="primary"
                  size="large"
                >
                  Activate License
                </Button>
              )}
            </Flex>
          </Flex>
        )}
      </Paragraph>
    </>
  )
}
