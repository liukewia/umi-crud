import { request } from 'umi';

export const getRemoteList = async params => {
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
