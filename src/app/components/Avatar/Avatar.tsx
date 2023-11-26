'use client';

import Image from 'next/image';

import './Avatar.scss';

interface AvatarProps {
  user: any;
}

export default function Avatar({ user }: AvatarProps) {
  return (
    <div
      className='avatar'
      style={user.image_color && { background: user.image_color }}
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
