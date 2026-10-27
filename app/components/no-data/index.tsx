import type { FC } from 'react'
import React from 'react'
import { useTranslation } from 'react-i18next'

export type INoDataProps = {}
const NoData: FC<INoDataProps> = () => {
  const { t } = useTranslation()
  return (
    <div className='flex h-full w-full flex-col items-center justify-center px-6 py-12 text-center'>
      <svg
        width="148"
        height="168"
        viewBox="0 0 148 168"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="mb-6"
      >
        <circle cx="74" cy="70" r="52" stroke="#E8DFC8" strokeOpacity="0.16" strokeWidth="1.5" />
        <circle cx="74" cy="70" r="36" stroke="#C88238" strokeOpacity="0.5" strokeWidth="1.25" />
        <path d="M74 146V83" stroke="#E8DFC8" strokeWidth="2" strokeLinecap="round" />
        <path d="M74 106C74 106 51 107.5 41 88C60 75 74 89 74 106Z" fill="#E8DFC8" fillOpacity="0.86" />
        <path d="M74 87C74 87 97 88.5 107 69C88 56 74 70 74 87Z" fill="#C88238" />
        <path d="M74 128C74 128 63 128 55 120C65 115 74 121 74 128Z" fill="#C88238" fillOpacity="0.82" />
        <path d="M74 10V20M22 70H32M116 70H126M38 34L45 41M110 34L103 41" stroke="#E8DFC8" strokeOpacity="0.38" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="74" cy="70" r="3.5" fill="#C88238" />
      </svg>
      <div className='eyebrow mb-3 text-earth-amber-light'>Tapítise</div>
      <p className='max-w-[280px] font-display text-xl leading-snug text-cream-base/75'>
        {t('app.generation.noData')}
      </p>
    </div>
  )
}
export default React.memo(NoData)
