import { Reducer, Effect, Subscription } from 'umi';
import { getRemoteList, addRecord, editRecord, deleteRecord } from './service';
import { SingleUserType } from './data';

export interface UserState {
  data: SingleUserType[];
  meta: {
    total: number;
    per_page: number;
    page: number;
  };
}

interface UserModelType {
  namespace: 'users';
  state: UserState;
  reducers: {
    getList: Reducer<UserState>;
  };
  effects: {
    getRemote: Effect;
    add: Effect;
    edit: Effect;
    delete: Effect;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const UserModel: UserModelType = {
  // 命名空间，这个model的唯一标识名
  namespace: 'users',

  // 仓库初始值
  state: {
    data: [],
    meta: {
      total: 0,
      per_page: 5,
      page: 1,
    },
  },

  // reducers 同步
  reducers: {
    getList(state, { payload }) {
      // console.log('reduces ->', payload);
      return payload;
    },
  },
  // effects 异步
  effects: {
    *getRemote({ payload: { page, per_page } }, { put, call }) {
      const data = yield call(getRemoteList, { page, per_page });
      // console.log('data->', data);
      if (data) {
        yield put({
          type: 'getList',
          payload: data,
        });
      }
    },

    *add({ payload: { values } }, { put, call, select }) {
      yield call(addRecord, { values });
      const { page, per_page } = yield select((state: any) => state.users.meta);
      yield put({
        type: 'getRemote',
        payload: {
          page,
          per_page,
        },
      });
    },

    *edit({ payload: { id, values } }, { put, call, select }) {
      yield call(editRecord, { id, values });
      const { page, per_page } = yield select((state: any) => state.users.meta);
      yield put({
        type: 'getRemote',
        payload: {
          page,
          per_page,
        },
      });
    },

    *delete({ payload: { id } }, { put, call, select }) {
      yield call(deleteRecord, { id });
      const { page, per_page } = yield select((state: any) => state.users.meta);
      yield put({
        type: 'getRemote',
        payload: {
          page,
          per_page,
        },
      });
    },
  },

  // 订阅
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/users') {
          dispatch({
            type: 'getRemote',
            payload: {
              page: 1,
              per_page: 5,
            },
          });
        }
      });
    },
  },
};

export default UserModel;
