import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import LoginForm from './login-form'
import { APP_INFO } from '@/config'
import { isAuthConfigured } from '@/lib/auth/config'
import { sanitizeNextPath } from '@/lib/auth/redirect'
import { getSessionUsername } from '@/lib/auth/server'

export const metadata: Metadata = {
  title: `Sign in — ${APP_INFO.title}`,
  description: APP_INFO.description,
}

type LoginPageProps = {
  searchParams?: {
    next?: string | string[]
  }
}

const LoginPage = async ({ searchParams }: LoginPageProps) => {
  const username = await getSessionUsername()
  if (username)
    redirect('/')

  return (
    <LoginForm
      appTitle={APP_INFO.title}
      appDescription={APP_INFO.description}
      nextPath={sanitizeNextPath(searchParams?.next)}
      configured={isAuthConfigured()}
      currentYear={new Date().getFullYear()}
      contactEmail={APP_INFO.contact_email}
      contactPhone={APP_INFO.contact_phone}
      contactWhatsapp={APP_INFO.contact_whatsapp}
    />
  )
}

export default LoginPage
