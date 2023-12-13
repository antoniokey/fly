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
import SocketProvider from '../providers/SocketProvider';
import { PageProps } from '../interfaces/common.interfaces';
import LoaderProvider from '../providers/LoaderProvider';

export const metadata: Metadata = { title: 'Fly' };

export default async function RootLayout(
  {
    children,
    params: { locale },
  }: Required<PageProps>,
) {
  return (
    <html lang={locale}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

        <link rel="shortcut icon" href={Logo.src} />
      </head>
      <body className="h-[100vh]">
        <AuthProvider>
          <TranslationsProvider locale={locale}>
            <LoaderProvider>
              <PrimeReactProvider>
                <SocketProvider>
                  {children}
                </SocketProvider>
              </PrimeReactProvider>

              <ToastContainer
                position="bottom-right"
                closeOnClick={true}
                hideProgressBar={true}
                autoClose={3000}
                transition={Slide}
              />
            </LoaderProvider>
          </TranslationsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
