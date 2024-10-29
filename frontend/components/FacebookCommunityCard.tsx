import LucideIcn from '@icons/LucideIcn'
import fbCommunityImg from '@plugin-commons/resources/img/fbCommunity.webp'
import { Button, Flex, theme } from 'antd'

export default function FacebookCommunityCard({
  facebookCommunityLink
}: {
  facebookCommunityLink: string
}) {
  const { token } = theme.useToken()

  return (
    <Flex
      align="center"
      css={{
        border: `1px solid ${token.colorBorder}`,
        borderRadius: 10,
        marginTop: 30,
        overflow: 'hidden',
        position: 'relative'
      }}
      gap={20}
      justify="center"
      vertical
    >
      <div
        css={{
          backgroundImage: `url(${fbCommunityImg})`,
          backgroundSize: 'cover',
          height: 165,
          width: '100%'
        }}
      />
      <Flex
        css={{
          background: 'linear-gradient(0deg, #00169a, transparent)',
          height: 205,
          paddingLeft: 20,
          position: 'absolute',
          top: '-11%',
          width: '100%'
        }}
        justify="end"
        vertical
      >
        <h3 css={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>Join Our Facebook Community</h3>
        <p css={{ color: 'white', fontSize: 18 }}>
          Connect, share, and grow with like-minded individuals
        </p>
      </Flex>
      <Flex css={{ marginBlock: 0 }} gap={15} justify="center">
        <span>🌟 Exclusive Content</span>
        <span>💬 Daily Discussion</span>
        <span>🎉 Special Events</span>
      </Flex>

      <Button
        block
        css={{
          background: '#1877F2 !important',
          borderRadius: '100px !important',
          color: 'white !important',
          marginBottom: 20,
          width: '90%!important'
        }}
        href={facebookCommunityLink}
        icon={<LucideIcn name="facebook" />}
        size="large"
        target="_blank"
      >
        Join Now
      </Button>
    </Flex>
  )
}
