import { SyncOutlined } from '@ant-design/icons'
import { __ } from '@common/helpers/i18nwrap'
import config from '@config/config'
import LucideIcn from '@icons/LucideIcn'
import { Space, theme, Tooltip } from 'antd'

import { versionCompare } from '../../utils/utils'
import useCheckUpdate from './data/useCheckUpdate'

export default function CheckNewUpdate() {
  const { token } = theme.useToken()
  const { isCheckingUpdates, latestAvailableVersion } = useCheckUpdate()

  const isUpdatable =
    versionCompare(config.FREE_VERSION, latestAvailableVersion, '<') ||
    (config.PRO_VERSION && versionCompare(config.PRO_VERSION, latestAvailableVersion, '<'))

  if (isCheckingUpdates) {
    return (
      <div className="mb-2">
        <Space>
          <b>{__('Checking updates')}</b>
          <SyncOutlined spin />
        </Space>
      </div>
    )
  }

  if (isUpdatable) {
    return (
      <div className="mb-2">
        <Space>
          <b>
            {__('New version available')} ({latestAvailableVersion})
          </b>
          <Tooltip
            title={__(
              'Please update to the latest version to ensure plugin security and optimal performance. Stay safe and enjoy the enhanced features!'
            )}
          >
            <div>
              <LucideIcn css={{ color: token.orange6 }} name="info" size="1rem" />
            </div>
          </Tooltip>
        </Space>
      </div>
    )
  }

  if (!isCheckingUpdates && !isUpdatable) {
    return (
      <div className="mb-2">
        <Space>
          <b>{config.PRODUCT_NAME + ' ' + __('is up to date')}</b>
          <LucideIcn color={token.green6} name="circle-check" size="1rem" />
        </Space>
      </div>
    )
  }
}
