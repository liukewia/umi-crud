import request from 'umi-request';
import { message } from 'antd';
import { FormValues } from './data';

const errorHandler = function(error: any, situation: string) {
  // console.log(error.response);
  if (error.response) {
    if (error.response.status >= 400) {
      console.log(error.data);
      let errText = error.data.message ? error.data.message : error.data;
      errText = (new RegExp(/(.*)(\.$)/).test(errText)
        ? errText.match(/(.*)(\.$)/)[1]
        : errText
      ).toLowerCase();

      message.error(
        `Got Error [` + errText + `] when ` + situation.toUpperCase(),
      );
    }
  } else {
    message.error(`Other network error.`);
  }
  return false;
};

const getRemoteList = async ({
  page,
  per_page,
}: {
  page: number;
  per_page: number;
}) => {
  console.log(page, per_page);
  return request(
    `https://public-api-v1.aspirantzhang.com/users?page=${page}&per_page=${per_page}`,
    {
      method: 'get',
    },
  )
    .then(response => {
      // message.success('Successfully fetched.');
      return response;
    })
    .catch(e => {
      const situation = `fetching remote list.`;
      return errorHandler(e, situation);
    });
};

const addRecord = async ({ values }: { values: FormValues }) => {
  return request(`https://public-api-v1.aspirantzhang.com/users`, {
    method: 'post',
    data: values,
  })
    .then(response => {
      message.success('Successfully added.');
      return true;
    })
    .catch(e => {
      const situation = `adding record.`;
      return errorHandler(e, situation);
    });
};

const editRecord = async ({
  id,
  values,
}: {
  id: number;
  values: FormValues;
}) => {
  return request(`https://public-api-v1.aspirantzhang.com/users/${id}`, {
    method: 'put',
    data: values,
  })
    .then(response => {
      message.success('Successfully edited.');
      return true;
    })
    .catch(e => {
      const situation = `editing record.`;
      return errorHandler(e, situation);
    });
};

const deleteRecord = async ({ id }: { id: number }) => {
  return request(`https://public-api-v1.aspirantzhang.com/users/${id}`, {
    method: 'delete',
  })
    .then(response => {
      message.success('Successfully deleted.');
      return true;
    })
    .catch(e => {
      const situation = `deleting record.`;
      return errorHandler(e, situation);
    });
};

export { getRemoteList, addRecord, editRecord, deleteRecord };
