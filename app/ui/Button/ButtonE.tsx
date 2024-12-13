import { ReactNode } from "react"

type ButtonProps = {
  children?: ReactNode,
  clickEvent?: () => void,
  label?: string,
  type?: "submit" | undefined
  disabled?: boolean
}

export function ButtonE({ children, label, clickEvent, type, disabled=true }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={clickEvent}
      disabled={!disabled}
      className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
    >
      {
        label && (
          <span>{label}</span>
        )
      }
      {children}
    </button>
  )
}
