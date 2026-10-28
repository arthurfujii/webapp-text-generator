'use client'
import type { FC } from 'react'
import React from 'react'
import { useTranslation } from 'react-i18next'

type IAppUnavailableProps = {
  isUnknwonReason: boolean
  errMessage?: string
}

const AppUnavailable: FC<IAppUnavailableProps> = ({
  isUnknwonReason,
  errMessage,
}) => {
  const { t } = useTranslation()
  let message = errMessage
  if (!errMessage)
    message = (isUnknwonReason ? t('app.common.appUnkonwError') : t('app.common.appUnavailable')) as string

  return (
    <div className='flex h-screen w-screen items-center justify-center bg-cream-paper p-6'>
      <div className='w-full max-w-md border border-sand bg-cream-light p-10 text-center shadow-woodcut-lg'>
        <div className='eyebrow mb-4 text-earth-amber-dark'>Tapítise · Aceleradora</div>
        <h1 className='font-display text-6xl font-semibold leading-none text-forest-deep'>
          {(errMessage || isUnknwonReason) ? 500 : 404}
        </h1>
        <div className='mx-auto mt-5 h-px w-12 bg-earth-amber/60' />
        <p className='mt-4 text-sm leading-relaxed text-gray-700'>{message}</p>
      </div>
    </div>
  )
}
export default React.memo(AppUnavailable)
