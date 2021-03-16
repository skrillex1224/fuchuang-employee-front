import { stringify } from 'querystring';
import type { Reducer, Effect } from 'umi';
import { history } from 'umi';

import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';
import {commonLogout, employeeLogin, enterpriseLogin, hrLogin} from "@/apis/login";

export type StateType = {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'employee' | 'enterprise'  | 'hr' | 'admin';
};

export type LoginModelType = {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
};

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      let response ;
      try {
        switch (payload.type) {
          case 'employee':
            response = (yield call(employeeLogin, payload)).data;
            break;
          case 'enterprise':
            response = (yield call(enterpriseLogin, payload)).data;
            break;
          case 'hr':
            response = (yield call(hrLogin, payload)).data;
            break;
          default:
            response = undefined;
        }
      } catch (e) { }

      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.status === 'ok') {
        message.success('登录成功！');
        /*登录角色,认证 , 认证的是角色的类型*/
        localStorage.setItem('token',payload.type);
        localStorage.setItem('userName',payload.userName);

        const   redirect = `/${payload.type}`;

        history.replace(redirect);
      }
    },

    *logout(_,{call}) {
      const { redirect } = getPageQuery();
      // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login' && !redirect) {
        localStorage.clear()
        yield call(commonLogout);

        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};

export default Model;
