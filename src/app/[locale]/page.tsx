'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import './HomePage.scss';

import Logo from '../../../public/logos/logo.png';

import AuthForm from '../components/AuthForm/AuthForm';

export default function Home() {
  const [authType, setAuthType] = useState('login');

  const { t: translate, i18n } = useTranslation();

  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === 'authenticated') {
      router.push(`/${i18n.language}/users/${session.data.user.id}`);
    }
  }, [session.status, router]);
  
  return (
    <div className='home-page'>
      <div className='home-page__auth'>
        <Image
          alt="logo"
          src={Logo.src}
          height={50}
          width={50}
          className="home-page__auth-image"
        />

        <div className="home-page__auth-title">
          {
            authType === 'login'
              ? translate('auth.login_title')
              : translate('auth.register_title')
          }
        </div>

        <div className='home-page__auth-form'>
          <AuthForm
            authType={authType}
            setAuthType={setAuthType}
          />
        </div>
      </div>
    </div>
  );
}
