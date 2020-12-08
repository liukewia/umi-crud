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
import { message } from 'antd';


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
      // message.success('Successfully fetched.');
      return payload;
    },
  },
  // effects 异步
  effects: {
    *getRemote(action, { put, call }) {
      const data = yield call(getRemoteList);
      console.log('data->', data);
      if (data) {
        yield put({
          type: 'getList',
          payload: data,
        });
      } else {
        message.error('Fail to fetch.');
      }
    },

    *add({payload: {values} }, { put, call }) {
      const data = yield call(addRecord, {values});
      if (data) {
        message.success('Successfully added.');
        yield put({
          type: 'getRemote',
        });
      } else {
        message.error('Fail to add.');
      }
    },

    *edit({payload: { id, values} }, { put, call }) {
      const data = yield call(editRecord, {id, values});
      if (data) {
        message.success('Successfully edited.');
        yield put({
          type: 'getRemote',
        });
      } else {
        message.error('Fail to edit.');
      }
    },

    *delete({payload: { id } }, { put, call }) {
      const data = yield call(deleteRecord, {id});
      if (data) {
        message.success('Successfully deleted.');
        yield put({
          type: 'getRemote',
        });
      } else {
        message.error('Fail to delete.');
      }
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
