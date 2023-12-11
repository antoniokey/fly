import { TFunction } from 'i18next';

import { MenuItem } from 'primereact/menuitem';

export const getHeaderSettingsMenuItems = (
  translate: TFunction<'translation', undefined>,
  onLeaveChat: () => void,
  onClearChat: () => void,
): MenuItem[] => {
  return [
    {
      label: translate('chat.settings_menu.clear'),
      className: 'chat-header__settings-menu-clear',
      command: onClearChat,
    },
    {
      label: translate('chat.settings_menu.leave'),
      className: 'chat-header__settings-menu-leave',
      command: onLeaveChat,
    },
  ];
};
