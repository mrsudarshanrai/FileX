export namespace ModalType {
  export type Props = {
    size?: ModalSize
  }

  export enum ModalSizeEnum {
    small = 'small',
    medium = 'medium',
    large = 'large',
  }

  export type ModalSize = keyof typeof ModalSizeEnum
}
