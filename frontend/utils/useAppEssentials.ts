import { useEffect, useLayoutEffect } from 'react'
import { setAppBgFromAdminBarBg, setCascadeLayerToWordpressStyles } from './themeUtils'

export function useAppEssentials() {
  useLayoutEffect(() => {
    setCascadeLayerToWordpressStyles()
  }, [])

  useEffect(() => {
    setTimeout(setAppBgFromAdminBarBg, 500)
  }, [])
}
