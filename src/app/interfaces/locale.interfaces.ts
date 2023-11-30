import React from 'react';

import { LocaleCode } from '../enum/locale.enum';

export interface LanguageSelectionOption {
  value: LocaleCode;
  label: React.ReactNode;
}

export type LocaleLabelByCode = { [key: string]: string };
