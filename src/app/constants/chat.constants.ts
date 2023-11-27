import { TFunction } from 'i18next';

import { MenuItem } from 'primereact/menuitem';

export const getHeaderSettingsMenuItems = (
  translate: TFunction<'translation', undefined>,
  onLeaveClick: () => void,
): MenuItem[] => {
  return [
    {
      label: translate('chat.settings_menu.leave'),
      command: onLeaveClick
    },
  ];
};