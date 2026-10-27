'use client'
import type { FC } from 'react'
import React, { Fragment, useEffect, useState } from 'react'
import { Combobox, Listbox, Transition } from '@headlessui/react'
import classNames from 'classnames'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'

const defaultItems = [
  { value: 1, name: 'option1' },
  { value: 2, name: 'option2' },
  { value: 3, name: 'option3' },
  { value: 4, name: 'option4' },
  { value: 5, name: 'option5' },
  { value: 6, name: 'option6' },
  { value: 7, name: 'option7' },
]

export type Item = {
  value: number | string
  name: string
}

export type ISelectProps = {
  className?: string
  items?: Item[]
  defaultValue?: number | string
  disabled?: boolean
  onSelect: (value: Item) => void
  allowSearch?: boolean
  bgClassName?: string
  placeholder?: string
}
const Select: FC<ISelectProps> = ({
  className,
  items = defaultItems,
  defaultValue = 1,
  disabled = false,
  onSelect,
  allowSearch = true,
  bgClassName = 'bg-cream-light',
  placeholder = 'Select an option',
}) => {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)

  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  useEffect(() => {
    let defaultSelect = null
    const existed = items.find((item: Item) => item.value === defaultValue)
    if (existed)
      defaultSelect = existed

    setSelectedItem(defaultSelect)
  }, [defaultValue])

  const filteredItems: Item[]
    = query === ''
      ? items
      : items.filter((item) => {
        return item.name.toLowerCase().includes(query.toLowerCase())
      })

  const triggerClass = `flex h-10 w-full items-center rounded-sm border-[1.5px] border-sand ${bgClassName} py-1.5 pl-3 pr-10 text-left text-sm text-charcoal shadow-none outline-none transition-all duration-200 hover:border-forest-light focus-visible:border-forest-dark focus-visible:ring-2 focus-visible:ring-earth-amber/35`

  return (
    <Combobox
      as="div"
      disabled={disabled}
      value={selectedItem}
      className={className}
      onChange={(value: Item) => {
        if (!disabled) {
          setSelectedItem(value)
          setOpen(false)
          onSelect(value)
        }
      }}>
      <div className={classNames('relative')}>
        <div className='group text-charcoal'>
          {allowSearch
            ? <Combobox.Input
              className={`${triggerClass} cursor-text`}
              placeholder={placeholder}
              onChange={(event) => {
                if (!disabled)
                  setQuery(event.target.value)
              }}
              displayValue={(item: Item) => item?.name}
            />
            : <Combobox.Button onClick={
              () => {
                if (!disabled)
                  setOpen(!open)
              }
            } className={`${triggerClass} ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}>
              <span className={classNames('block truncate', !selectedItem && 'text-muted')}>
                {selectedItem?.name || placeholder}
              </span>
            </Combobox.Button>}
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-sm px-2 text-forest-medium focus:outline-none" onClick={
            () => {
              if (!disabled)
                setOpen(!open)
            }
          }>
            {open ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
          </Combobox.Button>
        </div>

        {filteredItems.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-sand bg-cream-light px-1 py-1 text-sm shadow-woodcut focus:outline-none">
            {filteredItems.map((item: Item) => (
              <Combobox.Option
                key={item.value}
                value={item}
                className={({ active }: { active: boolean }) =>
                  classNames(
                    'relative cursor-pointer select-none rounded-sm py-2 pl-3 pr-9 text-gray-700 transition-colors',
                    active ? 'bg-cream-base text-forest-dark' : 'hover:bg-cream-base',
                  )
                }
              >
                {({ /* active, */ selected }) => (
                  <>
                    <span className={classNames('block truncate', selected && 'font-semibold')}>{item.name}</span>
                    {selected && (
                      <span
                        className={classNames(
                          'absolute inset-y-0 right-0 flex items-center pr-4 text-earth-amber-dark',
                        )}
                      >
                        <CheckIcon className="h-4 w-4" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox >
  )
}

const SimpleSelect: FC<ISelectProps> = ({
  className,
  items = defaultItems,
  defaultValue = 1,
  disabled = false,
  onSelect,
}) => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  useEffect(() => {
    let defaultSelect = null
    const existed = items.find((item: Item) => item.value === defaultValue)
    if (existed)
      defaultSelect = existed

    setSelectedItem(defaultSelect)
  }, [defaultValue])

  return (
    <Listbox
      value={selectedItem}
      onChange={(value: Item) => {
        if (!disabled) {
          setSelectedItem(value)
          onSelect(value)
        }
      }}
    >
      <div className="relative h-10">
        <Listbox.Button className={`h-full w-full rounded-sm border-[1.5px] border-sand bg-cream-light py-1.5 pl-3 pr-10 text-left text-sm text-charcoal shadow-none outline-none transition-all duration-200 hover:border-forest-light focus-visible:border-forest-dark focus-visible:ring-2 focus-visible:ring-earth-amber/35 ${className}`}>
          <span className="block truncate">{selectedItem?.name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon
              className="h-4 w-4 text-forest-medium"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-sand bg-cream-light px-1 py-1 text-sm shadow-woodcut focus:outline-none">
            {items.map((item: Item) => (
              <Listbox.Option
                key={item.value}
                className={({ active }) =>
                  `relative cursor-pointer select-none rounded-sm py-2 pl-3 pr-9 text-gray-700 hover:bg-cream-base ${active ? 'bg-cream-base text-forest-dark' : ''
                  }`
                }
                value={item}
                disabled={disabled}
              >
                {({ /* active, */ selected }) => (
                  <>
                    <span className={classNames('block truncate', selected && 'font-semibold')}>{item.name}</span>
                    {selected && (
                      <span
                        className={classNames(
                          'absolute inset-y-0 right-0 flex items-center pr-4 text-earth-amber-dark',
                        )}
                      >
                        <CheckIcon className="h-4 w-4" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}
export { SimpleSelect }
export default React.memo(Select)
