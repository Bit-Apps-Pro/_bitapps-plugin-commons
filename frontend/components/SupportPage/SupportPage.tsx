import config from '@config/config'
import LucideIcn from '@icons/LucideIcn'
import License from '@plugin-commons/components/License.pro'
import { useQuery } from '@tanstack/react-query'
import { Avatar, Card, Col, Flex, Row, Skeleton, theme, Typography } from 'antd'
import { type ReactNode, useState } from 'react'

import isPro from '../../utils/isPro'
import FacebookCommunityCard from '../FacebookCommunityCard'
import pluginInfoData from './data/pluginInfoData'
import GiveReview from './GiveReview'
import Improvement from './Imporvement'
import SupportLinks from './SupportLinks'

interface Plugin {
  description: string
  doc: string
  icon: string
  name: string
  slug: string
  url: string
}

interface SupportObject {
  bitAppsLogo: string
  pluginsList: Plugin[]
  supportEmail: string
  supportLink: string
}

const { Meta } = Card

const { Link, Paragraph, Text, Title } = Typography

const SUPPORT_FETCH_URL =
  'h_t_t_p_s_:_/_/w_p-ap_i_._b_i_ta_pp_s_._pro_/p_ub_li_c/p_lu_gi_ns-i_nf_o'.replaceAll('_', '')

interface SupportPageProps {
  isCashBackVisible: boolean
  logoComponent: ReactNode
  pluginSlug: string
}

export default function SupportPage({
  isCashBackVisible = true,
  logoComponent,
  pluginSlug
}: SupportPageProps) {
  const { token } = theme.useToken()
  const [loading] = useState(false)

  const { data: supportInfo } = useQuery<SupportObject, Error>({
    queryFn: () => fetch(`${SUPPORT_FETCH_URL}`).then(res => res.json() as Promise<SupportObject>),
    queryKey: ['support'],
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

          {isPro() && <License pluginSlug={pluginSlug} />}

          <Improvement />

          <SupportLinks pluginSlug={pluginSlug} />
        </Col>

        <Col md={{ offset: 2, span: 9 }} sm={{ span: 24 }}>
          <div className="mb-5">
            {isCashBackVisible && <GiveReview pluginSlug={pluginSlug} />}

            <FacebookCommunityCard facebookCommunityLink={pluginInfoData.facebookCommunity} />
          </div>
        </Col>
      </Row>

      <Title level={5}>Recommended Plugins</Title>
      <Flex gap={10} wrap>
        {supportInfo?.pluginsList
          .filter(item => item.slug !== config.PLUGIN_SLUG)
          .map((plugin, index: number) => (
            <Card
              css={{ width: 400 }}
              key={`${index * 2}`}
              styles={{ body: { marginTop: 10, padding: 16 } }}
            >
              <Skeleton active avatar loading={loading}>
                <Meta
                  avatar={
                    <Link
                      css={{ '&:focus': { boxShadow: 'none' } }}
                      href={plugin.url}
                      rel="noopener noreferrer nofollow"
                      target="_blank"
                    >
                      <Avatar shape="square" src={plugin.icon} style={{ height: 70, width: 70 }} />
                    </Link>
                  }
                  description={
                    <Text style={{ color: token.colorTextSecondary }}>{plugin.description}</Text>
                  }
                  title={
                    <Link
                      css={{
                        '&:focus': { boxShadow: 'none' },
                        '&:hover': { textDecoration: 'underline !important' }
                      }}
                      href={plugin.url}
                      rel="noopener noreferrer nofollow"
                      style={{ color: token.colorTextSecondary, fontSize: '1rem' }}
                      target="_blank"
                    >
                      {plugin.name}{' '}
                      <LucideIcn
                        name="move-up-right"
                        size={12}
                        style={{ transform: 'translateY(-4px)' }}
                      />
                    </Link>
                  }
                />
              </Skeleton>
            </Card>
          ))}
      </Flex>
    </div>
  )
}
