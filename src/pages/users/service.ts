import { request } from 'umi';

const getRemoteList = async params => {
  return request('https://public-api-v1.aspirantzhang.com/users/', {
    method: 'get',
  })
    .then(response => {
      console.log(response);
      return response;
    })
    .catch(e => {
      console.log(e);
    });
};

const editRecord = async ({id, values}) => {
  return request(`https://public-api-v1.aspirantzhang.com/users/${id}`, {
    method: 'put',
    data: values,
  })
    .then(response => {
      console.log('edit ok');
      return response;
    })
    .catch(e => {
      console.log(e);
    });
};

const deleteRecord = async ({id}) => {
  return request(`https://public-api-v1.aspirantzhang.com/users/${id}`, {
    method: 'delete',
    params: id,
  })
    .then(response => {
      console.log('delete ok');
      return response;
    })
    .catch(e => {
      console.log(e);
    });
};


export {
  getRemoteList,
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
