import React from 'react'
import { Form, Input, InputNumber, Popconfirm, Table, Typography, Button, FormInstance } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';

import { DeveloperTableType, DeveloperType } from '../../global.type';

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: DeveloperTableType;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

interface DeveloperTableProps {
  editingId: string;
  form: FormInstance;
  data: DeveloperTableType[];
  handleDeleteButtonClick: (id: string) => void;
  handleUpdateDeveloper: ({ developerId, developer }: { developerId: string, developer: DeveloperType}) => void
  setEditingId: (id: string) => void;
}

const DeveloperTable = ({ form, data, editingId, handleDeleteButtonClick, setEditingId, handleUpdateDeveloper }: DeveloperTableProps) => {
  const isEditing = (record: DeveloperTableType) => record.key === editingId;

  const edit = (record: Partial<DeveloperTableType> & { key: React.Key }) => {
    form.setFieldsValue({ name: '', email: '', projects: '', ...record });
    setEditingId(record.key);
  };

  const cancel = () => {
    setEditingId('');
  };

  const save = async (key: any) => {
    try {
      const row = (await form.validateFields()) as DeveloperTableType;
      const content: DeveloperType = {
        name: row.name,
        email: row.email,
      }
      handleUpdateDeveloper({ developerId: key, developer: content})
    } catch (errInfo) {
    }
  };
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '25%',
      editable: true,
      // sorter: (a: any, b: any) => a.name.length - b.name.length,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '15%',
      editable: true,
    },
    {
      title: 'Projects',
      dataIndex: 'projects',
      width: '40%',
      editable: false,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_: any, record: DeveloperTableType) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <>
            <Typography.Link style={{ marginRight: 8 }} disabled={editingId !== ''} onClick={() => edit(record)}>
              <Button icon={<EditOutlined />}></Button>
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={() => handleDeleteButtonClick(record.key)}>
              <Button icon={<DeleteOutlined />}></Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DeveloperTableType) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });  
  return (
    <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
  )
}

export default DeveloperTable;