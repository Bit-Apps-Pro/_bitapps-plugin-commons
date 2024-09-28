import { XOutlined } from '@ant-design/icons'
import { type IconNames } from '@icons/LucideIcn'
import LucideIcn from '@icons/LucideIcn'
import pluginInfoData from './data/pluginInfoData'
import { Flex, theme, Typography } from 'antd'

const { Title, Link, Text } = Typography

export default function SupportLinks({ pluginSlug }: { pluginSlug: string }) {
  const { token } = theme.useToken()

  const aboutPlugin = pluginInfoData.plugins[pluginSlug as keyof typeof pluginInfoData.plugins]

  const supportLinks = [
    {
      icon: 'mail',
      text: pluginInfoData.supportEmail,
      href: `mailto:${pluginInfoData.supportEmail}`,
      copyable: true
    },
    { icon: 'globe', text: 'Website', href: aboutPlugin.website },
    { icon: 'message-circle', text: 'Chat here', href: pluginInfoData.chatLink },
    { icon: 'linkedin', text: 'LinkedIn', href: pluginInfoData.linkedIn },
    { icon: 'book-check', text: 'Documentation', href: aboutPlugin.docLink },
    { icon: 'youtube', text: 'YouTube Channel', href: pluginInfoData.youtubeChannel },
    { icon: 'facebook', text: 'Facebook Community', href: pluginInfoData.facebookCommunity },
    { icon: <XOutlined />, text: 'X (Formerly Twitter)', href: pluginInfoData.x }
  ]
  return (
    <div className="mb-5">
      <Title level={5}>Support</Title>

      <div css={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {supportLinks.map(({ icon, text, href, copyable }) => (
          <Text key={text}>
            <Flex gap={10}>
              {typeof icon === 'string' ? <LucideIcn name={icon as IconNames} size={18} /> : icon}
              {copyable ? (
                <Text copyable={{ text }}>
                  <Link
                    rel="noopener noreferrer nofollow"
                    href={href}
                    strong
                    underline
                    style={{ color: token.colorText }}
                  >
                    {text}
                  </Link>
                </Text>
              ) : (
                <Link target="_blank" rel="noopener noreferrer nofollow" href={href} strong>
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
