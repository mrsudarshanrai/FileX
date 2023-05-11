import { ContextMenuWrapper } from './ContextMenuStyled'

export type Display = 'none' | 'block'
export type ContextMenuModal = {
  top: number
  left: number
  display: Display
}

const ContextMenuModal = (props: ContextMenuModal) => {
  const { top, left, display } = props
  return (
    <ContextMenuWrapper top={top} left={left} display={display}>
      Context
    </ContextMenuWrapper>
  )
}

export default ContextMenuModal
