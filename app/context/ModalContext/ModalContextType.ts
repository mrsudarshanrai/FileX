export type ModalContextType = ModalOptions & {
  show: (options: ModalOptions) => void
}

export type ModalOptions = {
  options: {
    open: boolean
  }
}

export type ModalContextProviderPropsType = {
  children: React.ReactNode
}
