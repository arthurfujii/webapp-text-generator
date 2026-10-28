'use client'
import { useState } from 'react'
import type { FormEvent } from 'react'
import {
  ArrowRightIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  EyeSlashIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline'
import { APP_BASE_PATH } from '@/config'
import BrandMark from '@/app/components/brand-mark'

type LoginFormProps = {
  appTitle: string
  appDescription: string
  nextPath: string
  configured: boolean
  currentYear: number
  contactEmail?: string
  contactPhone?: string
  contactWhatsapp?: string
}

type LoginResponse = {
  message?: string
}

const loginContactHref = (contactWhatsapp?: string, contactPhone?: string) => {
  if (contactWhatsapp)
    return `https://wa.me/${contactWhatsapp.replace(/\D/g, '')}`

  if (contactPhone)
    return `tel:${contactPhone.replace(/[^\d+]/g, '')}`

  return undefined
}

const LoginForm = ({
  appTitle,
  appDescription,
  nextPath,
  configured,
  currentYear,
  contactEmail,
  contactPhone,
  contactWhatsapp,
}: LoginFormProps) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (loading)
      return

    const trimmedUsername = username.trim()
    if (!trimmedUsername || !password) {
      setError('Enter your username and password.')
      return
    }

    setError('')
    setLoading(true)

    try {
      const response = await fetch(`${APP_BASE_PATH}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ username: trimmedUsername, password }),
      })
      const data = await response.json().catch(() => ({})) as LoginResponse

      if (!response.ok) {
        setError(data.message || 'Unable to sign in right now. Please try again.')
        setLoading(false)
        return
      }

      window.location.replace(`${APP_BASE_PATH}${nextPath}`)
    }
    catch {
      setError('Unable to sign in right now. Please try again.')
      setLoading(false)
    }
  }

  const contactHref = loginContactHref(contactWhatsapp, contactPhone)
  const isWhatsapp = Boolean(contactWhatsapp)
  const contactPhoneLabel = contactPhone || contactWhatsapp

  return (
    <div className="min-h-screen bg-cream-paper pc:grid pc:grid-cols-2">
      <aside className="surface-olive relative hidden min-h-screen overflow-hidden px-10 py-10 pc:flex pc:flex-col pc:justify-between xl:px-16">
        <div className="topo-lines" aria-hidden="true" />

        <div className="relative z-10 flex items-center gap-3">
          <BrandMark className="h-11 w-11 shrink-0" />
          <div>
            <div className="eyebrow text-cream-light">Text Studio</div>
            <div className="mt-1 font-display text-2xl font-semibold lowercase leading-none text-cream-paper">{appTitle}</div>
            <div className="mt-1.5 text-lockup-sub font-semibold uppercase text-cream-light">
              Aceleradora
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-lg py-16">
          <div className="mb-6 h-px w-16 bg-cream-paper/50" />
          <p className="font-display text-[2.75rem] font-semibold leading-[1.05] tracking-tight text-cream-paper">
            A quiet place
            <br />
            for <em className="text-cream-light">bold words.</em>
          </p>
          {appDescription && (
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream-light">{appDescription}</p>
          )}
        </div>

        <div className="relative z-10">
          {(contactEmail || (contactHref && contactPhoneLabel)) && (
            <div className="mb-5 flex flex-col items-start gap-1 border-t border-cream-paper/20 pt-4">
              {contactEmail && (
                <a className="contact-chip" href={`mailto:${contactEmail}`}>
                  <span className="contact-chip-icon" aria-hidden="true">
                    <EnvelopeIcon className="h-[18px] w-[18px]" />
                  </span>
                  <span>{contactEmail}</span>
                </a>
              )}
              {contactHref && contactPhoneLabel && (
                <a
                  className="contact-chip"
                  href={contactHref}
                  aria-label={isWhatsapp ? `WhatsApp: ${contactPhoneLabel}` : `Phone: ${contactPhoneLabel}`}
                  target={isWhatsapp ? '_blank' : undefined}
                  rel={isWhatsapp ? 'noreferrer' : undefined}
                >
                  <span className="contact-chip-icon" aria-hidden="true">
                    {isWhatsapp
                      ? <ChatBubbleLeftRightIcon className="h-[18px] w-[18px]" />
                      : <PhoneIcon className="h-[18px] w-[18px]" />}
                  </span>
                  <span>{contactPhoneLabel}</span>
                </a>
              )}
            </div>
          )}

          <div className="flex items-center justify-between gap-4 text-[10px] font-semibold uppercase tracking-brand text-cream-light">
            <span>Private workspace</span>
            <span>© {currentYear}</span>
          </div>
        </div>
      </aside>

      <main className="surface-paper flex min-h-screen flex-col">
        <div className="flex items-center gap-3 border-b border-sand/70 px-5 py-4 pc:hidden">
          <BrandMark className="h-9 w-9 shrink-0" />
          <div>
            <div className="eyebrow text-earth-amber-dark">Text Studio</div>
            <div className="mt-1 font-display text-xl font-semibold lowercase leading-none text-forest-deep">{appTitle}</div>
            <div className="mt-1 text-lockup-sub font-semibold uppercase text-forest-medium">
              Aceleradora
            </div>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-md">
            <div className="mb-7">
              <div className="eyebrow text-earth-amber-dark">Restricted access</div>
              <h1 className="mt-2 font-display text-display-md font-semibold leading-tight text-forest-deep">Welcome back</h1>
              <p className="mt-2 text-sm leading-relaxed text-gray-700">
                Sign in to continue to your writing studio.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="border border-sand bg-cream-base/50 p-5 shadow-woodcut pc:p-6"
            >
              <div className="space-y-5">
                <div>
                  <label htmlFor="username" className="field-label">Username</label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    autoCapitalize="none"
                    spellCheck={false}
                    maxLength={64}
                    required
                    value={username}
                    onChange={(event) => {
                      setUsername(event.target.value)
                      if (error)
                        setError('')
                    }}
                    aria-describedby={error ? 'login-error' : undefined}
                    className="field-input"
                  />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <label htmlFor="password" className="field-label !mb-0">Password</label>
                    <span className="text-[10px] font-semibold uppercase tracking-brand text-gray-700">Private</span>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      maxLength={256}
                      required
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value)
                        if (error)
                          setError('')
                      }}
                      aria-describedby={error ? 'login-error' : undefined}
                      className="field-input pr-11"
                    />
                    <button
                      type="button"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      aria-pressed={showPassword}
                      onClick={() => setShowPassword(value => !value)}
                      className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-gray-600 transition-colors hover:text-forest-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-earth-amber"
                    >
                      {showPassword
                        ? <EyeSlashIcon className="h-4 w-4" aria-hidden="true" />
                        : <EyeIcon className="h-4 w-4" aria-hidden="true" />}
                    </button>
                  </div>
                </div>
              </div>

              {error && (
                <div
                  id="login-error"
                  role="alert"
                  className="mt-5 flex items-start gap-2 rounded-sm border border-error/30 bg-error-light px-3 py-2.5 text-xs leading-relaxed text-error"
                >
                  <ExclamationCircleIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{error}</span>
                </div>
              )}

              {!configured && (
                <div
                  role="status"
                  className="mt-5 flex items-start gap-2 rounded-sm border border-warning/40 bg-warning-light px-3 py-2.5 text-xs leading-relaxed text-forest-deep"
                >
                  <ExclamationTriangleIcon className="mt-0.5 h-4 w-4 shrink-0 text-warning" aria-hidden="true" />
                  <span>
                    Sign-in is not configured on this server. Set the
                    {' '}
                    <code className="font-mono text-[11px]">AUTH_*</code>
                    {' '}
                    environment variables before trying again.
                  </span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !configured}
                aria-busy={loading}
                className="btn btn-primary mt-6 h-11 w-full disabled:cursor-not-allowed"
              >
                {loading
                  ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-cream-base/50 border-r-transparent" aria-hidden="true" />
                      Signing in…
                    </>
                  )
                  : (
                    <>
                      Sign in
                      <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                    </>
                  )}
              </button>
            </form>

            <p className="mt-6 text-center text-[11px] leading-relaxed text-gray-700">
              Access is limited to invited members of the Tapítise studio.
            </p>

            {contactEmail && (
              <p className="mt-2 text-center text-[11px] leading-relaxed text-gray-700 pc:hidden">
                <a className="link" href={`mailto:${contactEmail}`}>{contactEmail}</a>
              </p>
            )}
          </div>
        </div>

        <div className="px-5 pb-5 text-center text-[10px] font-semibold uppercase tracking-brand text-gray-700 pc:hidden">
          Private workspace · © {currentYear}
        </div>
      </main>
    </div>
  )
}

export default LoginForm
