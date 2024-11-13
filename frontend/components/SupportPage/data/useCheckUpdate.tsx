import queryRequest from '@common/helpers/request'
import { useQuery } from '@tanstack/react-query'

export default function useCheckUpdate() {
  const { data: latestAvailableVersion, isLoading: isCheckingUpdates } = useQuery({
    queryFn: () => queryRequest('plugin-update-check', undefined, undefined, 'GET'),
    queryKey: ['update'],
    select: res => res.data
  })

  return {
    isCheckingUpdates,
    latestAvailableVersion
  }
}
