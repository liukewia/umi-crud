import React, { useState } from 'react';
import { Table, Space, Button, Popconfirm, message } from 'antd';
import { connect } from 'umi';
import UserModal from './components/UserModal';

const index = ({ users, userListLoading, dispatch }) => {
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
    let id = 0;
    if (record) {
      id = record.id;
    }
    if (id) {
      console.log('edit');
      dispatch({
        type: 'users/edit',
        payload: { id, values },
      });
    } else {
      console.log('add');
      dispatch({
        type: 'users/add',
        payload: { values },
      });
    }
    setModalVisible(false);
  };

  const confirmDelete = (record) => {
    setRecord(record);
    const id = record.id;
    console.log(id)
    dispatch({
      type: 'users/delete',
      payload: { id },
    });
  }

  const addHandler = () => {
    setModalVisible(true);
    setRecord(undefined);
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
            onConfirm={() => {confirmDelete(record)}}
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
      <Button
        type="primary"
        onClick={addHandler}
      >Add</Button>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={users.data}
        loading={userListLoading}
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

const mapStateToProps = ({ users, loading }) => {
  return {
    users,
    userListLoading: loading.models.users,
  };
};

export default connect(mapStateToProps)(index);
