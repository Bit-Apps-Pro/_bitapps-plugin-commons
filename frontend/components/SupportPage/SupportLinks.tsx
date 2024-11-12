import { XOutlined } from '@ant-design/icons'
import { __ } from '@common/helpers/i18nwrap'
import { type LucideIconNames } from '@icons/LucideIcn'
import LucideIcn from '@icons/LucideIcn'
import { Flex, theme, Typography } from 'antd'

import pluginInfoData from './data/pluginInfoData'

const { Link, Text, Title } = Typography

export default function SupportLinks({ pluginSlug }: { pluginSlug: string }) {
  const { token } = theme.useToken()

  const aboutPlugin = pluginInfoData.plugins[pluginSlug as keyof typeof pluginInfoData.plugins]

  const supportLinks = [
    {
      copyable: true,
      href: `mailto:${pluginInfoData.supportEmail}`,
      icon: 'mail',
      text: pluginInfoData.supportEmail
    },
    { href: aboutPlugin.website, icon: 'globe', text: 'Website' },
    { href: pluginInfoData.chatLink, icon: 'message-circle', text: 'Chat here' },
    { href: pluginInfoData.linkedIn, icon: 'linkedin', text: 'LinkedIn' },
    { href: aboutPlugin.docLink, icon: 'book-check', text: 'Documentation' },
    { href: pluginInfoData.youtubeChannel, icon: 'youtube', text: 'YouTube Channel' },
    { href: pluginInfoData.facebookCommunity, icon: 'facebook', text: 'Facebook Community' },
    { href: pluginInfoData.x, icon: <XOutlined />, text: 'X (Formerly Twitter)' },
    { href: aboutPlugin.wpSupportThread, icon: 'messages-square', text: 'WordPress Support Thread' }
  ]
  return (
    <div className="mb-12">
      <Title level={5}>{__('Support')} </Title>

      <div css={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {supportLinks.map(({ copyable, href, icon, text }) => (
          <Text key={text}>
            <Flex gap={10}>
              {typeof icon === 'string' ? <LucideIcn name={icon as LucideIconNames} size={18} /> : icon}
              {copyable ? (
                <Text copyable={{ text }}>
                  <Link
                    href={href}
                    rel="noopener noreferrer nofollow"
                    strong
                    style={{ color: token.colorText }}
                    underline
                  >
                    {text}
                  </Link>
                </Text>
              ) : (
                <Link href={href} rel="noopener noreferrer nofollow" strong target="_blank">
                  {text}
                  <LucideIcn name="move-up-right" size={12} style={{ transform: 'translateY(-4px)' }} />
                </Link>
              )}
            </Flex>
          </Text>
        ))}
      </div>
    </div>
  )
}
