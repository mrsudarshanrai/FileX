import { createContext, useState } from 'react'
import { ModalContextProviderPropsType, ModalContextType, ModalOptions } from './ModalContextType'

const ModalContext = createContext<ModalContextType>({
  options: {
    open: false,
  },
  show(options) {},
})

const ModalContextProvider = ({ children }: ModalContextProviderPropsType) => {
  const [modalOptions, setModalOptions] = useState<ModalOptions>({
    options: {
      open: false,
    },
  })

  const show = (options: ModalOptions) => {
    setModalOptions(options)
  }
  const contextValue = {
    ...modalOptions,
    show,
  }
  return <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>
}

export { ModalContextProvider }
export default ModalContext
