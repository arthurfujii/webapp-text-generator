'use client'
import { useState } from 'react'
import type { FormEvent } from 'react'
import {
  ArrowRightIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/outline'
import { APP_BASE_PATH } from '@/config'

type LoginFormProps = {
  appTitle: string
  appDescription: string
  nextPath: string
  configured: boolean
  currentYear: number
}

type LoginResponse = {
  message?: string
}

const BrandMark = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={className}
  >
    <rect x="1" y="1" width="38" height="38" rx="6" fill="#1A3B2B" stroke="#181C19" strokeWidth="2" />
    <path d="M20 31V18.5" stroke="#E8DFC8" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M20 23.5C20 23.5 14.2 24 11.5 19.8C15.4 16.2 20 19 20 23.5Z" fill="#E8DFC8" />
    <path d="M20 17.5C20 17.5 25.8 18 28.5 13.8C24.6 10.2 20 13 20 17.5Z" fill="#C88238" />
    <path d="M13.5 31H26.5" stroke="#D2C5A7" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="28.6" cy="28.4" r="1.6" fill="#C88238" />
  </svg>
)

const LoginForm = ({
  appTitle,
  appDescription,
  nextPath,
  configured,
  currentYear,
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

  return (
    <div className="min-h-screen bg-cream-light paper-texture pc:grid pc:grid-cols-2">
      <aside className="relative hidden min-h-screen overflow-hidden bg-forest-dark forest-texture px-10 py-10 text-cream-base pc:flex pc:flex-col pc:justify-between xl:px-16">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-24 top-[18%] h-72 w-72 rounded-full border border-cream-base/10" />
          <div className="absolute -right-10 top-[26%] h-40 w-40 rounded-full border border-earth-amber/25" />
          <div className="absolute -bottom-16 left-1/2 select-none font-display text-[16rem] leading-none text-cream-base/[0.04]">t</div>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <BrandMark className="h-10 w-10 shrink-0" />
          <div>
            <div className="eyebrow text-earth-amber-light">Text Studio</div>
            <div className="mt-1 font-display text-xl leading-none text-cream-base">{appTitle}</div>
          </div>
        </div>

        <div className="relative z-10 max-w-lg py-16">
          <div className="mb-6 h-px w-16 bg-earth-amber/70" />
          <p className="font-display text-[2.75rem] leading-[1.05] tracking-tight text-cream-base">
            A quiet place
            <br />
            for <span className="text-earth-amber-light">bold words.</span>
          </p>
          {appDescription && (
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream-base/70">{appDescription}</p>
          )}
        </div>

        <div className="relative z-10 flex items-center justify-between gap-4 text-[10px] font-semibold uppercase tracking-brand text-cream-base/70">
          <span>Private workspace</span>
          <span>© {currentYear}</span>
        </div>
      </aside>

      <main className="flex min-h-screen flex-col bg-cream-light/60">
        <div className="flex items-center gap-3 border-b border-sand/70 px-5 py-4 pc:hidden">
          <BrandMark className="h-8 w-8 shrink-0" />
          <div>
            <div className="eyebrow text-earth-amber-dark">Text Studio</div>
            <div className="mt-1 font-display text-lg leading-none text-forest-dark">{appTitle}</div>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-md">
            <div className="mb-7">
              <div className="eyebrow text-earth-amber-dark">Restricted access</div>
              <h1 className="mt-2 font-display text-3xl leading-tight text-forest-dark">Welcome back</h1>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Sign in to continue to your writing studio.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="card bg-cream-base/50 p-5 shadow-woodcut pc:p-6"
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
                    <span className="text-[10px] font-semibold uppercase tracking-brand text-gray-600">Private</span>
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
                      className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-muted transition-colors hover:text-forest-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-earth-amber"
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
                  className="mt-5 flex items-start gap-2 rounded-sm border border-warning/40 bg-warning-light px-3 py-2.5 text-xs leading-relaxed text-forest-dark"
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

            <p className="mt-6 text-center text-[11px] leading-relaxed text-gray-600">
              Access is limited to invited members of the Tapítise studio.
            </p>
          </div>
        </div>

        <div className="px-5 pb-5 text-center text-[10px] font-semibold uppercase tracking-brand text-gray-600 pc:hidden">
          Private workspace · © {currentYear}
        </div>
      </main>
    </div>
  )
}

export default LoginForm
