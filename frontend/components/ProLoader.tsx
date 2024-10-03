import { type ReactElement, type ReactNode, cloneElement, isValidElement } from 'react'

import { $appConfig } from '@common/globalStates'
import { type EmotionJSX } from '@emotion/react/types/jsx-namespace'
import loadable from '@loadable/component'
import { useQuery } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
// eslint-disable-next-line custom/no-pro-module-import
import { type ProModules } from 'pro-module'
import VersionMismatchedNotice from './VersionMismatchedNotice'

export interface ProModulesType {
  proModule?: ProModules
}

// eslint-disable-next-line import/no-extraneous-dependencies
const ProModule = loadable.lib(() => import('pro-module'))

interface ProLoaderProperties {
  freeFallback: ReactNode
  loadingFallback: ReactElement
  children:
    | ((proModule: ProModules) => ReactNode | EmotionJSX.Element | Element)
    | (ReactNode | ((proModule: ProModules) => ReactNode | EmotionJSX.Element | Element))[]
    | ReactNode
}

/**
 * This component is used to load the pro module and provide it to the children.
 * It will provide the pro module to the children as a prop named `proModule`.
 * It will only render the children if the user has the pro version of the plugin.
 * Otherwise, it will render the free fallback.
 */

export default function ProLoader({ children, freeFallback, loadingFallback }: ProLoaderProperties) {
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
    select: module => (module as unknown as { default: ProModules })?.default,
    networkMode: 'offlineFirst'
  })

  if (SERVER_VARIABLES.proPluginVersion && !versionMatched) {
    return <VersionMismatchedNotice />
  }

  if (isError) {
    console.error('error', error)
    return <div>error: {error.message}</div>
  }

  if (isLoading) return loadingFallback

  if (isPro && loadedModule) {
    if (Array.isArray(children)) {
      return children.map(child =>
        renderChildrenWithProperties(child, loadedModule as unknown as ProModules)
      )
    }
    return renderChildrenWithProperties(children, loadedModule as unknown as ProModules)
  }

  return freeFallback
}

function renderChildrenWithProperties(
  children: ReactNode | ((properties: ProModules) => ReactNode | EmotionJSX.Element | Element),
  properties: ProModules
): ReactNode | EmotionJSX.Element {
  if (isValidElement(children)) {
    return cloneElement(children as ReactElement, { proModule: properties })
  }
  if (typeof children === 'function') {
    return children(properties) as ReactNode
  }
  return children
}
