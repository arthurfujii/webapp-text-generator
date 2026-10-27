'use client'
import { useState } from 'react'
import { Menu } from '@headlessui/react'
import { ArrowRightOnRectangleIcon, ChevronUpIcon } from '@heroicons/react/20/solid'
import cn from 'classnames'
import { APP_BASE_PATH } from '@/config'

type UserMenuProps = {
  username: string
}

const UserMenu = ({ username }: UserMenuProps) => {
  const [signingOut, setSigningOut] = useState(false)
  const [error, setError] = useState(false)

  const handleSignOut = async () => {
    if (signingOut)
      return

    setSigningOut(true)
    setError(false)

    try {
      const response = await fetch(`${APP_BASE_PATH}/api/auth/logout`, {
        method: 'POST',
        credentials: 'same-origin',
      })
      if (!response.ok)
        throw new Error('Sign out failed')

      window.location.replace(`${APP_BASE_PATH}/login`)
    }
    catch {
      setSigningOut(false)
      setError(true)
    }
  }

  return (
    <Menu as="div" className="relative shrink-0">
      <Menu.Button className="group flex max-w-[12rem] items-center gap-1.5 rounded-sm border border-transparent px-1.5 py-1 text-[11px] font-semibold text-forest-medium transition-colors hover:border-sand hover:bg-cream-base hover:text-forest-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-earth-amber focus-visible:ring-offset-2 focus-visible:ring-offset-cream-light">
        <span
          aria-hidden="true"
          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest-dark text-[8px] font-bold uppercase leading-none text-cream-base"
        >
          {username.slice(0, 2)}
        </span>
        <span className="truncate">{username}</span>
        <ChevronUpIcon className="h-3 w-3 shrink-0 text-muted" aria-hidden="true" />
      </Menu.Button>

      <Menu.Items className="absolute bottom-full right-0 z-50 mb-2 w-52 origin-bottom-right rounded-md border border-sand bg-cream-light p-1.5 shadow-woodcut focus:outline-none">
        <div className="px-2.5 pb-2 pt-1.5">
          <div className="eyebrow text-gray-600">Signed in as</div>
          <div className="mt-1 truncate text-sm font-semibold text-forest-dark">{username}</div>
        </div>

        <div className="divider-dashed my-1" />

        {error && (
          <p role="alert" className="px-2.5 py-1.5 text-[11px] leading-snug text-error">
            Could not sign out. Try again.
          </p>
        )}

        <Menu.Item>
          {({ active }) => (
            <button
              type="button"
              onClick={handleSignOut}
              disabled={signingOut}
              className={cn(
                'flex w-full items-center gap-2 rounded-sm px-2.5 py-2 text-left text-sm font-medium text-forest-dark transition-colors disabled:cursor-wait disabled:opacity-60',
                active && 'bg-cream-base',
              )}
            >
              <ArrowRightOnRectangleIcon className="h-4 w-4 shrink-0 text-forest-medium" aria-hidden="true" />
              {signingOut ? 'Signing out…' : 'Sign out'}
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  )
}

export default UserMenu
