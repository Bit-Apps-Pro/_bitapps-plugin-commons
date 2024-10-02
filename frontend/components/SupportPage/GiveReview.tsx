import config from '@config/config'
import { Badge, Button } from 'antd'
import Link from 'antd/es/typography/Link'
import pluginInfoData from './data/pluginInfoData'
import LucideIcn from '@icons/LucideIcn'

export default function GiveReview({ pluginSlug }: { pluginSlug: string }) {
  const aboutPlugin = pluginInfoData.plugins[pluginSlug as keyof typeof pluginInfoData.plugins]

  return (
    <div
      css={{
        padding: 6,
        borderRadius: 14,
        background:
          'linear-gradient(135deg, hsla(260, 100%, 80%, 1) 0%, hsla(338, 100%, 71%, 1) 25%, hsla(215, 95%, 78%, 1) 55%, hsla(116, 41%, 78%, 1) 79%, hsla(330, 53%, 77%, 1) 100%)',
        backgroundSize: '300% 300%',
        animation: 'gradient-animation 5s ease infinite'
      }}
    >
      <Badge.Ribbon
        color="geekblue"
        text={
          <span css={{ fontSize: 16, padding: 5 }}>
            <LucideIcn name="dollar-sign" /> Cash Back
          </span>
        }
      >
        <div
          css={{
            background: '#0c0029',
            borderRadius: 10,
            padding: 20
          }}
        >
          <h4 css={{ color: 'white!important' }}>
            Hi {SERVER_VARIABLES.loggedInUserName}, <span css={{ fontSize: 23 }}>👋</span>
          </h4>
          <p css={{ color: '#ccccd5', fontSize: 16 }}>
            We want your feedback! <Link href={aboutPlugin.reviewLink}>Write a review</Link> of your
            experience with {config.PRODUCT_NAME}, and we'll send you a{' '}
            <b style={{ color: 'white' }}>$10 Cash back</b> to say thanks!
            <br />
            To claim your cash back, simply reply to support with a screenshot or link of your review.
            <br />
          </p>
          <Button
            block
            href={aboutPlugin.reviewLink}
            target="_blank"
            rel="noopener noreferrer"
            type="primary"
            size="large"
            icon="💬"
            css={{
              marginTop: 10,
              borderRadius: '100px!important',
              background: '#a300ff!important',
              color: 'white!important'
            }}
          >
            Review Now
          </Button>
        </div>
      </Badge.Ribbon>
    </div>
  )
}
