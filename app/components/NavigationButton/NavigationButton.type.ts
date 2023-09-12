export namespace NavigationButtonType {
  export type Props = {
    isBackBtnDisabled: boolean
    isForwardBtnDisabled: boolean
    onClick: (navigationType: NavigationType) => void
  }

  export enum NavigationTypeEnum {
    backward = 'backward',
    forward = 'forward',
  }

  export type NavigationType = keyof typeof NavigationButtonType.NavigationTypeEnum
}
