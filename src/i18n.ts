import i18n from "i18next";
import translationEn from './assets/i18n/en.json'
import translationKz from './assets/i18n/kz.json'
import translationRu from './assets/i18n/ru.json'
import {initReactI18next} from "react-i18next";

const resources = {
    kz: {
        translation: translationKz
    },
    ru: {
        translation: translationRu
    },
    en: {
        translation: translationEn
    }
};

i18n
    .use(initReactI18next)
    .init({
    fallbackLng: 'ru',
    resources,
    detection: {
        order: ['htmlTag', 'localStorage', 'cookie', 'path', 'subdomain'],
        caches: ['localStorage'],
    },
    react: {useSuspense: false},
    interpolation: {
        escapeValue: false
    },
});

export default i18n;