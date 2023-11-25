'use client';

import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { signIn } from 'next-auth/react';

import axios from 'axios';

import { yupResolver } from '@hookform/resolvers/yup';

import './AuthForm.scss';

import { getAuthFormValidationSchema } from '@/app/constants/validation/auth-form.validation';

interface AuthFormProps {
  authType: string;
  setAuthType: (authType: string) => void;
}

interface AuthFormModel {
  email: string;
  first_name?: string | unknown;
  last_name?: string | unknown;
  password: string;
}

export default function AuthForm({ authType, setAuthType }: AuthFormProps) {
  const { t: translate } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormModel>({
    resolver: yupResolver(getAuthFormValidationSchema(authType, translate)),
  });

  const onFormSubmit = async (data: AuthFormModel) => {
    if (authType === 'login') {
      try {
        await signIn(
          'credentials',
          {
            ...data,
            redirect: false,
          },
        );
      } catch(error) {
        toast.error(translate('errors.something_goes_wrong'));
      }
    } else {
      try {
        await axios.post('/api/register', data);

        toast.success(translate('auth.account_was_successfully_created'));

        setAuthType('login');
      } catch(error) {
        toast.error(translate('errors.something_goes_wrong'));
      }
    }
  };

  const onSwitchAuthTypeClick = () =>
    setAuthType(
      authType === 'login'
        ? 'register'
        : 'login'
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
            authType === 'register'
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
            authType === 'login'
              ? translate('auth.actions.login')
              : translate('auth.actions.register')
          }
        </button>
      </form>

      <div className='auth-form__form-type-switcher'>
        <span className="auth-form__switcher-label">
          {
            authType === 'login'
              ? translate('auth.do_not_have_an_account')
              : translate('auth.already_have_an_account')
          }
        </span>

        <span
          className="auth-form__switcher-button"
          onClick={onSwitchAuthTypeClick}
        >
          {
            authType === 'login'
              ? translate('auth.actions.create_an_account')
              : translate('auth.actions.login')
          }
        </span>
      </div>
    </div>
  );
}
