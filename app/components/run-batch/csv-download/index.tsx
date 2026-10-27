'use client'
import type { FC } from 'react'
import React from 'react'
import {
  useCSVDownloader,
} from 'react-papaparse'
import { useTranslation } from 'react-i18next'
import Download02 from '@/app/components/base/icons/solid/download-02'

export type ICSVDownloadProps = {
  vars: { name: string }[]
}

const CSVDownload: FC<ICSVDownloadProps> = ({
  vars,
}) => {
  const { t } = useTranslation()
  const { CSVDownloader, Type } = useCSVDownloader()
  const addQueryContentVars = [...vars]
  const template = (() => {
    const res: Record<string, string> = {}
    addQueryContentVars.forEach((item) => {
      res[item.name] = ''
    })
    return res
  })()

  return (
    <div className='mt-6'>
      <div className='field-label'>{t('app.generation.csvStructureTitle')}</div>
      <div className='mt-2 max-h-[500px] overflow-auto'>
        <table className='w-full border-collapse overflow-hidden rounded-md border border-sand text-xs'>
          <thead className='bg-cream-base text-forest-medium'>
            <tr>
              {addQueryContentVars.map((item, i) => (
                <td key={i} className='h-9 border-b border-sand pl-4 font-semibold uppercase tracking-wide'>{item.name}</td>
              ))}
            </tr>
          </thead>
          <tbody className='text-gray-600'>
            <tr>
              {addQueryContentVars.map((item, i) => (
                <td key={i} className='h-9 pl-4'>{item.name} {t('app.generation.field')}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <CSVDownloader
        className="block mt-3 cursor-pointer"
        type={Type.Link}
        filename={'template'}
        bom={true}
        config={{
          // delimiter: ';',
        }}
        data={[
          template,
        ]}
      >
        <div className='flex items-center h-[18px] space-x-1.5 text-xs font-semibold text-forest-dark transition-colors hover:text-earth-amber-dark'>
          <Download02 className='w-3.5 h-3.5' />
          <span className='underline decoration-earth-amber/50 underline-offset-4'>{t('app.generation.downloadTemplate')}</span>
        </div>
      </CSVDownloader>
    </div>

  )
}
export default React.memo(CSVDownload)
