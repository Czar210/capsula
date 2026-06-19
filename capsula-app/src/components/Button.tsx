import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  /** seta mono final (→) — a marca navegacional da Cápsula */
  arrow?: boolean
}

export function Button({
  children,
  variant = 'primary',
  arrow = false,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={
        `cap-btn cap-btn--${variant} inline-flex cursor-pointer items-center gap-2.5 rounded-full ` +
        `px-[30px] py-4 font-sans text-[17px] font-semibold transition-colors ` +
        `disabled:cursor-not-allowed disabled:opacity-45 ${className}`
      }
      {...props}
    >
      {children}
      {arrow ? <span className="font-mono font-normal">→</span> : null}
    </button>
  )
}
