import { TFunction } from 'i18next';

import * as Yup from 'yup';

export const getAuthFormValidationSchema = (
  authType: string,
  translate: TFunction<'translation', undefined>,
): Yup.ObjectSchema<any> =>
  Yup.object({
    email: Yup
      .string()
      .email(translate('validation_errors.invalid_email'))
      .required(translate('validation_errors.email_is_required')),
    ...(
      authType === 'register'
        ? {
            first_name: Yup
              .string()
              .required(translate('validation_errors.first_name_is_required')),
            last_name: Yup
              .string()
              .required(translate('validation_errors.last_name_is_required')),
          }
        : {}
    ),
    password: Yup
      .string()
      .required(translate('validation_errors.password_is_required')),
  });
