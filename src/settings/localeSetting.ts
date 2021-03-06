// 国际化语言设置

import type { LocaleSetting, LocaleType } from '#/config';

export const LOCALE: { [key: string]: LocaleType } = {
  ZH_CN: 'zh_CN',
  EN_US: 'en',
};

// 国际化语言默认配置
export const localeSetting: LocaleSetting = {
  showPicker: true,
  // 当前语言环境
  locale: LOCALE.ZH_CN,
  // 默认语言环境
  fallback: LOCALE.ZH_CN,
  // 可用语言环境列表
  availableLocales: [LOCALE.ZH_CN, LOCALE.EN_US],
};

export interface LocaleMenu {
  text: string;
  event: string;
}

// 下拉菜单的切换语言选项
export const localeList: LocaleMenu[] = [
  {
    text: '简体中文',
    event: LOCALE.ZH_CN,
  },
  {
    text: 'English',
    event: LOCALE.EN_US,
  },
];
