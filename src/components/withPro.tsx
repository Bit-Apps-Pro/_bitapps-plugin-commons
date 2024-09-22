/* eslint-disable @typescript-eslint/no-explicit-any */
import { $appConfig } from '@common/globalStates'
import loadable from '@loadable/component'
import { useQuery } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'

import { type ProModulesType } from './ProLoader'
import VersionMismatchedNotice from './VersionMismatchedNotice'

const ProModule = loadable.lib(() => import('pro-module'))

function withPro(
  Component: any,
  { freeFallback = <div>Pro Feature</div>, loadingFallback = <div>Loading...</div> }
) {
  // eslint-disable-next-line react/display-name
  return function (properties: any) {
    const { isPro } = useAtomValue($appConfig)
    const versionMatched = SERVER_VARIABLES.version === SERVER_VARIABLES.proPluginVersion

    const {
      data: loadedModule,
      isLoading,
      isError,
      error
    } = useQuery({
      queryKey: ['proModule'],
      queryFn: () => ProModule.load(),
      enabled: isPro && versionMatched,
      select: module => (module as unknown as { default: ProModulesType })?.default,
      networkMode: 'offlineFirst'
    })

    if (!isPro) return freeFallback

    if (!versionMatched) {
      return <VersionMismatchedNotice />
    }

    if (isError) {
      console.error('error', error)
      return <div>error: {error.message}</div>
    }

    if (isLoading) return loadingFallback

    if (isPro && loadedModule) {
      if (typeof Component === 'function') {
        return Component({ ...properties, proModule: loadedModule })
      }
      return Component
    }
  }
}

export default withPro
