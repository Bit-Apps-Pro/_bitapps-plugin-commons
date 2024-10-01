import { useState, type ReactNode } from 'react'

import config from '@config/config'
import LucideIcn from '@icons/LucideIcn'
import { useQuery } from '@tanstack/react-query'
import { Avatar, Card, Col, Flex, Row, Skeleton, Typography, theme } from 'antd'
import FacebookCommunityCard from '../FacebookCommunityCard'
import pluginInfoData from './data/pluginInfoData'
import GiveReview from './GiveReview'
import Improvement from './Imporvement'
import SupportLinks from './SupportLinks'
import ProExistLoader from '../ProExistLoader'

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
  isCashBackVisible: boolean
}

export default function SupportPage({
  pluginSlug,
  logoComponent,
  isCashBackVisible = true
}: SupportPageProps) {
  const { token } = theme.useToken()
  const [loading] = useState(false)

  const { data: supportInfo } = useQuery<SupportObject, Error>({
    queryKey: ['support'],
    queryFn: () => fetch(`${SUPPORT_FETCH_URL}`).then(res => res.json() as Promise<SupportObject>),
    staleTime: 1000 * 60 * 60 * 12 // 12 hours
  })

  const aboutPlugin = pluginInfoData.plugins[pluginSlug as keyof typeof pluginInfoData.plugins]

  return (
    <div>
      {logoComponent}

      <Row justify="center">
        <Col md={12} sm={24}>
          <div css={{ marginBottom: 70 }}>
            <Title level={5}>About {aboutPlugin.title}</Title>
            <Paragraph style={{ color: token.colorTextSecondary }}>{aboutPlugin.description}</Paragraph>
          </div>

          {/* <ProExistLoader
            freeFallback={<></>}
            loadingFallback={
              <>
                <Title level={5}>License & Activation</Title>
                <Skeleton active title round />
              </>
            }
          >
            {({ ProLicenseChecker }) => <ProLicenseChecker pluginSlug={pluginSlug} />}
          </ProExistLoader> */}

          <Improvement />

          <SupportLinks pluginSlug={pluginSlug} />
        </Col>

        <Col md={{ span: 9, offset: 2 }} sm={{ span: 24 }}>
          <div className="mb-5">
            {isCashBackVisible && <GiveReview pluginSlug={pluginSlug} />}

            <FacebookCommunityCard facebookCommunityLink={pluginInfoData.facebookCommunity} />
          </div>
        </Col>
      </Row>

      <Title level={5}>Recommended Plugins</Title>
      <Flex wrap gap={10}>
        {supportInfo?.pluginsList
          .filter(item => item.slug !== config.PLUGIN_SLUG)
          .map((plugin, index: number) => (
            <Card
              key={`${index * 2}`}
              styles={{ body: { padding: 16, marginTop: 10 } }}
              css={{ width: 400 }}
            >
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
      </Flex>
    </div>
  )
}
