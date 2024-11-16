import { proxyRequest } from '@common/helpers/request'
import config from '@config/config'
import { useQuery } from '@tanstack/react-query'

interface CheckUpdateResponse {
  response: 'invalid' | 'valid'
}

const licenseCheckUrl = `h_t_tps_:/_/wp_-api_.bit_apps_.pro_/pub_lic/veri_fy-si_te`.replaceAll('_', '')

export default function useCheckLicenseValidity() {
  const { data, isLoading: isCheckingValidity } = useQuery({
    enabled: config.IS_PRO && !!config.KEY,
    queryFn: () =>
      proxyRequest<CheckUpdateResponse>({
        bodyParams: { domain: window.location.origin, licenseKey: config.KEY || '' },
        encrypted: ['bodyParams.licenseKey'],
        method: 'POST',
        url: licenseCheckUrl
      }),
    queryKey: ['checkLicenseValidity'],
    refetchOnWindowFocus: false,
    retry: false,
    select: res => res?.data
  })

  return {
    isCheckingValidity,
    isLicenseValid: (data?.response || 'invalid') === 'valid'
  }
}
