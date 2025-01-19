import { __ } from '@common/helpers/i18nwrap'

export default {
  chatLink: 'https://tawk.to/chat/60eac4b6d6e7610a49aab375/1faah0r3e',
  facebookCommunity: 'https://www.facebook.com/groups/bitcommunityusers',
  linkedIn: 'https://www.linkedin.com/company/bitapps',
  plugins: {
    'bit-flows': {
      buyLink: 'https://bit-flows.com/#pricing/',
      description: __('Bit Flows - Zapier Alternative in WordPress Unlimited Task.'),
      docLink: 'https://bit-flows.com/documentation/',
      reviewLink: 'https://wordpress.org/support/plugin/bit-pi/reviews/',
      title: __('Bit Flows'),
      website: 'https://bit-flows.com',
      wpSupportThread: 'https://wordpress.org/support/plugin/bit-pi/'
    },
    'bit-social': {
      buyLink: 'https://bit-social.com/#pricing/',
      description: `An social media management plugin for WordPress, that allows you to share your post to
      different social media platform, schedule post, manage social media account and many more
      feature.`,
      docLink: 'https://bit-social.com/documentation/',
      reviewLink: 'https://wordpress.org/support/plugin/bit-social/reviews/',
      title: __('Bit Social'),
      website: 'https://bit-social.com',
      wpSupportThread: 'https://wordpress.org/support/plugin/bit-social/'
    }
  },
  supportEmail: 'support@bitapps.pro',
  x: 'https://x.com/bit_apps',
  youtubeChannel: 'https://www.youtube.com/@bit-apps'
} as const
