export namespace ButtonType {
  export type Props = {
    theme?: ButtonTheme
    onClick?: () => void
    disabled?: boolean
    children: React.ReactNode
  }
  export type ButtonThemeColor = {
    background: string
    hoverBackground: string
    borderColor: string
    disabledColor: string
    shadowColor: string
    textColor?: string
  }

  export enum ButtonThemeEnum {
    default = 'default',
    success = 'success',
    error = 'error',
  }

  export type ButtonTheme = keyof typeof ButtonThemeEnum
}
