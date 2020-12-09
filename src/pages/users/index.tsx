import React, { useState, useRef, FC } from 'react';
import { Table, Space, Button, Popconfirm, Pagination, message } from 'antd';
import ProTable, {
  ProColumns,
  TableDropdown,
  ActionType,
} from '@ant-design/pro-table';
import { connect, Dispatch, Loading, UserState } from 'umi';
import UserModal from './components/UserModal';
import { SingleUserType, FormValues } from './data';
import { addRecord, editRecord } from './service';

interface UserPageProps {
  users: UserState;
  userListLoading: boolean;
  dispatch: Dispatch;
}

interface ActionType {
  reload: () => void;
  fetchMore: () => void;
  reset: () => void;
}

const UserListPage: FC<UserPageProps> = ({
  users,
  userListLoading,
  dispatch,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [record, setRecord] = useState<SingleUserType | undefined>(undefined);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const ref = useRef<ActionType>();

  const editHandler = (record: SingleUserType) => {
    setModalVisible(true);
    setRecord(record);
  };

  const closeHandler = () => {
    setModalVisible(false);
  };

  const onFinish = async (values: FormValues) => {
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
    dispatch({
      type: 'users/getRemote',
      payload: {
        page: users.meta.page,
        per_page: users.meta.per_page,
      },
    });
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

  const reloadHandler = () => {
    ref.current.reload();
  };

  const paginationHandler = async (page, pageSize) => {
    console.log(page, pageSize);
    dispatch({
      type: 'users/getRemote',
      payload: {
        page,
        per_page: pageSize,
      },
    });
  };

  const pageSizeHandler = async (current, size) => {
    console.log(current, size);
    dispatch({
      type: 'users/getRemote',
      payload: {
        page: current,
        per_page: size,
      },
    });
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
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Create Time',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: SingleUserType) => (
        <Space size="middle">
          <a
            onClick={() => {
              editHandler(record);
            }}
          >
            Edit
          </a>
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => {
              confirmDelete(record.id);
            }}
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
      <Space size="large">
        <Button type="primary" onClick={addHandler}>
          Add
        </Button>
        <Button onClick={reloadHandler}>Reload</Button>
      </Space>
      <ProTable
        rowKey="id"
        columns={columns}
        dataSource={users.data}
        loading={userListLoading}
        search={false}
        actionRef={ref}
        pagination={false}
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
        onFinish={onFinish}
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
