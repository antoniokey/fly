import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import resourcesToBackend from 'i18next-resources-to-backend';

import i18nConfig from '../../i18nConfig';

export default async function initTranslations(locale: string) {
  const i18nInstance = createInstance();

  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend((language: string) =>
        import(`locales/${language}.json`)
      )
    )
    .init({
      lng: locale,
      fallbackLng: i18nConfig.defaultLocale,
      supportedLngs: i18nConfig.locales,
      preload: typeof window === 'undefined' ? i18nConfig.locales : []
    });

  return i18nInstance;
}
