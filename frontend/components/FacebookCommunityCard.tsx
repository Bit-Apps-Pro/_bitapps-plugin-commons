import LucideIcn from '@icons/LucideIcn'
import { Button, Flex, theme } from 'antd'
import fbCommunityImg from '@plugin-commons/resources/img/fbCommunity.webp'

export default function FacebookCommunityCard({
  facebookCommunityLink
}: {
  facebookCommunityLink: string
}) {
  const { token } = theme.useToken()

  return (
    <Flex
      justify="center"
      vertical
      align="center"
      gap={20}
      css={{
        position: 'relative',
        borderRadius: 10,
        overflow: 'hidden',
        border: `1px solid ${token.colorBorder}`,
        marginTop: 30
      }}
    >
      <div
        css={{
          height: 165,
          width: '100%',
          backgroundSize: 'cover',
          backgroundImage: `url(${fbCommunityImg})`
        }}
      />
      <Flex
        vertical
        justify="end"
        css={{
          position: 'absolute',
          background: 'linear-gradient(0deg, #00169a, transparent)',
          width: '100%',
          top: '-11%',
          height: 205,
          paddingLeft: 20
        }}
      >
        <h3 css={{ fontWeight: 'bold', fontSize: 25, color: 'white' }}>Join Our Facebook Community</h3>
        <p css={{ fontSize: 18, color: 'white' }}>
          Connect, share, and grow with like-minded individuals
        </p>
      </Flex>
      <Flex justify="center" gap={15} css={{ marginBlock: 0 }}>
        <span>🌟 Exclusive Content</span>
        <span>💬 Daily Discussion</span>
        <span>🎉 Special Events</span>
      </Flex>

      <Button
        block
        href={facebookCommunityLink}
        target="_blank"
        size="large"
        css={{
          background: '#1877F2 !important',
          color: 'white !important',
          width: '90%!important',
          marginBottom: 20,
          borderRadius: '100px !important'
        }}
        icon={<LucideIcn name="facebook" />}
      >
        Join Now
      </Button>
    </Flex>
  )
}
