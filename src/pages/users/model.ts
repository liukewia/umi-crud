import { Reducer, Effect, Subscription } from 'umi';
import { getRemoteList, addRecord, editRecord, deleteRecord } from './service';
import { message } from 'antd';
import {SingleUserType} from './data';

export interface UserState {
  data: SingleUserType[];
  meta: {
    total: number,
    per_page: number,
    page: number,
  };
}

interface UserModelType {
  namespace: 'users';
  state: UserState;
  reducers: {
    getList: Reducer<UserState>,
  };
  effects: {
    getRemote: Effect,
    add: Effect,
    edit: Effect,
    delete: Effect,
  };
  subscriptions: {
    setup: Subscription,
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
    }
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
    *getRemote({ payload: { page, per_page }}, { put, call }) {
      const data = yield call(getRemoteList, { page, per_page });
      // console.log('data->', data);
      if (data) {
        yield put({
          type: 'getList',
          payload: data,
        });
      } else {
        // message.error('Fail to fetch.');
      }
    },

    *add({ payload: {values} }, { put, call, select }) {
      const data = yield call(addRecord, {values});
      if (data) {
        message.success('Successfully added.');
        const { page, per_page } = yield select(state => state.users.meta);
        yield put({
          type: 'getRemote',
          payload: {
            page,
            per_page,
          },
        });
      } else {
        // message.error('Fail to add.');
      }
    },

    *edit({payload: { id, values} }, { put, call, select }) {
      const data = yield call(editRecord, {id, values});
      if (data) {
        message.success('Successfully edited.');
        const { page, per_page } = yield select(state => state.users.meta);
        yield put({
          type: 'getRemote',
          payload: {
            page,
            per_page,
          },
        });
      } else {
        // message.error('Fail to edit.');
      }
    },

    *delete({payload: { id } }, { put, call, select }) {
      const data = yield call(deleteRecord, {id});
      if (data) {
        message.success('Successfully deleted.');
        const { page, per_page } = yield select(state => state.users.meta);
        yield put({
          type: 'getRemote',
          payload: {
            page,
            per_page,
          },
        });
      } else {
        // message.error('Fail to delete.');
      }
    },
  },

  // 订阅
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/users') {
          const page = 1;
          const per_page = 20;
          dispatch({
            type: 'getRemote',
            payload: { page, per_page },
          });
        }
      });
    },
  },
};

export default UserModel;
