import { Checkbox, theme, Typography } from 'antd'
import useTracking from './data/useTracking'
import useTrackingUpdate from './data/useTrackingUpdate'
import { type CheckboxChangeEvent } from 'antd/es/checkbox'

const { Title, Link, Text } = Typography

export default function Improvement() {
  const { token } = theme.useToken()

  const { tracking, isTrackingLoading } = useTracking()
  const { updateTracking, isUpdatingTracking } = useTrackingUpdate()

  const handleCheckImprovement = (e: CheckboxChangeEvent) => {
    updateTracking(e.target.checked)
  }

  return (
    <div css={{ marginBlock: 60 }}>
      <Title level={5}>Improvement</Title>
      <Checkbox
        disabled={isTrackingLoading || isUpdatingTracking}
        checked={tracking?.allowTracking}
        style={{ color: token.colorTextSecondary }}
        onChange={handleCheckImprovement}
      >
        <Text underline>
          Allow the collection of diagnostic data and error reports to enhance the application's
          performance. Please review our{' '}
          <Link
            target="_black"
            rel="noopener noreferrer nofollow"
            href="https://bitapps.pro/privacy-policy/"
          >
            Privacy Policy
          </Link>{' '}
          for more information.
        </Text>
      </Checkbox>
    </div>
  )
}
