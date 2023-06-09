import React, { useState } from 'react'
import { Form, Modal, Table, Typography, Button, FormInstance } from 'antd';
import { DeveloperTableType } from '../../global.type';
interface DeveloperFormModalProps {
  data: DeveloperTableType[];
  isViewAssigningModal: boolean;
  setIsViewAssigningModal: (value: boolean) => void;
  handleSelectDeveloper: (ids: string[]) => void;
}
const AssigningDevelopersModal = ({ data, isViewAssigningModal, setIsViewAssigningModal, handleSelectDeveloper }: DeveloperFormModalProps) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '25%',
      editable: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '40%',
      editable: true,
    },
    Table.SELECTION_COLUMN
  ];

  const onSelectChange = (newSelectedRowKeys: any) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <Modal
      title="Please select developers for this project"
      centered
      open={isViewAssigningModal}
      onCancel={() => setIsViewAssigningModal(false)}
      onOk={() => {handleSelectDeveloper(selectedRowKeys);setIsViewAssigningModal(false)}}
      width={800}
    >
      <Form component={false}>
        <Table
          bordered
          dataSource={data}
          rowSelection={rowSelection}
          columns={columns}
          pagination={{
          }}
        />
      </Form>
    </Modal>
  )
}

export default AssigningDevelopersModal;