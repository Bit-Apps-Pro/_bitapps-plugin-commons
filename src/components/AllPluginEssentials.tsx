import { BitAppsPluginUtilUpdateNotice } from './BitappsPluginUtilUpdateNotice'
import PluginUpdateNotice from './PluginUpdateNotice'

export default function AllPluginEssentials() {
  return (
    <>
      <PluginUpdateNotice />
      <BitAppsPluginUtilUpdateNotice />
    </>
  )
}
