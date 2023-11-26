'use client';

import Image from 'next/image';

import randomColor from 'randomcolor';

import './Avatar.scss';

interface AvatarProps {
  user: any;
}

export default function Avatar({ user }: AvatarProps) {
  const color = !user.image ? randomColor() : '';

  return (
    <div
      className='avatar'
      style={{ background: color }}
    >
      {
        user.image
          ? (
              <Image
                className='avatar__image'
                alt='avatar-image'
                src={user.image}
                fill
              />
            )
          : (
            <div className='avatar__first-letters'>
              {user.first_name[0].toUpperCase()}
              {user.last_name[0].toUpperCase()}
            </div>
          )
      }
    </div>
  );
}
