import { getIcons, icons } from '@/app/components/Icon/icon'
import {
  ContextMenuItem,
  ContextMenuWrapper,
  ContentMenuItemShortcut,
  Item,
} from './ContextMenuStyled'

export type Display = 'none' | 'block'
export type ContextMenuModal = {
  top: number
  left: number
  display: Display
}

export type ContextMenuItemT = {
  label: string
  icon: string
  shortcut: string
  disabled?: boolean
}
const contextMenuItems: ContextMenuItemT[] = [
  {
    label: 'New Folder',
    icon: 'newFolder',
    shortcut: 'Shift + Ctrl + N',
  },
  {
    label: 'Copy',
    icon: 'copy',
    shortcut: 'Ctrl + C',
    disabled: true,
  },
  {
    label: 'Paste',
    icon: 'paste',
    shortcut: 'Ctrl + P',
  },
  {
    label: 'Select All',
    icon: 'selectAll',
    shortcut: 'Ctrl + A',
  },
  {
    label: 'Properties',
    icon: 'properties',
    shortcut: 'Ctrl + I',
  },
]

const ContextMenuModal = (props: ContextMenuModal) => {
  const { top, left, display } = props
  return (
    <ContextMenuWrapper
      onContextMenu={(e) => e.preventDefault()}
      top={top}
      left={left}
      display={display}
      itemCount={contextMenuItems.length}
    >
      {contextMenuItems.map(
        ({ icon, label, shortcut, disabled }: ContextMenuItemT, index: number) => (
          <ContextMenuItem key={index} disabled={disabled}>
            <Item>
              {getIcons(icon as keyof typeof icons)}
              {label}
            </Item>
            <ContentMenuItemShortcut>{shortcut}</ContentMenuItemShortcut>
          </ContextMenuItem>
        ),
      )}
    </ContextMenuWrapper>
  )
}

export default ContextMenuModal
