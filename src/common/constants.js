export const INT_DATE_FORMAT = 'YYYYMMDD';
export const THERAPY_SESSION_IN_MINUTES = 45;
export const GOOGLE_STATIC_MAPS_URL =
  'https://maps.googleapis.com/maps/api/staticmap';
export const GOOGLE_MAPS_GEOCODE_URL =
  'https://maps.googleapis.com/maps/api/geocode/json';
export const USERS = {
  THERAPIST: 'THERAPIST',
  CLIENT: 'CLIENT'
};
export const EMPTY_STRING = '';
export const EMPTY_ARRAY = [];
export const EMPTY_OBJECT = {};
export const MAP_ZOOM = 15;
export const MONTHS_INTERVAL = 3;
export const USER = 'user';
export const ADMIN = 'admin';
export const DOCTOR = 'doctor';
export const PATIENT = 'patient';
export const ES = 'es';
export const EN = 'en';
export const CANCELED = 'canceled';
export const RESERVED = 'reserved';
export const EXCEPTION = 'exception';
export const DAILY = 'daily';

export const users = {
  funcRoles: [DOCTOR, PATIENT],
  roles: [USER, ADMIN],
  languages: [ES, EN]
};

export const appointment = {
  status: [RESERVED, CANCELED]
};

export const schedule = {
  days: ['1', '2', '3', '4', '5', '6', '0'],
  types: [EXCEPTION, DAILY]
};
