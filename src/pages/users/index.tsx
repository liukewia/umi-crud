import React, { useState } from 'react';
import { Table, Space } from 'antd';
import { connect } from 'umi';
import UserModal from './components/UserModal';

const index = ({ users }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [record, setRecord] = useState(undefined);

  const editHandler = record => {
    setModalVisible(true);
    setRecord(record);
  };

  const closeHandler = () => {
    setModalVisible(false);
  };

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
          <a>Delete</a>
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
