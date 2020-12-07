import { Modal } from 'antd';
import React from 'react';

const UserModal = props => {
  return (
    <div>
      <Modal
        visible={props.visible}
        title={'Basic Modal'}
        onOk={props.closeHandler}
        onCancel={props.closeHandler}
      >
        {JSON.stringify(props.record)}
      </Modal>
    </div>
  );
};

export default UserModal;
