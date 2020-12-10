import React, { useState, FC } from 'react';
import { Table, Space, Button, Popconfirm, Pagination, message } from 'antd';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { connect, Dispatch, Loading, UserState } from 'umi';
import UserModal from './components/UserModal';
import { SingleUserType, FormValues } from './data';
import { addRecord, editRecord } from './service';

interface UserPageProps {
  users: UserState;
  userListLoading: boolean;
  dispatch: Dispatch;
}

const UserListPage: FC<UserPageProps> = ({
  users,
  userListLoading,
  dispatch,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [record, setRecord] = useState<SingleUserType | undefined>(undefined);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const editHandler = (record: SingleUserType) => {
    setModalVisible(true);
    setRecord(record);
  };

  const closeHandler = () => {
    setModalVisible(false);
  };

  const onFormFinish = async (values: FormValues) => {
    setConfirmLoading(true);
    let id = 0;
    if (record) {
      id = record.id;
    }

    let serviceFun;
    if (id) {
      serviceFun = editRecord;
    } else {
      serviceFun = addRecord;
    }
    const result = await serviceFun({ id, values });
    setConfirmLoading(false);
    if (result) {
      setModalVisible(false);
    } else {
      // message.warning(`${id === 0 ? 'Add' : 'Edit'} failed.`);
    }
    reloadHandler();
  };

  const confirmDelete = (id: number) => {
    dispatch({
      type: 'users/delete',
      payload: { id },
    });
  };

  const addHandler = () => {
    setModalVisible(true);
    setRecord(undefined);
  };

  const paginationHandler = async (page: number, pageSize?: number) => {
    console.log(page, pageSize);
    dispatch({
      type: 'users/getRemote',
      payload: {
        page,
        per_page: pageSize ? pageSize : users.meta.per_page,
      },
    });
  };

  const pageSizeHandler = async (current: number, size: number) => {
    console.log(current, size);
    dispatch({
      type: 'users/getRemote',
      payload: {
        page: current,
        per_page: size,
      },
    });
  };

  const reloadHandler = () => {
    dispatch({
      type: 'users/getRemote',
      payload: {
        page: users.meta.page,
        per_page: users.meta.per_page,
      },
    });
  };

  const columns: ProColumns<SingleUserType>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'text',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      valueType: 'text',
      key: 'name',
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: 'Create Time',
      dataIndex: 'create_time',
      valueType: 'dateTime',
      key: 'create_time',
    },
    {
      title: 'Action',
      valueType: 'option',
      key: 'action',
      render: (text: any, record: SingleUserType) => [
        <a
          onClick={() => {
            editHandler(record);
          }}
        >
          Edit
        </a>,
        <Popconfirm
          title="Are you sure to delete this user?"
          onConfirm={() => {
            confirmDelete(record.id);
          }}
          okText="Yes"
          cancelText="No"
        >
          <a>Delete</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <div className="list-table">
      <Space size="large"></Space>
      <ProTable
        rowKey="id"
        headerTitle="User List"
        toolBarRender={() => [
          <Button type="primary" onClick={addHandler}>
            Add
          </Button>,
          <Button onClick={reloadHandler}>Reload</Button>,
        ]}
        columns={columns}
        dataSource={users.data}
        loading={userListLoading}
        search={false}
        pagination={false}
        options={{
          density: true,
          fullScreen: true,
          reload: () => reloadHandler(),
          setting: true,
        }}
      />
      <Pagination
        className="list-page"
        total={users.meta.total}
        showSizeChanger
        showQuickJumper
        showTotal={total => `Total ${total} items`}
        onChange={paginationHandler}
        onShowSizeChange={pageSizeHandler}
        current={users.meta.page}
        pageSize={users.meta.per_page}
        pageSizeOptions={[`5`, `10`, `15`, `20`]}
      />
      <UserModal
        visible={modalVisible}
        closeHandler={closeHandler}
        record={record}
        onFormFinish={onFormFinish}
        confirmLoading={confirmLoading}
      ></UserModal>
    </div>
  );
};

const mapStateToProps = ({
  users,
  loading,
}: {
  users: UserState;
  loading: Loading;
}) => {
  return {
    users,
    userListLoading: loading.models.users,
  };
};

export default connect(mapStateToProps)(UserListPage);
