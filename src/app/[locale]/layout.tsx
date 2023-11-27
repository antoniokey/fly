import type { Metadata } from 'next';

import { Slide, ToastContainer } from 'react-toastify';

import { PrimeReactProvider } from 'primereact/api';

import 'react-toastify/dist/ReactToastify.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import './globals.css';

import Logo from '../../../public/logos/logo.png';

import TranslationsProvider from '../providers/TranslationsProvider';
import AuthProvider from '../providers/AuthProvider';

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
      <body className="h-[100vh]">
        <AuthProvider>
          <TranslationsProvider locale={locale}>
            <PrimeReactProvider>
              {children}
            </PrimeReactProvider>

            <ToastContainer
              position="bottom-right"
              closeOnClick={true}
              hideProgressBar={true}
              autoClose={3000}
              transition={Slide}
            />
          </TranslationsProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
