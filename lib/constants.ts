export const REFRESH_TOKEN = 'refreshToken'
export const ACCESS_TOKEN = 'accessToken'
export const SIGNUP_TOKEN = 'signupToken'
export const LOGIN_TOKEN = 'loginToken'
export const STATE = 'login'
export const STATEREGISTER = 'register'

export const ACCESS_TOKEN_SSO = 'access-token-cookie'


export const currentdate = new Date();

export const currentdate5minutes = new Date(Date.now() + (5 * 60 * 1000));


const JWT_SECRET_KEY: string | undefined = process.env.NEXTAUTH_SECRET!
const JWT_REFRESH_SECRET_KEY: string | undefined = process.env.REFRESH_TOKEN_SECRET!
const JWT_SIGNUP_SECRET_KEY: string | undefined = process.env.SIGNUP_TOKEN_SECRET!
const JWT_LOGIN_SECRET_KEY: string | undefined = process.env.LOGIN_TOKEN_SECRET!
export const PROJECT_ID: string | undefined = process.env.NEXT_PUBLIC_PAY_PROJECT_ID!



export function getJwtSecretKey(): string {
  if (!JWT_SECRET_KEY || JWT_SECRET_KEY.length === 0) {
    throw new Error('The environment variable JWT_SECRET_KEY is not set.')
  }

  return JWT_SECRET_KEY
}

export function getJwtSecretKeyRefreshToken(): string {
  if (!JWT_REFRESH_SECRET_KEY || JWT_REFRESH_SECRET_KEY.length === 0) {
    throw new Error('The environment variable JWT_REFRESH_SECRET_KEY is not set.')
  }

  return JWT_REFRESH_SECRET_KEY
}

export function getJwtSecretKeySignupToken(): string {
  if (!JWT_SIGNUP_SECRET_KEY || JWT_SIGNUP_SECRET_KEY.length === 0) {
    throw new Error('The environment variable JWT_SIGNUP_SECRET_KEY is not set.')
  }

  return JWT_SIGNUP_SECRET_KEY
}

export function getJwtSecretKeyLoginToken(): string {
  if (!JWT_LOGIN_SECRET_KEY || JWT_LOGIN_SECRET_KEY.length === 0) {
    throw new Error('The environment variable JWT_LOGIN_SECRET_KEY is not set.')
  }

  return JWT_LOGIN_SECRET_KEY
}


export function ToLocaleDateString(date_str: string): string {
  const date = new Date(date_str)
  return date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',

  })
}

export function ToLocaleDateStringTime(date_str: string): string {
  const date = new Date(date_str)
  return date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  })
}




