'use client';

import { useState } from 'react';
import { MdModeEdit } from 'react-icons/md';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import axios from 'axios';

import Image from 'next/image';
import { useSession } from 'next-auth/react';

import './Avatar.scss';

import { User } from '@/app/interfaces/users.interfaces';
import { Status } from '@/app/enum/users.enum';

import Editor from './Editor/Editor';

interface AvatarProps {
  user: User;
  status: Status | null;
  isEditable: boolean;
}

export default function Avatar({ user, status, isEditable }: AvatarProps) {
  const session = useSession();

  const [isAvatarEditorModalOpened, setIsAvatarEditorModalOpened] = useState(false);

  const { t: translate } = useTranslation();

  const onAvararEditorModalClosed = () => setIsAvatarEditorModalOpened(false);

  const onAvatarEditorSave = async (updatedUser: User) => {
    try {
      await axios.put(`/api/users/${updatedUser.id}`, updatedUser);

      await session.update({ user: updatedUser });

      setIsAvatarEditorModalOpened(false);

      toast.success(translate('settings.avatar_was_successfully_updated'));
    } catch(error: any) {
      toast.error(error.response?.data || error.message || translate('errors.something_goes_wrong'));
    }
  };

  return (
    <div
      className="avatar"
      style={
        user?.image_color
          ? { background: user.image_color }
          : {}
      }
    >
      {status && <div className={`avatar__status ${status}`}></div>}

      {
        user?.image
          ? (
              <Image
                className="avatar__image"
                alt='avatar-image'
                src={user.image}
                fill
              />
            )
          : (
            <div className="avatar__first-letters">
              {user?.first_name[0]?.toUpperCase()}
              {user?.last_name[0]?.toUpperCase()}
            </div>
          )
      }

      {
        isEditable && (
          <div className="avatar__edit-icon">
            <MdModeEdit onClick={() => setIsAvatarEditorModalOpened(true)} />
          </div>
        )
      }

      <Modal
        className="avatar__editor-modal"
        isOpen={isAvatarEditorModalOpened}
        shouldFocusAfterRender={false}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        onRequestClose={onAvararEditorModalClosed}
      >
        <Editor
          user={user}
          onAvatarEditorSave={onAvatarEditorSave}
        />
      </Modal>
    </div>
  );
}
