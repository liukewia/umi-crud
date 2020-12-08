import request, { extend } from 'umi-request';
import { message } from 'antd';

const errorHandler = function(error) {
  if (error.response) {
    if (error.response.status >= 400) {
      message.error(error.data.message ? error.data.message : error.data);
    }
  } else {
    message.error(`Network error.`);
  }
};

const extendRequest = extend({ errorHandler });

const getRemoteList = async params => {
  return extendRequest('https://public-api-v1.aspirantzhang.com/users/', {
    method: 'get',
  })
    .then(response => {
      return response;
    })
    .catch(e => {
      return false;
    });
};

const addRecord = async ({values}) => {
  return extendRequest(`https://public-api-v1.aspirantzhang.com/users`, {
    method: 'post',
    data: values,
  })
    .then(response => {
      return true;
    })
    .catch(e => {
      return false;
    });
};

const editRecord = async ({id, values}) => {
  return extendRequest(`https://public-api-v1.aspirantzhang.com/users/${id}`, {
    method: 'put',
    data: values,
  })
    .then(response => {
      return true;
    })
    .catch(e => {
      return false;
    });
};

const deleteRecord = async ({id}) => {
  return request(`https://public-api-v1.aspirantzhang.com/users/${id}`, {
    method: 'delete',
  })
    .then(response => {
      return true;
    })
    .catch(e => {
      return false;
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
