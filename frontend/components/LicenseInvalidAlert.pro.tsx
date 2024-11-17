import { __ } from '@common/helpers/i18nwrap'
import { Alert } from 'antd'

import useCheckLicenseValidity from './SupportPage/data/useCheckLicenseValidity'

export default function LicenseInvalidAlert({ forceCheckLicense }: { forceCheckLicense?: boolean }) {
  const { isLicenseValid } = useCheckLicenseValidity(forceCheckLicense)

  if (isLicenseValid) return

  return (
    <Alert
      description={__(
        `Please update your license to ensure you receive the latest security updates and bug fixes. 
          Using an outdated or unofficial license may leave your system vulnerable to security breaches and data leaks. 
          We cannot take responsibility for issues arising from such scenarios. For your safety, always download from the official Bit Apps server.`
      )}
      message={__('Your license is invalid')}
      showIcon
      type="error"
    />
  )
}
