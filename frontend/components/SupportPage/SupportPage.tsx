import { Col, Row, theme, Typography } from 'antd'
import { type ReactNode } from 'react'

import FacebookCommunityCard from '../FacebookCommunityCard'
import License from '../License.pro'
import pluginInfoData from './data/pluginInfoData'
import GiveReview from './GiveReview'
import Improvement from './Imporvement'
import RecommendedPlugins from './RecommendedPlugins'
import SupportLinks from './SupportLinks'

const { Paragraph, Title } = Typography

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

  const aboutPlugin = pluginInfoData.plugins[pluginSlug as keyof typeof pluginInfoData.plugins]

  return (
    <div className="p-5">
      {logoComponent}

      <Row gutter={20}>
        <Col md={15} sm={24}>
          <div className="mb-12">
            <Title level={5}>About {aboutPlugin.title}</Title>
            <Paragraph style={{ color: token.colorTextSecondary }}>{aboutPlugin.description}</Paragraph>
          </div>

          <License pluginSlug={pluginSlug} />

          <Improvement />

          <SupportLinks pluginSlug={pluginSlug} />
        </Col>

        <Col md={9} sm={24}>
          <div className="mb-5">
            {isCashBackVisible && <GiveReview pluginSlug={pluginSlug} />}

            <FacebookCommunityCard facebookCommunityLink={pluginInfoData.facebookCommunity} />
          </div>
        </Col>
      </Row>

      <RecommendedPlugins />
    </div>
  )
}
