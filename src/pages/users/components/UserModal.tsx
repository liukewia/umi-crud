import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';

const UserModal = props => {
  const {visible, closeHandler, record, onFinish} = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (record === undefined) {
      form.resetFields();
    } else {
      form.setFieldsValue(record);
    }
  }, [visible]);

  const onOk = () => {
    form.submit();
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Modal
        forceRender
        visible={visible}
        title={'Basic Modal'}
        onOk={onOk}
        onCancel={closeHandler}
      >
        <Form
          form={form}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Create Time"
            name="create_time"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserModal;
