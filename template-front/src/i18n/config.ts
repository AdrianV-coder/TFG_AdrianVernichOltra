import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import es_common from "./locales/es/common.json";
import es_header from "./locales/es/header.json";
import es_navbar from "./locales/es/navbar.json";
import es_home from "./locales/es/home.json";
import es_account from "./locales/es/account.json";
import es_statistics from "./locales/es/statistics.json";
import es_auth from "./locales/es/auth.json";
import es_createHabit from "./locales/es/createHabit.json";

import en_common from "./locales/en/common.json";
import en_header from "./locales/en/header.json";
import en_navbar from "./locales/en/navbar.json";
import en_home from "./locales/en/home.json";
import en_account from "./locales/en/account.json";
import en_statistics from "./locales/en/statistics.json";
import en_auth from "./locales/en/auth.json";
import en_createHabit from "./locales/en/createHabit.json";

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "es",
    supportedLngs: ["es", "en"],
    debug: false,

    keySeparator: ".",

    resources: {
      es: {
        common: es_common,
        header: es_header,
        navbar: es_navbar,
        home: es_home,
        account: es_account,
        statistics: es_statistics,
        auth: es_auth,
        createHabit: es_createHabit,
      },
      en: {
        common: en_common,
        header: en_header,
        navbar: en_navbar,
        home: en_home,
        account: en_account,
        statistics: en_statistics,
        auth: en_auth,
        createHabit: en_createHabit,
      },
    },

    ns: [
      "common",
      "header",
      "navbar",
      "home",
      "account",
      "statistics",
      "auth",
      "createHabit",
    ],
    defaultNS: "common",

    interpolation: { escapeValue: false },
    detection: {
      order: ["querystring", "localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },
  });

export default i18n;
