'use client'
import classNames from 'classnames'
import type { ReactNode } from 'react'
import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from '@heroicons/react/20/solid'
import { createContext } from 'use-context-selector'

export type IToastProps = {
  type?: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  message: string
  children?: ReactNode
  onClose?: () => void
}
type IToastContext = {
  notify: (props: IToastProps) => void
}
const defaultDuring = 3000

export const ToastContext = createContext<IToastContext>({} as IToastContext)
const Toast = ({
  type = 'info',
  duration,
  message,
  children,
}: IToastProps) => {
  // sometimes message is react node array. Not handle it.
  if (typeof message !== 'string')
    return null

  return <div
    role={(type === 'error' || type === 'warning') ? 'alert' : 'status'}
    aria-live="polite"
    className={classNames(
      'fixed z-50 my-4 mx-4 max-w-sm rounded-md border border-sand bg-cream-light p-4 shadow-woodcut sm:mx-8',
      'top-0',
      'right-0',
      type === 'success' ? 'border-l-4 border-l-success' : '',
      type === 'error' ? 'border-l-4 border-l-error' : '',
      type === 'warning' ? 'border-l-4 border-l-warning' : '',
      type === 'info' ? 'border-l-4 border-l-info' : '',
    )}>
    <div className="flex">
      <div className="flex-shrink-0">
        {type === 'success' && <CheckCircleIcon className="w-5 h-5 text-success" aria-hidden="true" />}
        {type === 'error' && <XCircleIcon className="w-5 h-5 text-error" aria-hidden="true" />}
        {type === 'warning' && <ExclamationTriangleIcon className="w-5 h-5 text-warning" aria-hidden="true" />}
        {type === 'info' && <InformationCircleIcon className="w-5 h-5 text-info" aria-hidden="true" />}
      </div>
      <div className="ml-3">
        <h3 className="text-sm font-semibold leading-relaxed text-forest-dark">{message}</h3>
        {children && <div className="mt-2 text-sm text-gray-700">
          {children}
        </div>
        }
      </div>
    </div>
  </div>
}

export const ToastProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const placeholder: IToastProps = {
    type: 'info',
    message: 'Toast message',
    duration: 3000,
  }
  const [params, setParams] = React.useState<IToastProps>(placeholder)

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (mounted) {
      setTimeout(() => {
        setMounted(false)
      }, params.duration || defaultDuring)
    }
  }, [mounted])

  return <ToastContext.Provider value={{
    notify: (props) => {
      setMounted(true)
      setParams(props)
    },
  }}>
    {mounted && <Toast {...params} />}
    {children}
  </ToastContext.Provider>
}

Toast.notify = ({
  type,
  message,
  duration,
}: Pick<IToastProps, 'type' | 'message' | 'duration'>) => {
  if (typeof window === 'object') {
    const holder = document.createElement('div')
    const root = createRoot(holder)

    root.render(<Toast type={type} message={message} duration={duration} />)
    document.body.appendChild(holder)
    setTimeout(() => {
      if (holder)
        holder.remove()
    }, duration || defaultDuring)
  }
}

export default Toast
