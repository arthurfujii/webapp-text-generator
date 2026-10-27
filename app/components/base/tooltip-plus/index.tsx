'use client'
import type { FC } from 'react'
import React, { useState } from 'react'
import { PortalToFollowElem, PortalToFollowElemContent, PortalToFollowElemTrigger } from '@/app/components/base/portal-to-follow-elem'
export type TooltipProps = {
  position?: 'top' | 'right' | 'bottom' | 'left'
  triggerMethod?: 'hover' | 'click'
  popupContent: React.ReactNode
  children: React.ReactNode
}

const arrow = (
  <svg className="absolute text-forest-dark h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255"><polygon className="fill-current" points="0,0 127.5,127.5 255,0"></polygon></svg>
)

const Tooltip: FC< TooltipProps> = ({
  position = 'top',
  triggerMethod = 'hover',
  popupContent,
  children,
}) => {
  const [open, setOpen] = useState(false)

  return (
    <PortalToFollowElem
      open={open}
      onOpenChange={setOpen}
      placement={position}
      offset={10}
    >
      <PortalToFollowElemTrigger
        onClick={() => triggerMethod === 'click' && setOpen(v => !v)}
        onMouseEnter={() => triggerMethod === 'hover' && setOpen(true)}
        onMouseLeave={() => triggerMethod === 'hover' && setOpen(false)}
      >
        {children}
      </PortalToFollowElemTrigger>
      <PortalToFollowElemContent
        className="z-[999]"
      >
        <div className='relative rounded-sm border border-forest-medium bg-forest-dark px-3 py-2 text-xs font-normal text-cream-base shadow-woodcut'>
          {popupContent}
          {arrow}
        </div>
      </PortalToFollowElemContent>
    </PortalToFollowElem>
  )
}

export default React.memo(Tooltip)
