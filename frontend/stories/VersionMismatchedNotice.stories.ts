import { type Meta, type StoryObj } from '@storybook/react'
import VersionMismatchedNotice from '../components/VersionMismatchedNotice/VersionMismatchedNotice'

const meta = {
  title: 'VersionMismatchedNotice',
  component: VersionMismatchedNotice,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],

  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} satisfies Meta<typeof VersionMismatchedNotice>

export default meta
type Story = StoryObj<typeof meta>

export const VersionMismatchedNoticeStory: Story = {
  args: {}
}
