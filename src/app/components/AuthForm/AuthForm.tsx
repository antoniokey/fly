'use client';

import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { signIn } from 'next-auth/react';

import axios from 'axios';

import randomColor from 'randomcolor';

import { yupResolver } from '@hookform/resolvers/yup';

import './AuthForm.scss';

import { getAuthFormValidationSchema } from '@/app/constants/validation/auth-form.validation';
import { AuthFormModel } from '@/app/interfaces/auth.interfaces';
import { AuthType } from '@/app/enum/auth.enum';

interface AuthFormProps {
  authType: AuthType;
  setAuthType: (authType: AuthType) => void;
}

export default function AuthForm({ authType, setAuthType }: AuthFormProps) {
  const { t: translate } = useTranslation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthFormModel>({
    resolver: yupResolver(getAuthFormValidationSchema(authType, translate)),
  });

  const onFormSubmit = async (data: AuthFormModel) => {
    if (authType === AuthType.Login) {
      try {
        await signIn(
          'credentials',
          {
            ...data,
            redirect: false,
          },
        );
      } catch(error: any) {
        toast.error(error.response?.data || error.message || translate('errors.something_goes_wrong'));
      }
    } else {
      try {
        await axios.post(
          '/api/register',
          {
            ...data,
            image_color: randomColor(),
            image: null,
          },
        );

        toast.success(translate('auth.account_was_successfully_created'));

        setAuthType(AuthType.Login);
      } catch(error: any) {
        toast.error(error.response?.data || error.message || translate('errors.something_goes_wrong'));
      }

      reset();
    }
  };

  const onSwitchAuthTypeClick = () =>
    setAuthType(
      authType === AuthType.Login
        ? AuthType.Register
        : AuthType.Login
    )

  return (
    <div className="auth-form">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className="auth-form__fields">
          <div className="auth-form__field">
            <label className="auth-form__field-label">
              {translate('auth.fields.email')}
            </label>
            <input
              className="auth-form__field-input"
              type="email"
              {...register('email', { required: true })}
            />
            {
              errors.email && (
                <div className="auth-form__field-error">
                  {errors.email.message}
                </div>
              )
            }
          </div>
          {
            authType === AuthType.Register
              ? (
                  <>
                    <div className="auth-form__field">
                      <label className="auth-form__field-label">
                        {translate('auth.fields.first_name')}
                      </label>
                      <input
                        className="auth-form__field-input"
                        {...register('first_name', { required: true })}
                      />
                      {
                        errors.first_name && (
                          <div className="auth-form__field-error">
                            {errors.first_name.message}
                          </div>
                        )
                      }
                    </div>
                    <div className="auth-form__field">
                      <label className="auth-form__field-label">
                        {translate('auth.fields.last_name')}
                      </label>
                      <input
                        className="auth-form__field-input"
                        {...register('last_name', { required: true })}
                      />
                      {
                        errors.last_name && (
                          <div className="auth-form__field-error">
                            {errors.last_name.message}
                          </div>
                        )
                      }
                    </div>
                  </>
                )
              : null
          }
          <div className="auth-form__field">
            <label className="auth-form__field-label">
              {translate('auth.fields.password')}
            </label>
            <input
              className="auth-form__field-input"
              type="password"
              {...register('password', { required: true })}
            />
            {
              errors.password && (
                <div className="auth-form__field-error">
                  {errors.password.message}
                </div>
              )
            }
          </div>
        </div>

        <button
          className="auth-form__submit-button"
          type="submit"
        >
          {
            authType === AuthType.Login
              ? translate('auth.actions.login')
              : translate('auth.actions.register')
          }
        </button>
      </form>

      <div className='auth-form__form-type-switcher'>
        <span className="auth-form__switcher-label">
          {
            authType === AuthType.Login
              ? translate('auth.do_not_have_an_account')
              : translate('auth.already_have_an_account')
          }
        </span>

        <span
          className="auth-form__switcher-button"
          onClick={onSwitchAuthTypeClick}
        >
          {
            authType === AuthType.Login
              ? translate('auth.actions.create_an_account')
              : translate('auth.actions.login')
          }
        </span>
      </div>
    </div>
  );
}
