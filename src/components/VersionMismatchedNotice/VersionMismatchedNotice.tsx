import { Alert } from 'antd'
import { LucideAlertOctagon } from 'lucide-react'

export default function VersionMismatchedNotice() {
  return (
    <div>
      <Alert
        type="error"
        showIcon
        style={{ display: 'inline-flex' }}
        icon={<LucideAlertOctagon size={20} />}
        message="Please update your both plugin to same version."
      />
    </div>
  )
}
