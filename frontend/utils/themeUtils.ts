import { select } from './utils'

/**
 * Create a template element with id 'antd-style' and insert it
 * into the head of the document. where antd styles will be injected.
 *
 * @returns template element with id
 */
export function createAntDesignStyleContainer() {
  const template = document.createElement('template')
  template.id = 'antd-style'
  document.head.insertBefore(template, document.head.firstChild)
  return template
}
/**
 * Set the background color of the app from the admin bar background color
 */
export function setAppBgFromAdminBarBg() {
  const bitAppsRootElm = select('#bit-apps-root')
  const wpAdminBarElm = select('#wpadminbar')
  if (bitAppsRootElm && wpAdminBarElm) {
    bitAppsRootElm.style.backgroundColor = globalThis.getComputedStyle(wpAdminBarElm)?.backgroundColor
  }
}

/**
 * Check if the css file is conflicting with project styles
 * @param cssUrl a string containing the url of the css file
 * @returns boolean indicating if the css file is conflicting with project styles
 */
export function isConflictingCSS(cssUrl: string) {
  return cssUrl.includes('bootstrap')
}

/**
 * Check if the css file is from the plugin
 * @param cssUrl url of the css file
 * @returns boolean indicating if the css file is from the plugin
 */
function isPluginCss(cssUrl: string) {
  return cssUrl.includes(SERVER_VARIABLES.slug)
}

/**
 * Set the cascade layer to wordpress styles
 * To avoid conflicts with other stylesheets, we remove the conflicting
 * stylesheets and add wordpress styles in a @layer called wp
 * @returns void
 */
export function setCascadeLayerToWordpressStyles(cssLayers: string) {
  const styleSheetUrls: string[] = []

  const styleSheets = document.styleSheets
  for (const styleSheet of styleSheets) {
    if (styleSheet.href && !styleSheet.href.includes('antd')) {
      const url = new URL(styleSheet.href)
      if (url.pathname.endsWith('.css')) {
        const isIgnoreFromLayer = isPluginCss(url.href)
        if (isIgnoreFromLayer) continue

        if (!isConflictingCSS(url.href)) {
          styleSheetUrls.push(url.href)
        }
        styleSheet.disabled = true
        styleSheet?.ownerNode?.remove()
      }
    }
  }

  // const developmentAntdResetCss =
  // '/wp-content/plugins/bit-social/frontend/_plugin-commons/resources/css/antd-reset.css'
  // const productionAntdResetCss = SERVER_VARIABLES.assetsURL + '/antd-reset.css'
  // const antdResetCss = import.meta.env.DEV ? developmentAntdResetCss : productionAntdResetCss
  // @import url('${antdResetCss}') layer(reset);
  const wpStyles = document.createElement('style')
  wpStyles.textContent = `
      ${cssLayers}
      ${styleSheetUrls.map(url => `@import url('${url}') layer(wp);`).join('\n')}\
    `

  document.head.insertBefore(wpStyles, document.head.firstChild)
}
