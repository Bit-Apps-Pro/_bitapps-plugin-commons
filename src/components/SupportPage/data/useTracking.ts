import request from '@common/helpers/request'
import { useQuery } from '@tanstack/react-query'

interface Tracking {
  allowTracking: boolean
}

export default function useTracking() {
  const { data, isLoading } = useQuery<{ data: Tracking }, Error>({
    queryKey: ['tracking'],
    queryFn: () => request('plugin-improvement', undefined, undefined, 'GET')
  })

  return {
    tracking: data?.data,
    isTrackingLoading: isLoading
  }
}
