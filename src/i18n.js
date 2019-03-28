import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import detectBrowserLanguage from 'detect-browser-language';
import { reactI18nextModule } from 'react-i18next';

const browserLng = detectBrowserLanguage();
let defaultLng = 'en';
if (browserLng.startsWith('de')) {
  defaultLng = 'de';
}
if (browserLng.startsWith('fr')) {
  defaultLng = 'fr';
}

i18n
  // load translation using xhr -> see /public/locales
  // learn more: https://github.com/i18next/i18next-xhr-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to the react-i18next components.
  // Alternative use the I18nextProvider: https://react.i18next.com/components/i18nextprovider
  .use(reactI18nextModule)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    lng: defaultLng,
    fallbackLng: defaultLng,
    load: 'languageOnly',
    debug: false,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    // special options for react-i18next
    // learn more: https://react.i18next.com/components/i18next-instance
    react: {
      wait: true,
      defaultTransParent: 'div',
      nsMode: 'default',
    },
  });

export default i18n;
