import type { FC, MouseEventHandler } from 'react'
import React from 'react'
import Spinner from '@/app/components/base/spinner'

export type IButtonProps = {
  type?: string
  className?: string
  disabled?: boolean
  loading?: boolean
  children: React.ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const Button: FC<IButtonProps> = ({
  type,
  disabled,
  children,
  className,
  onClick,
  loading = false,
}) => {
  const isDisabled = disabled || loading
  const base = 'inline-flex h-10 select-none items-center justify-center gap-1.5 rounded-sm border px-4 text-sm font-semibold leading-none transition-all duration-200 ease-out'

  let style = ''
  switch (type) {
    case 'primary':
      style = isDisabled
        ? 'cursor-not-allowed border-sand bg-sand text-charcoal/45 shadow-none'
        : 'cursor-pointer border-forest-dark bg-forest-dark text-cream-base shadow-woodcut hover:-translate-y-px hover:border-forest-medium hover:bg-forest-medium active:translate-y-0 active:shadow-[2px_2px_0px_#181C19]'
      break
    case 'ghost':
      style = isDisabled
        ? 'cursor-not-allowed border-transparent bg-transparent text-charcoal/35'
        : 'cursor-pointer border-transparent bg-transparent text-forest-medium hover:border-sand hover:bg-cream-base hover:text-forest-dark'
      break
    default:
      style = isDisabled
        ? 'cursor-not-allowed border-sand bg-sand text-charcoal/45 shadow-none'
        : 'cursor-pointer border-[1.5px] border-forest-dark bg-cream-base text-forest-dark hover:bg-cream-light hover:shadow-soft'
      break
  }

  return (
    <button
      type="button"
      disabled={isDisabled}
      aria-busy={loading}
      className={`${base} ${style} ${className && className}`}
      onClick={isDisabled ? undefined : onClick}
    >
      {children}
      {/* Spinner is hidden when loading is false */}
      <Spinner loading={loading} className={`!ml-1 !h-3 !w-3 !border-2 ${(type === 'primary' && !isDisabled) ? '!text-cream-base' : '!text-forest-dark'}`} />
    </button>
  )
}

export default React.memo(Button)
