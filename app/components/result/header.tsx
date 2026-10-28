'use client'
import type { FC } from 'react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ClipboardDocumentIcon, HandThumbDownIcon, HandThumbUpIcon } from '@heroicons/react/24/outline'
import copy from 'copy-to-clipboard'
import type { Feedbacktype } from '@/types/app'
import Button from '@/app/components/base/button'
import Toast from '@/app/components/base/toast'
import Tooltip from '@/app/components/base/tooltip'

type IResultHeaderProps = {
  result: string
  showFeedback: boolean
  feedback: Feedbacktype
  onFeedback: (feedback: Feedbacktype) => void
}

const Header: FC<IResultHeaderProps> = ({
  feedback,
  showFeedback,
  onFeedback,
  result,
}) => {
  const { t } = useTranslation()
  return (
    <div className='flex w-full justify-between items-center '>
      <div className='font-display text-2xl font-semibold leading-none text-forest-deep'>{t('app.generation.resultTitle')}</div>
      <div className='flex items-center space-x-2'>
        <Button
          className='flex items-center !h-7 !p-[2px] !pr-2'
          onClick={() => {
            copy(result)
            Toast.notify({ type: 'success', message: 'copied' })
          }}
        >
          <>
            <ClipboardDocumentIcon className='text-forest-medium w-4 h-3 mr-1' />
            <span className='text-forest-medium text-xs leading-3'>{t('app.generation.copy')}</span>
          </>
        </Button>

        {showFeedback && feedback.rating && feedback.rating === 'like' && (
          <Tooltip
            selector="undo-feedback-like"
            content="Undo Great Rating"
          >
            <div
              onClick={() => {
                onFeedback({
                  rating: null,
                })
              }}
              className='flex w-7 h-7 items-center justify-center rounded-sm cursor-pointer border border-forest-medium bg-cream-base text-forest-dark hover:bg-cream-light'>
              <HandThumbUpIcon width={16} height={16} />
            </div>
          </Tooltip>
        )}

        {showFeedback && feedback.rating && feedback.rating === 'dislike' && (
          <Tooltip
            selector="undo-feedback-dislike"
            content="Undo Undesirable Response"
          >
            <div
              onClick={() => {
                onFeedback({
                  rating: null,
                })
              }}
              className='flex w-7 h-7 items-center justify-center rounded-sm cursor-pointer border border-error/40 bg-error-light text-error hover:bg-error-light/70'>
              <HandThumbDownIcon width={16} height={16} />
            </div>
          </Tooltip>
        )}

        {showFeedback && !feedback.rating && (
          <div className='flex rounded-sm border border-sand p-[1px] space-x-1'>
            <Tooltip
              selector="feedback-like"
              content="Great Rating"
            >
              <div
                onClick={() => {
                  onFeedback({
                    rating: 'like',
                  })
                }}
                className='flex w-6 h-6 items-center justify-center rounded-sm cursor-pointer text-forest-medium hover:bg-cream-base hover:text-forest-dark'>
                <HandThumbUpIcon width={16} height={16} />
              </div>
            </Tooltip>
            <Tooltip
              selector="feedback-dislike"
              content="Undesirable Response"
            >
              <div
                onClick={() => {
                  onFeedback({
                    rating: 'dislike',
                  })
                }}
                className='flex w-6 h-6 items-center justify-center rounded-sm cursor-pointer text-forest-medium hover:bg-cream-base hover:text-error'>
                <HandThumbDownIcon width={16} height={16} />
              </div>
            </Tooltip>
          </div>
        )}
      </div>

    </div>
  )
}

export default React.memo(Header)
