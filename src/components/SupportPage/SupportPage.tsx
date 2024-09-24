import { type ReactNode } from 'react'
import { useState } from 'react'

import config from '@config/config'
import LucideIcn from '@icons/LucideIcn'
import { useQuery } from '@tanstack/react-query'
import { Avatar, Card, Checkbox, Col, Flex, Row, Skeleton, Space, Spin, Typography, theme } from 'antd'
import { type CheckboxChangeEvent } from 'antd/es/checkbox'
import useTracking from './data/useTracking'
import useTrackingUpdate from './data/useTrackingUpdate'
import aboutStatic from './data/about.static'
import ProLoader from '../ProLoader'

interface Plugin {
  name: string
  slug: string
  icon: string
  description: string
  doc: string
  url: string
}

interface SupportObject {
  supportEmail: string
  supportLink: string
  bitAppsLogo: string
  pluginsList: Plugin[]
}

const { Meta } = Card

const { Title, Paragraph, Link, Text } = Typography

const SUPPORT_FETCH_URL =
  'h_t_t_p_s_:_/_/w_p-ap_i_._b_i_ta_pp_s_._pro_/p_ub_li_c/p_lu_gi_ns-i_nf_o'.replaceAll('_', '')

interface SupportPageProps {
  pluginSlug: string
  logoComponent: ReactNode
}

export default function SupportPage({ pluginSlug, logoComponent }: SupportPageProps) {
  const { token } = theme.useToken()
  const [loading] = useState(false)
  const { tracking, isTrackingLoading } = useTracking()
  const { updateTracking, isUpdatingTracking } = useTrackingUpdate()
  const { data: supportInfo, isLoading } = useQuery<SupportObject, Error>({
    queryKey: ['support'],
    queryFn: () => fetch(`${SUPPORT_FETCH_URL}`).then(res => res.json() as Promise<SupportObject>),
    staleTime: 1000 * 60 * 60 * 12 // 12 hours
  })

  const aboutPlugin = aboutStatic[pluginSlug as keyof typeof aboutStatic]

  const handleCheckImprovement = (e: CheckboxChangeEvent) => {
    updateTracking(e.target.checked)
  }

  if (isLoading || !supportInfo)
    return (
      <div css={{ padding: 50 }}>
        <Spin tip="Loading" size="large" css={{ zIndex: 99_999 }}>
          <div className="content" />
        </Spin>
      </div>
    )

  return (
    <div>
      {logoComponent}

      <Row justify="center">
        <Col md={12} sm={24}>
          <div className="mb-5">
            <Title level={5}>About {aboutPlugin.title}</Title>
            <Paragraph style={{ color: token.colorTextSecondary }}>{aboutPlugin.description}</Paragraph>
          </div>

          <ProLoader
            freeFallback={<></>}
            loadingFallback={
              <>
                <Title level={5}>License & Activation</Title>
                <Skeleton active title round />
              </>
            }
          >
            {({ ProLicenseChecker }) => <ProLicenseChecker pluginSlug={pluginSlug} />}
          </ProLoader>

          <div className="mb-5 mt-5">
            <Title level={5}>Improvement</Title>
            <Checkbox
              disabled={isTrackingLoading || isUpdatingTracking}
              checked={tracking?.allowTracking}
              style={{ color: token.colorTextSecondary }}
              onChange={handleCheckImprovement}
            >
              <Text underline>
                Allow the collection of diagnostic data and error reports to enhance the application's
                performance. Please review our{' '}
                <Link
                  target="_black"
                  rel="noopener noreferrer nofollow"
                  href="https://bitapps.pro/privacy-policy/"
                >
                  Privacy Policy
                </Link>{' '}
                for more information.
              </Text>
            </Checkbox>
          </div>

          <div className="mb-5">
            <Title level={5}>Support</Title>

            <Space direction="vertical">
              <Text>
                <Flex gap={10}>
                  <LucideIcn name="mail" size={18} />
                  <Text copyable={{ text: supportInfo.supportEmail }}>
                    <Link
                      rel="noopener noreferrer nofollow"
                      href={`mailto:${supportInfo.supportEmail}`}
                      strong
                      underline
                      style={{ color: token.colorText }}
                    >
                      {supportInfo.supportEmail}
                    </Link>
                  </Text>
                </Flex>
              </Text>

              <Text>
                <Flex gap={10}>
                  <LucideIcn name="message-circle" size={18} />
                  <Link
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    href={'https://bit-social.com/contact'}
                    strong
                  >
                    Chat here{' '}
                    <LucideIcn
                      name="move-up-right"
                      size={12}
                      style={{ transform: 'translateY(-4px)' }}
                    />
                  </Link>
                </Flex>
              </Text>

              <Text>
                <Flex gap={10}>
                  <LucideIcn name="book-check" size={18} />
                  <Link
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    href={aboutPlugin.docLink}
                    strong
                  >
                    Documentation
                    <LucideIcn name="move-up-right" size={12} />
                  </Link>
                </Flex>
              </Text>
            </Space>
          </div>
        </Col>

        <Col md={{ span: 9, offset: 2 }} sm={{ span: 24 }}>
          <div className="mb-5">
            <Title level={5}>More Plugins by Bit Apps</Title>

            <Space direction="vertical">
              {supportInfo.pluginsList
                .filter(item => item.slug !== config.PLUGIN_SLUG)
                .map((plugin, index: number) => (
                  <Card key={`${index * 2}`} styles={{ body: { padding: 16, marginTop: 10 } }}>
                    <Skeleton loading={loading} avatar active>
                      <Meta
                        avatar={
                          <Link
                            target="_blank"
                            href={plugin.url}
                            rel="noopener noreferrer nofollow"
                            css={{ '&:focus': { boxShadow: 'none' } }}
                          >
                            <Avatar style={{ height: 70, width: 70 }} shape="square" src={plugin.icon} />
                          </Link>
                        }
                        title={
                          <Link
                            rel="noopener noreferrer nofollow"
                            target="_blank"
                            href={plugin.url}
                            style={{ color: token.colorTextSecondary, fontSize: '1rem' }}
                            css={{
                              '&:focus': { boxShadow: 'none' },
                              '&:hover': { textDecoration: 'underline !important' }
                            }}
                          >
                            {plugin.name}{' '}
                            <LucideIcn
                              name="move-up-right"
                              size={12}
                              style={{ transform: 'translateY(-4px)' }}
                            />
                          </Link>
                        }
                        description={
                          <Text style={{ color: token.colorTextSecondary }}>{plugin.description}</Text>
                        }
                      />
                    </Skeleton>
                  </Card>
                ))}
            </Space>
          </div>
        </Col>
      </Row>
    </div>
  )
}
