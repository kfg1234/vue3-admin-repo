import type {
  ProjectConfig,
  MenuSetting,
  TransitionSetting,
  HeaderSetting,
  MultiTabsSetting,
} from '#/config';

import { defineStore } from 'pinia';
import { store } from '@/store';
import { resetRouter } from '@/router';
import {} from '#/config';
import { ThemeEnum } from '@/enums/appEnum';
import { Persistent } from '@/utils/cache/persistent';
import { APP_DARK_MODE_KEY_, PROJ_CFG_KEY } from '@/enums/cacheEnum';
import { deepMerge } from '@/utils';
import { darkMode } from '@/settings/designSetting';
interface AppState {
  darkMode?: ThemeEnum;
  pageLoading: boolean;
  // 项目配置
  projectConfig: ProjectConfig | null;
}

let timeId: TimeoutHandle;

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
    // 获取头部设置
    getHeaderSetting(): HeaderSetting {
      return this.getProjectConfig.headerSetting;
    },
    // 获取菜单设置
    getMenuSetting(): MenuSetting {
      return this.getProjectConfig.menuSetting;
    },
    // 获取项目配置
    getProjectConfig(): ProjectConfig {
      return this.projectConfig || ({} as ProjectConfig);
    },
    // 获取标签页配置
    getMultiTabsSetting(): MultiTabsSetting {
      return this.getProjectConfig.multiTabsSetting;
    },
    getTransitionSetting(): TransitionSetting {
      return this.getProjectConfig.transitionSetting;
    },
    getPageLoading(): boolean {
      return this.pageLoading;
    },
  },
  actions: {
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading;
    },
    // 切换黑暗模式
    setDarkMode(mode: ThemeEnum): void {
      this.darkMode = mode;
      localStorage.setItem(APP_DARK_MODE_KEY_, mode);
    },
    // 存储项目配置，项目初始化时调用
    setProjectConfig(config: DeepPartial<ProjectConfig>): void {
      this.projectConfig = deepMerge(this.projectConfig || {}, config);
      Persistent.setLocal(PROJ_CFG_KEY, this.projectConfig);
    },
    /**
     * @description: 路由切换时，设置loading状态
     */
    async setPageLoadingAction(loading: boolean): Promise<void> {
      if (loading) {
        clearTimeout(timeId);
        // 防止页面闪烁
        timeId = setTimeout(() => {
          this.setPageLoading(loading);
        }, 50);
      } else {
        this.setPageLoading(loading);
        clearTimeout(timeId);
      }
    },
    async resetAllState() {
      resetRouter();
      Persistent.clearAll();
    },
  },
});

// 在setup外部使用仓库
export function useAppStoreWithOut() {
  return useAppStore(store);
}
