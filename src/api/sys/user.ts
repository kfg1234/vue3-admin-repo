import { ErrorMessageMode } from '#/axios';
import { LoginParams, GetUserInfoModel } from './model/userModel';
import { defHttp } from '@/utils/http/axios';

enum Api {
  Login = '/login',
  Logout = '/logout',
  GetUserInfo = '/getUserInfo',
  GetPermCode = '/getPermCode',
  TestRetry = '/testRetry',
}

/**
 * @description: 登录接口
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 获取用户信息接口
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}

/**
 * @description: 获取权限列表接口
 */
export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}
