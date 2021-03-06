import enData from '../../static/location/en';
import esData from '../../static/location/es';

const langs = {
  en: enData,
  es: esData,
};

const language =
  (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage;
const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];
const messages = { es: langs.es, en: langs.en };
const fallbackLocale = 'es';
const locale = languageWithoutRegionCode;
window.glob = {};

window.glob.language = languageWithoutRegionCode.toLowerCase();

export { locale, fallbackLocale, messages, languageWithoutRegionCode, language };
