'use client';

import ClipLoader from 'react-spinners/ClipLoader';

import './Loader.scss';

import { useLoader } from '@/app/hooks/useLoader';

export default function Loader() {
  const { isLoading } = useLoader();

  return (
    <div className={`loader ${isLoading ? 'active' : ''}`}>
      <ClipLoader
        loading={isLoading}
        size={100}
      />
    </div>
  );
}
