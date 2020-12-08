import React, { useState } from 'react';
import { Table, Space, Popconfirm, message } from 'antd';
import { connect } from 'umi';
import UserModal from './components/UserModal';

const index = ({ users, dispatch }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [record, setRecord] = useState(undefined);

  const editHandler = record => {
    setModalVisible(true);
    setRecord(record);
  };

  const closeHandler = () => {
    setModalVisible(false);
  };


  const onFinish = values => {
    console.log(values);
    const id = record.id;
    dispatch({
      type: 'users/edit',
      payload: {
        id,
        values
      },
    });
  };

  const confirm = (record) => {
    setRecord(record);
    const id = record.id;
    console.log(id)
    dispatch({
      type: 'users/delete',
      payload: { id },
    });
    message.success('Click on Yes');
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Create Time',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a
            onClick={() => {editHandler(record)}}
          >
            Edit
          </a>
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => {confirm(record)}}
            okText="Yes"
            cancelText="No"
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="list-table">
      <Table
        rowKey="id"
        columns={columns}
        dataSource={users.data}
      />
      <UserModal
        visible={modalVisible}
        closeHandler={closeHandler}
        record={record}
        onFinish={onFinish}
      ></UserModal>
    </div>
  );
};

const mapStateToProps = ({ users }) => {
  return {
    users,
  };
};

export default connect(mapStateToProps)(index);
