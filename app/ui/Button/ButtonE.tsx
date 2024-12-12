import { ReactNode } from "react"

type ButtonProps = {
  children?: ReactNode,
  clickEvent?: () => void,
  label?: string,
  type?: "submit" | undefined
}

export function ButtonE({ children, label, clickEvent, type }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={clickEvent}
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
