import React from 'react';

import { LanguageSelectionOption } from '../interfaces/locale.interfaces';

export const getLanguageSelectionOptionLabel = (
  options: LanguageSelectionOption[],
  language: string,
): React.ReactNode =>
  options.find(option => option.value === language)?.label;
