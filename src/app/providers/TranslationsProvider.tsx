'use client';

import { I18nextProvider } from 'react-i18next';
import React, { useEffect, useState } from 'react';

import initTranslations from '@/app/i18n';

let i18n: any;

interface TranslationsProviderProps {
  children: React.ReactNode;
  locale: string;
}

export default function TranslationsProvider({ children, locale }: TranslationsProviderProps) {
  const [instance, setInstance] = useState(i18n);

  useEffect(() => {
    const init = async (): Promise<void> => {
      if (!i18n) {
        const newInstance = await initTranslations(locale);
        i18n = newInstance;
        setInstance(newInstance);
      } else {
        if (i18n.language !== locale) {
          i18n.changeLanguage(locale);
        }
      }
    };

    init();
  }, [locale]);

  if (!instance) {
    return null;
  }

  return (
    <I18nextProvider i18n={instance}>
      {children}
    </I18nextProvider>
  );
}
