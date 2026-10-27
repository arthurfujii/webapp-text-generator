'use client'
import type { FC } from 'react'
import React from 'react'
import {
  useCSVDownloader,
} from 'react-papaparse'
import { useTranslation } from 'react-i18next'
import cn from 'classnames'
import Download02 from '@/app/components/base/icons/solid/download-02'
export type IResDownloadProps = {
  isMobile: boolean
  values: Record<string, string>[]
}

const ResDownload: FC<IResDownloadProps> = ({
  isMobile,
  values,
}) => {
  const { t } = useTranslation()
  const { CSVDownloader, Type } = useCSVDownloader()

  return (
    <CSVDownloader
      className="block cursor-pointer"
      type={Type.Link}
      filename={'result'}
      bom={true}
      config={{
        // delimiter: ';',
      }}
      data={values}
    >
      <span className={cn('inline-flex h-9 select-none items-center justify-center space-x-2 rounded-sm border border-forest-dark bg-cream-base text-[13px] font-semibold leading-none text-forest-dark transition-colors duration-200 hover:bg-cream-light', isMobile ? 'w-9 p-0' : 'px-3')}>
        <Download02 className='w-4 h-4 text-earth-amber-dark' />
        {!isMobile && <span>{t('common.operation.download')}</span>}
      </span>
    </CSVDownloader>
  )
}
export default React.memo(ResDownload)
