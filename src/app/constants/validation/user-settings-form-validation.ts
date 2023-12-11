import { TFunction } from 'i18next';

import * as Yup from 'yup';

export const getUserSettingsFormValidationSchema = (
  translate: TFunction<'translation', undefined>,
): Yup.ObjectSchema<any> =>
  Yup.object({
    email: Yup
      .string()
      .email(translate('validation_errors.invalid_email'))
      .required(translate('validation_errors.email_is_required')),
    first_name: Yup
      .string()
      .required(translate('validation_errors.first_name_is_required')),
    last_name: Yup
      .string()
      .required(translate('validation_errors.last_name_is_required')),
  });
