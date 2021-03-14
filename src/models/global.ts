import type { Reducer, Effect } from 'umi';

import type { NoticeIconData } from '@/components/NoticeIcon';
import {queryNotices, readNoticeId} from '@/services/user';

export type NoticeItem = {
  id: string;
  type: string;
  status: string;
} & NoticeIconData;

export type GlobalModelState = {
  collapsed: boolean;
  notices: NoticeItem[];
};

export type GlobalModelType = {
  namespace: 'global';
  state: GlobalModelState;
  effects: {
    fetchNotices: Effect;
    changeNoticeReadState: Effect;
  };
  reducers: {
    changeLayoutCollapsed: Reducer<GlobalModelState>;
    saveNotices: Reducer<GlobalModelState>;
  };
};

const GlobalModel: GlobalModelType = {
  namespace: 'global',

  state: {
    collapsed: false,
    notices: [],
  },

  effects: {
    *fetchNotices(_, { call, put, select }) {
      const notices = (yield call(queryNotices)).data;
      yield put({
        type: 'saveNotices',
        payload: notices,
      });

      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          notifyCount: notices.length,
        },
      });
    },
    *changeNoticeReadState({ payload : id }, { put, call }) {
      // 删除一条
      yield call(readNoticeId,{notificationId: id});

      //重新获取
      const notices = (yield call(queryNotices)).data;
      yield put({
        type: 'saveNotices',
        payload: notices,
      });

      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          notifyCount: notices.length,
        },
      });
    },
  },

  reducers: {
    changeLayoutCollapsed(state = { notices: [], collapsed: true }, { payload }): GlobalModelState {
      return {
        ...state,
        collapsed: payload,
      };
    },
    saveNotices(state, { payload }): GlobalModelState {
      return {
        collapsed: false,
        ...state,
        notices: payload,
      };
    },
  },
};

export default GlobalModel;
