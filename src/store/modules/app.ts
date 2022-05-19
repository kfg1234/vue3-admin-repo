import type { ProjectConfig } from '#/config';

import { defineStore } from 'pinia';

import { ThemeEnum } from '@/enums/appEnum';
import { Persistent } from '@/utils/cache/persistent';
import { APP_DARK_MODE_KEY_, PROJ_CFG_KEY } from '@/enums/cacheEnum';
import { deepMerge } from '@/utils';
import { darkMode } from '@/settings/designSetting';
interface AppState {
  darkMode?: ThemeEnum;
  // Page loading status
  pageLoading: boolean;
  // 项目配置
  projectConfig: ProjectConfig | null;
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    darkMode: undefined,
    pageLoading: false,
    projectConfig: Persistent.getLocal(PROJ_CFG_KEY),
  }),
  getters: {
    // 获取主题模式，如果本地存储没有，是使用默认值
    getDarkMode(): 'light' | 'drak' | string {
      return this.darkMode || localStorage.getItem(APP_DARK_MODE_KEY_) || darkMode;
    },
  },
  actions: {
    // 存储项目配置
    setProjectConfig(config: DeepPartial<ProjectConfig>): void {
      this.projectConfig = deepMerge(this.projectConfig || {}, config);
      Persistent.setLocal(PROJ_CFG_KEY, this.projectConfig);
    },
  },
});