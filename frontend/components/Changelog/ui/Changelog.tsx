import { __ } from '@common/helpers/i18nWrap'
import LucideIcn from '@icons/LucideIcn'
import { Button, Drawer } from 'antd'
import { useToggle } from 'react-use'
import { twMerge } from 'tailwind-merge'

import ChangelogContent from './ChangelogContent'

const drawerClassNames =
  'mt-[33px] h-[calc(100vh-40px)] rounded-md border-2 border-[var(--wp-bg-color)] ring-4 ring-[var(--wp-bg-color)] dark:border-[#1f1f1f] dark:bg-slate-950'
const wrapperClassName = 'drawer-decoration mr-1 shadow-none'

export default function Changelog() {
  const [isOpen, toggle] = useToggle(false)

  const handleClose = () => toggle(false)

  return (
    <div>
      <Button className="mb-12" icon={<LucideIcn name="file-clock" />} onClick={toggle}>
        {`Changelog`}
      </Button>

      <Drawer
        className={twMerge([drawerClassNames, 'bg-slate-50'])}
        classNames={{ wrapper: wrapperClassName }}
        mask={false}
        onClose={handleClose}
        open={isOpen}
        title={__('Changelog')}
        width={500}
      >
        <ChangelogContent />
      </Drawer>
    </div>
  )
}
