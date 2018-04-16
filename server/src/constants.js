export const USER = 'user'
export const ADMIN = 'admin'
export const DOCTOR = 'doctor'
export const PATIENT = 'patient'
export const ES = 'es'
export const EN = 'en'
export const CANCELED = 'canceled'
export const RESERVED = 'reserved'
export const EXCEPTION = 'exception'
export const DAILY = 'daily'

export const users = {
  funcRoles: [DOCTOR, PATIENT],
  roles: [USER, ADMIN],
  languages: [ES, EN]
}

export const appointment = {
  status: [RESERVED, CANCELED]
}

export const schedule = {
  days: ['1', '2', '3', '4', '5', '6', '0'],
  types: [EXCEPTION, DAILY]
}
