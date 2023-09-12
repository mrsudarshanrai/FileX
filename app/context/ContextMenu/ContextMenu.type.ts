import { Display } from '@/app/components/ContextMenuModal/contextmenu.type'

export type ContextMenuType = {
  onContextMenu: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  show: Display
  setShow: (show: Display) => void
  setTargetPath: (path?: string) => void
}
