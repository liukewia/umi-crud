import {
  Reducer,
  Effect,
  Subscription
} from 'umi';
import {
  getRemoteList,
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
      // state 上一次的数据
      //   const data = [
      //     {
      //       key: '1',
      //       name: 'John Brown',
      //       age: 32,
      //       address: 'New York No. 1 Lake Park',
      //       tags: ['nice', 'developer'],
      //     },
      //     {
      //       key: '2',
      //       name: 'Jim Green',
      //       age: 42,
      //       address: 'London No. 1 Lake Park',
      //       tags: ['loser'],
      //     },
      //     {
      //       key: '3',
      //       name: 'Joe Black',
      //       age: 32,
      //       address: 'Sidney No. 1 Lake Park',
      //       tags: ['cool', 'teacher'],
      //     },
      //   ];
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
    
    *edit({payload: { id, values} }, { put, call }) {
      yield call(editRecord, {id, values});
    },
    
    *delete({payload: { id } }, { put, call }) {
      yield call(deleteRecord, {id});
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
