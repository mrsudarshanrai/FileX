import { createContext, useState } from 'react'
import { ModalContextProviderPropsType, ModalContextType, ModalOptions } from './ModalContextType'

const ModalContext = createContext<ModalContextType>({
  open: false,
  modalHeader: 'Title',
  modalBody: 'Modal Body',
  modalFooter: <p>footer</p>,
  show(options) {},
})

const ModalContextProvider = ({ children }: ModalContextProviderPropsType) => {
  const [modalOptions, setModalOptions] = useState<ModalOptions>({
    open: false,
    modalFooter: (
      <p>
        <b>
          <mark>footer</mark>
        </b>
      </p>
    ),
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
