import type { AppInfo } from '@/types/app'
export const APP_ID = `${process.env.NEXT_PUBLIC_APP_ID}`
export const API_KEY = `${process.env.NEXT_PUBLIC_APP_KEY}`
export const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`
export const IS_WORKFLOW = `${process.env.NEXT_PUBLIC_APP_TYPE_WORKFLOW}` === 'true'
export const APP_INFO: AppInfo = {
  title: 'Tapítise',
  description: 'Artisanal texts, grown with care.',
  copyright: 'Tapítise',
  privacy_policy: '',
  default_language: 'en',
  contact_email: 'tapitise@gmail.com',
  contact_phone: '+55 11 99620-1517',
  contact_whatsapp: '5511996201517',
}

export const API_PREFIX = `${process.env.NEXT_PUBLIC_API_PREFIX || '/api'}`

export const APP_BASE_PATH = `${process.env.NEXT_PUBLIC_APP_BASE_URL_PATH || ''}`.replace(/\/+$/, '')

export const LOCALE_COOKIE_NAME = 'locale'

export const DEFAULT_VALUE_MAX_LEN = 48
