import request from '@common/helpers/request'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function useUpdatePlugin() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => request(`pro_update-plugin`, undefined, undefined, 'GET'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pro_update-plugin'] })
    }
  })

  return {
    updatePlugin: () => mutateAsync(),
    isLoadingUpdatePlugin: isPending
  }
}
