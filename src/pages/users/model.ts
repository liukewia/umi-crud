import {
  Reducer,
  Effect,
  Subscription
} from 'umi';
import {
  getRemoteList,
  addRecord,
  editRecord,
  deleteRecord
} from './service';

interface UserModelType {
  namespace: 'users',
  state: {},
  reducers: {
    getList: Reducer,
  },
  effects: {
    getRemote: Effect,
    add: Effect,
    edit: Effect,
    delete: Effect,
  },
  subscriptions: {
    setup: Subscription,
  },
}

const UserModel: UserModelType = {
  // 命名空间，这个model的唯一标识名
  namespace: 'users',

  // 仓库初始值
  state: {},

  // reducers 同步
  reducers: {
    getList(state, { payload }) {
      console.log('reduces ->', payload);
      return payload;
    },
  },
  // effects 异步
  effects: {
    *getRemote(action, { put, call }) {
      const data = yield call(getRemoteList);
      console.log('data->', data);
      yield put({
        type: 'getList',
        payload: data,
      });
    },

    *add({payload: {values} }, { put, call }) {
      yield call(addRecord, {values});
      yield put({
        type: 'getRemote',
      });
    },

    *edit({payload: { id, values} }, { put, call }) {
      yield call(editRecord, {id, values});
      yield put({
        type: 'getRemote',
      });
    },

    *delete({payload: { id } }, { put, call }) {
      yield call(deleteRecord, {id});
      yield put({
        type: 'getRemote',
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
          });
        }
      });
    },
  },
};

export default UserModel;
