import React, { useEffect, FC } from 'react';
import { Modal, Form, Input, DatePicker, Switch } from 'antd';
import { SingleUserType, FormValues } from '../data';
import moment from 'moment';

interface UserModalProps {
  visible: boolean;
  closeHandler: () => void;
  record: SingleUserType | undefined;
  onFormFinish: (values: FormValues) => void;
  confirmLoading: boolean;
}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const UserModal: FC<UserModalProps> = props => {
  const { visible, closeHandler, record, onFormFinish, confirmLoading } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (record === undefined) {
      form.resetFields();
    } else {
      form.setFieldsValue({
        ...record,
        create_time: moment(record.create_time),
        status: !!record.status,
      });
    }
  }, [visible]);

  const onModalOk = () => {
    form.submit();
  };

  const onFormFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Modal
        forceRender
        visible={visible}
        title={record ? `Edit User ${record.id}` : `Add A User`}
        onOk={onModalOk}
        onCancel={closeHandler}
        confirmLoading={confirmLoading}
      >
        <Form
          {...layout}
          form={form}
          name="basic"
          onFinish={onFormFinish}
          onFinishFailed={onFormFinishFailed}
          initialValues={{ status: true }}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="Create Time" name="create_time">
            <DatePicker showTime />
          </Form.Item>
          <Form.Item label="Status" name="status" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserModal;
