import withPro from '@utilities/withPro'
import { type ReactNode } from 'react'

function ProComponentWrapper({ children }: { children: ReactNode }) {
  return children
}

export default withPro(ProComponentWrapper, {})
