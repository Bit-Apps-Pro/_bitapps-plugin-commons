import queryRequest from '@common/helpers/request'
import { useQuery } from '@tanstack/react-query'

interface CheckUpdateResponse {
  latest_version: string
}

export default function useCheckUpdate() {
  const { data, isLoading: isCheckingUpdates } = useQuery({
    queryFn: () =>
      queryRequest<CheckUpdateResponse>('pro_plugin/update-check', undefined, undefined, 'GET'),
    queryKey: ['update'],
    select: res => res.data
  })

  return {
    isCheckingUpdates,
    latestAvailableVersion: data?.latest_version || '0.0.0'
  }
}
