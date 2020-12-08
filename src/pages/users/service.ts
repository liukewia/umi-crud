import { request } from 'umi';
import { message } from 'antd';

const getRemoteList = async params => {
  return request('https://public-api-v1.aspirantzhang.com/users/', {
    method: 'get',
  })
    .then(response => {
      message.success(`Successfully fetched.`);
      return response;
    })
    .catch(e => {
      message.error(`Fail to fetch list, ${e}`);
    });
};

const addRecord = async ({values}) => {
  return request(`https://public-api-v1.aspirantzhang.com/users`, {
    method: 'post',
    data: values,
  })
    .then(response => {
      message.success(`Successfully added.`);
    })
    .catch(e => {
      message.error(`Fail to add, ${e}`);
    });
};

const editRecord = async ({id, values}) => {
  return request(`https://public-api-v1.aspirantzhang.com/users/${id}`, {
    method: 'put',
    data: values,
  })
    .then(response => {
      message.success(`Successfully edited.`);
    })
    .catch(e => {
      message.error(`Fail to edit, ${e}`);
    });
};

const deleteRecord = async ({id}) => {
  return request(`https://public-api-v1.aspirantzhang.com/users/${id}`, {
    method: 'delete',
  })
    .then(response => {
      message.success(`Successfully deleted.`);
    })
    .catch(e => {
      message.error(`Fail to delete, ${e}`);
    });
};


export {
  getRemoteList,
  addRecord,
  editRecord,
  deleteRecord,
}

// const data = [
//   {
//     key: '1',
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//     tags: ['nice', 'developer'],
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//     tags: ['loser'],
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sidney No. 1 Lake Park',
//     tags: ['cool', 'teacher'],
//   },
// ];
