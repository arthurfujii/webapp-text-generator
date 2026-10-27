'use client'
import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import cn from 'classnames'
import copy from 'copy-to-clipboard'
import { HandThumbDownIcon, HandThumbUpIcon } from '@heroicons/react/24/outline'
import { useBoolean } from 'ahooks'
import { HashtagIcon } from '@heroicons/react/24/solid'
import { Markdown } from '@/app/components/base/markdown'
import Loading from '@/app/components/base/loading'
import Toast from '@/app/components/base/toast'
import type { Feedbacktype, WorkflowProcess } from '@/types/app'
import { updateFeedback } from '@/service'
import Clipboard from '@/app/components/base/icons/line/clipboard'
import RefreshCcw01 from '@/app/components/base/icons/line/refresh-ccw-01'
import CodeEditor from '@/app/components/result/workflow/code-editor'
import WorkflowProcessItem from '@/app/components/result/workflow/workflow-process'
import { CodeLanguage } from '@/types/app'

export type IGenerationItemProps = {
  isWorkflow?: boolean
  workflowProcessData?: WorkflowProcess
  className?: string
  isError: boolean
  onRetry: () => void
  content: any
  messageId?: string | null
  isLoading?: boolean
  isInWebApp?: boolean
  depth?: number
  feedback?: Feedbacktype
  onFeedback?: (feedback: Feedbacktype) => void
  isMobile?: boolean
  taskId?: string
}

export const SimpleBtn = ({ className, isDisabled, onClick, children }: {
  className?: string
  isDisabled?: boolean
  onClick?: () => void
  children: React.ReactNode
}) => (
  <button
    type="button"
    disabled={isDisabled}
    className={cn(className, isDisabled ? 'border-sand/60 text-muted/50 cursor-not-allowed' : 'border-sand bg-cream-base text-forest-dark cursor-pointer hover:border-forest-medium hover:bg-cream-light', 'flex h-7 items-center rounded-sm border px-3 text-xs font-semibold transition-colors duration-200')}
    onClick={() => !isDisabled && onClick?.()}
  >
    {children}
  </button>
)

export const copyIcon = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.3335 2.33341C9.87598 2.33341 10.1472 2.33341 10.3698 2.39304C10.9737 2.55486 11.4454 3.02657 11.6072 3.63048C11.6668 3.85302 11.6668 4.12426 11.6668 4.66675V10.0334C11.6668 11.0135 11.6668 11.5036 11.4761 11.8779C11.3083 12.2072 11.0406 12.4749 10.7113 12.6427C10.337 12.8334 9.84692 12.8334 8.86683 12.8334H5.1335C4.1534 12.8334 3.66336 12.8334 3.28901 12.6427C2.95973 12.4749 2.69201 12.2072 2.52423 11.8779C2.3335 11.5036 2.3335 11.0135 2.3335 10.0334V4.66675C2.3335 4.12426 2.3335 3.85302 2.39313 3.63048C2.55494 3.02657 3.02665 2.55486 3.63056 2.39304C3.8531 2.33341 4.12435 2.33341 4.66683 2.33341M5.60016 3.50008H8.40016C8.72686 3.50008 8.89021 3.50008 9.01499 3.4365C9.12475 3.38058 9.21399 3.29134 9.26992 3.18158C9.3335 3.05679 9.3335 2.89345 9.3335 2.56675V2.10008C9.3335 1.77338 9.3335 1.61004 9.26992 1.48525C9.21399 1.37549 9.12475 1.28625 9.01499 1.23033C8.89021 1.16675 8.72686 1.16675 8.40016 1.16675H5.60016C5.27347 1.16675 5.11012 1.16675 4.98534 1.23033C4.87557 1.28625 4.78634 1.37549 4.73041 1.48525C4.66683 1.61004 4.66683 1.77338 4.66683 2.10008V2.56675C4.66683 2.89345 4.66683 3.05679 4.73041 3.18158C4.78634 3.29134 4.87557 3.38058 4.98534 3.4365C5.11012 3.50008 5.27347 3.50008 5.60016 3.50008Z" stroke="#344054" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const GenerationItem: FC<IGenerationItemProps> = ({
  isWorkflow,
  workflowProcessData,
  className,
  isError,
  onRetry,
  content,
  messageId,
  isLoading,
  isInWebApp = false,
  feedback,
  onFeedback,
  depth = 1,
  isMobile,
  taskId,
}) => {
  const { t } = useTranslation()
  const isTop = depth === 1

  const [completionRes, setCompletionRes] = useState('')
  const [childMessageId, setChildMessageId] = useState<string | null>(null)
  const hasChild = !!childMessageId
  const [childFeedback, setChildFeedback] = useState<Feedbacktype>({
    rating: null,
  })

  const handleFeedback = async (childFeedback: Feedbacktype) => {
    await updateFeedback({ url: `/messages/${childMessageId}/feedbacks`, body: { rating: childFeedback.rating } })
    setChildFeedback(childFeedback)
  }

  const [isQuerying, { setTrue: startQuerying, setFalse: stopQuerying }] = useBoolean(false)

  const childProps = {
    isInWebApp: true,
    content: completionRes,
    messageId: childMessageId,
    depth: depth + 1,
    moreLikeThis: true,
    onFeedback: handleFeedback,
    isLoading: isQuerying,
    feedback: childFeedback,
    isMobile,
    isWorkflow,
  }

  const mainStyle = (() => {
    const res: React.CSSProperties = !isTop
      ? {
        background: depth % 2 === 0 ? 'linear-gradient(90.07deg, #FAF6EC 0.05%, rgba(250, 246, 236, 0) 99.93%)' : '#F4EFE2',
      }
      : {}

    if (hasChild)
      res.boxShadow = '0px 1px 2px rgba(24, 28, 25, 0.06)'

    return res
  })()

  // regeneration clear child
  useEffect(() => {
    if (isLoading)
      setChildMessageId(null)
  }, [isLoading])

  return (
    <div className={cn(className, isTop ? `rounded-lg border shadow-woodcut ${!isError ? 'border-sand bg-cream-light' : 'border-error/40 bg-error-light/50'} ` : 'rounded-br-lg !mt-0')}
    >
      {isLoading
        ? (
          <div className='flex items-center h-10'><Loading type='area' /></div>
        )
        : (
          <div
            className={cn(!isTop && 'rounded-br-lg border-l-2 border-earth-amber/70', 'p-4')}
            style={mainStyle}
          >
            {(isTop && taskId) && (
              <div className='mb-3 flex w-fit items-center rounded-full border border-sand bg-cream-base pl-1.5 pr-2 text-[11px] font-semibold italic tracking-wide text-forest-medium group-hover:opacity-100'>
                <HashtagIcon className='w-3 h-3 text-earth-amber-dark fill-current mr-1 stroke-current stroke-1' />
                {taskId}
              </div>)
            }
            <div className='flex'>
              <div className='grow w-0'>
                {workflowProcessData && (
                  <WorkflowProcessItem grayBg hideInfo data={workflowProcessData} expand={workflowProcessData.expand} />
                )}
                {isError && (
                  <div className='text-sm text-error'>{t('app.generation.batchFailed.outputPlaceholder')}</div>
                )}
                {!isError && (typeof content === 'string') && (
                  <Markdown content={content} />
                )}
                {!isError && (typeof content !== 'string') && (
                  <CodeEditor
                    readOnly
                    title={<div />}
                    language={CodeLanguage.json}
                    value={content}
                    isJSONStringifyBeauty
                  />
                )}
              </div>
            </div>

            <div className='mt-4 flex items-center justify-between border-t border-sand/60 pt-3'>
              <div className='flex items-center'>
                <SimpleBtn
                  isDisabled={isError || !messageId}
                  className={cn(isMobile && '!px-1.5', 'space-x-1')}
                  onClick={() => {
                    if (typeof content === 'string')
                      copy(content)
                    else
                      copy(JSON.stringify(content))
                    Toast.notify({ type: 'success', message: t('common.actionMsg.copySuccessfully') })
                  }}>
                  <Clipboard className='w-3.5 h-3.5' />
                  {!isMobile && <div>{t('common.operation.copy')}</div>}
                </SimpleBtn>
                {isInWebApp && (
                  <>
                    {isError && <SimpleBtn
                      onClick={onRetry}
                      className={cn(isMobile && '!px-1.5', 'ml-2 space-x-1')}
                    >
                      <RefreshCcw01 className='w-3.5 h-3.5' />
                      {!isMobile && <div>{t('app.generation.batchFailed.retry')}</div>}
                    </SimpleBtn>}
                    {!isWorkflow && !isError && messageId && <div className="mx-3 w-[1px] h-[14px] bg-sand"></div>}
                    {!isWorkflow && !isError && messageId && !feedback?.rating && (
                      <div className='flex items-center gap-1'>
                        <button
                          type='button'
                          aria-label={String(t('common.operation.like'))}
                          onClick={() => {
                            onFeedback?.({
                              rating: 'like',
                            })
                          }}
                          className='flex w-7 h-7 items-center justify-center rounded-sm text-forest-medium transition-colors hover:bg-cream-base hover:text-forest-dark'>
                          <HandThumbUpIcon width={16} height={16} />
                        </button>
                        <button
                          type='button'
                          aria-label={String(t('common.operation.dislike'))}
                          onClick={() => {
                            onFeedback?.({
                              rating: 'dislike',
                            })
                          }}
                          className='flex w-7 h-7 items-center justify-center rounded-sm text-forest-medium transition-colors hover:bg-cream-base hover:text-error'>
                          <HandThumbDownIcon width={16} height={16} />
                        </button>
                      </div>
                    )}
                    {!isWorkflow && !isError && messageId && feedback?.rating === 'like' && (
                      <button
                        type='button'
                        aria-label={String(t('common.operation.like'))}
                        onClick={() => {
                          onFeedback?.({
                            rating: null,
                          })
                        }}
                        className='flex w-7 h-7 items-center justify-center rounded-sm cursor-pointer border border-forest-medium bg-cream-base text-forest-dark hover:bg-cream-light'>
                        <HandThumbUpIcon width={16} height={16} />
                      </button>
                    )}
                    {!isWorkflow && !isError && messageId && feedback?.rating === 'dislike' && (
                      <button
                        type='button'
                        aria-label={String(t('common.operation.dislike'))}
                        onClick={() => {
                          onFeedback?.({
                            rating: null,
                          })
                        }}
                        className='flex w-7 h-7 items-center justify-center rounded-sm cursor-pointer border border-error/40 bg-error-light text-error hover:bg-error-light/70'>
                        <HandThumbDownIcon width={16} height={16} />
                      </button>
                    )}
                  </>
                )}
              </div>
              <div className='text-xs font-medium tabular-nums text-gray-600'>{content?.length} {t('common.unit.char')}</div>
            </div>

          </div>
        )}

      {((childMessageId || isQuerying) && depth < 3) && (
        <div className='border-t border-sand/50 pl-4'>
          <GenerationItem {...childProps as any} />
        </div>
      )}

    </div>
  )
}
export default React.memo(GenerationItem)
