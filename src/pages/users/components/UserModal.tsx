import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';

const UserModal = props => {
  const {visible, closeHandler, record} = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(record)
  }, [visible]);

  return (
    <>
      <Modal
        forceRender
        visible={visible}
        title={'Basic Modal'}
        onOk={closeHandler}
        onCancel={closeHandler}
      >
        <Form
          form={form}
          name="basic"
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
