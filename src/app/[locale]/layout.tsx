import type { Metadata } from 'next';

import { Slide, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

import Logo from '../../../public/logos/logo.png';

import TranslationsProvider from '../providers/TranslationsProvider';

export const metadata: Metadata = { title: 'Fly' };

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode,
  params: { locale: string },
}) {
  return (
    <html lang={locale}>
      <head>
        <link rel="shortcut icon" href={Logo.src} />
      </head>
      <body>
        <TranslationsProvider locale={locale}>
          {children}

          <ToastContainer
            position="bottom-right"
            closeOnClick={true}
            hideProgressBar={true}
            autoClose={3000}
            transition={Slide}
          />
        </TranslationsProvider>
      </body>
    </html>
  )
}
