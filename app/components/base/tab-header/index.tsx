'use client'
import type { FC } from 'react'
import React from 'react'
import cn from 'classnames'

import s from './style.module.css'

type Item = {
  id: string
  name: string
  isRight?: boolean
  extra?: React.ReactNode
}

export type ITabHeaderProps = {
  items: Item[]
  value: string
  onChange: (value: string) => void
}

const TabHeader: FC<ITabHeaderProps> = ({
  items,
  value,
  onChange,
}) => {
  const renderItem = ({ id, name, extra }: Item) => (
    <button
      key={id}
      type="button"
      role="tab"
      aria-selected={id === value}
      className={cn(
        id === value ? `${s.itemActive} text-forest-deep` : 'text-gray-700 hover:text-forest-medium',
        'relative flex cursor-pointer items-center pb-2.5 leading-6 transition-colors duration-200',
      )}
      onClick={() => onChange(id)}
    >
      <div className='text-xs font-semibold uppercase tracking-brand'>{name}</div>
      {extra || ''}
    </button>
  )
  return (
    <div role="tablist" className='flex justify-between border-b border-sand/80'>
      <div className='flex space-x-6'>
        {items.filter(item => !item.isRight).map(renderItem)}
      </div>
      <div className='flex space-x-6'>
        {items.filter(item => item.isRight).map(renderItem)}
      </div>
    </div>
  )
}
export default React.memo(TabHeader)
