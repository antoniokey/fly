'use client';

import { useState } from 'react';

import { default as AvatarPickerWidget } from 'react-avatar-edit';
import { ColorObject, default as ColorPickerWidget } from 'react-pick-color';
import { useTranslation } from 'react-i18next';

import './Editor.scss';

import { AvatarEditorModalState, User } from '@/app/interfaces/users.interfaces';

import Avatar from '../Avatar';

interface EditorProps {
  user: User;
  onAvatarEditorSave: (user: User) => void;
}

export default function Editor({ user, onAvatarEditorSave }: EditorProps) {
  const [editorData, setEditorData] = useState<AvatarEditorModalState>({
    imageColor: user.image_color || '',
    image: user.image || '',
  });

  const { t: translate } = useTranslation();
  
  const onImageCrop = (image: string) =>
    setEditorData(
      (editorDataState: AvatarEditorModalState) => ({  ...editorDataState, image }),
    );

  const onImageRemove = () =>
    setEditorData(
      (editorDataState: AvatarEditorModalState) => ({  ...editorDataState, image: null }),
    );

  const onColorChange = (color: ColorObject) =>
    setEditorData(
      (editorDataState: AvatarEditorModalState) => ({  ...editorDataState, imageColor: color.hex }),
    );

  const updatedUser: User = {
    ...user,
    image: editorData.image,
    image_color: editorData.imageColor,
  };

  return (
    <div className="avatar-editor">
      <div className="avatar-editor__preview">
        <Avatar
          user={updatedUser}
          isEditable={false}
          status={null}
        />
      </div>

      <div className="avatar-editor__pickers">
        <div className='avatar-editor__color-picker'>
          <div className="avatar-editor__color-picker-title">
            {translate('settings.avatar_editor.select_color')}
          </div>

          <ColorPickerWidget
            className="avatar-editor__color-picker-widget"
            color={editorData.imageColor}
            onChange={onColorChange} 
          />
        </div>

        <div className="avatar-editor__pickers-delimiter">
          {translate('settings.avatar_editor.delimiter')}
        </div>

        <div className="avatar-editor__image-picker">
          <div className="avatar-editor__image-picker-title">
            {translate('settings.avatar_editor.select_image')}
          </div>

          <div className="avatar-editor__image-picker-widget">
            <AvatarPickerWidget
              width={300}
              height={300}
              onCrop={onImageCrop}
              onClose={onImageRemove}
            />
          </div>
        </div>
      </div>

      <div
        className="avatar-editor__save-button"
        onClick={() => onAvatarEditorSave(updatedUser)}
      >
        {translate('settings.actions.save')}
      </div>
    </div>
  );
}
