'use client'
import type { FC } from 'react'
import React, { useState } from 'react'
import {
  useCSVReader,
} from 'react-papaparse'
import cn from 'classnames'
import { useTranslation } from 'react-i18next'
import s from './style.module.css'
import Csv from '@/app/components/base/icons/public/csv'

export type Props = {
  onParsed: (data: string[][]) => void
}

const CSVReader: FC<Props> = ({
  onParsed,
}) => {
  const { t } = useTranslation()
  const { CSVReader } = useCSVReader()
  const [zoneHover, setZoneHover] = useState(false)
  return (
    <CSVReader
      onUploadAccepted={(results: any) => {
        onParsed(results.data)
        setZoneHover(false)
      }}
      onDragOver={(event: DragEvent) => {
        event.preventDefault()
        setZoneHover(true)
      }}
      onDragLeave={(event: DragEvent) => {
        event.preventDefault()
        setZoneHover(false)
      }}
    >
      {({
        getRootProps,
        acceptedFile,
      }: any) => (
        <>
          <div
            {...getRootProps()}
            className={cn(s.zone, zoneHover && s.zoneHover, acceptedFile ? 'px-6' : 'justify-center')}
          >
            {
              acceptedFile
                ? (
                  <div className='w-full flex items-center space-x-3'>
                    <Csv className="shrink-0" />
                    <div className='flex w-0 grow'>
                      <span className='max-w-[calc(100%_-_30px)] text-ellipsis whitespace-nowrap overflow-hidden text-forest-dark'>{acceptedFile.name.replace(/.csv$/, '')}</span>
                      <span className='shrink-0 text-muted'>.csv</span>
                    </div>
                  </div>
                )
                : (
                  <div className='flex items-center justify-center space-x-3'>
                    <Csv className="shrink-0" />
                    <div className='text-gray-600'>{t('app.generation.csvUploadTitle')}<span className='font-semibold text-earth-amber-dark underline decoration-earth-amber/50 underline-offset-4'>{t('app.generation.browse')}</span></div>
                  </div>
                )}
          </div>
        </>
      )}
    </CSVReader>
  )
}

export default React.memo(CSVReader)
