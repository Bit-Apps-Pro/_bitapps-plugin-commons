import request from '@common/helpers/request'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function useTrackingUpdate() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['update-tracking'],
    mutationFn: (allowTracking: boolean) =>
      request<{ allowTracking: boolean }>('plugin-improvement', { allowTracking }, undefined, 'POST'),
    onSuccess: data => {
      if (data.status === 'success') {
        queryClient.setQueryData(['tracking'], { data: { allowTracking: data?.data?.allowTracking } })
      }
    }
  })

  return {
    updateTracking: mutateAsync,
    isUpdatingTracking: isPending
  }
}
