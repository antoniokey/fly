'use client';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import axios from 'axios';

import { useSession } from 'next-auth/react';

import './Settings.scss';

import Avatar from '@/app/components/Avatar/Avatar';
import { UserSettingsFormModel } from '@/app/interfaces/users.interfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import { getUserSettingsFormValidationSchema } from '@/app/constants/validation/user-settings-form-validation';

export default function Settings() {
  const session = useSession();

  const { t: translate } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSettingsFormModel>({
    resolver: yupResolver(getUserSettingsFormValidationSchema(translate)),
  });

  const user = session.data?.user;

  const onUserInfoSubmit = async (userData: UserSettingsFormModel) => {
    try {
      await axios.put(`/api/users/${user.id}`, userData);

      toast.success(translate('settings.user_was_successfully_updated'));
    } catch(error: any) {
      toast.error(error.response?.data || error.message || translate('errors.something_goes_wrong'));
    }
  };

  return (
    <div className="user-settings">
      <div className="user-settings__avatar">
        <Avatar
          user={user}
          status={null}
          isEditable={true}
        />
      </div>

      <div className="user-settings__divider"></div>

      <div className="user-settings__info">
        <form
          className="user-settings__info-form"
          onSubmit={handleSubmit(onUserInfoSubmit)}
        >
          <div className="user-settings__info-fields">
            <div className="user-settings__info-field">
              <label className="user-settings__info-field-label">
                {translate('settings.fields.email')}
              </label>
              <input
                className="user-settings__info-field-input"
                type="email"
                {...register('email', { required: true, value: user?.email || '' })}
              />
              {
                errors.email && (
                  <div className="user-settings__info-field-error">
                    {errors.email.message}
                  </div>
                )
              }
            </div>

            <div className="user-settings__info-field">
              <label className="user-settings__info-field-label">
                {translate('settings.fields.first_name')}
              </label>
              <input
                className="user-settings__info-field-input"
                {...register('first_name', { required: true, value: user?.first_name || '' })}
              />
              {
                errors.first_name && (
                  <div className="user-settings__info-field-error">
                    {errors.first_name.message}
                  </div>
                )
              }
            </div>

            <div className="user-settings__info-field">
              <label className="user-settings__info-field-label">
                {translate('settings.fields.last_name')}
              </label>
              <input
                className="user-settings__info-field-input"
                {...register('last_name', { required: true, value: user?.last_name || '' })}
              />
              {
                errors.last_name && (
                  <div className="user-settings__info-field-error">
                    {errors.last_name.message}
                  </div>
                )
              }
            </div>
          </div>

          <button
            className="user-settings__submit-info-button"
            type="submit"
          >
            {translate('settings.actions.save')}
          </button>
        </form>
      </div>
    </div>
  );
}
