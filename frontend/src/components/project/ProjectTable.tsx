import React from 'react'
import { Form, Input, InputNumber, Popconfirm, Table, Typography, Button, FormInstance } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  SettingOutlined
} from '@ant-design/icons';

import { ProjectType, ProjectTableType } from '../../global.type';

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: ProjectTableType;
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

interface ProjectTableProps {
  editingId: string;
  form: FormInstance;
  data: ProjectTableType[];
  handleAssignDevelopers: (id: string) => void;
  handleUpdateProject: ({ projectId, project }: { projectId: string, project: ProjectType }) => void;
  handleDeleteButtonClick: (id: string) => void;
  setEditingId: (id: string) => void;
}

const ProjectTable = ({ form, data, editingId, handleDeleteButtonClick, setEditingId, handleAssignDevelopers, handleUpdateProject }: ProjectTableProps) => {
  const isEditing = (record: ProjectTableType) => record.key === editingId;

  const edit = (record: Partial<ProjectTableType> & { key: React.Key }) => {
    form.setFieldsValue({ title: '', description: '', ...record });
    setEditingId(record.key);
  };

  const cancel = () => {
    setEditingId('');
  };

  const save = async (key: any) => {
    try {
      const row = (await form.validateFields()) as ProjectTableType;
      const content: ProjectType = {
        title: row.title,
        description: row.description,
      }
      handleUpdateProject({ projectId: key, project: content })
    } catch (errInfo) {
    }
  };
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      width: '25%',
      editable: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: '15%',
      editable: true,
    },
    {
      title: 'Developers',
      dataIndex: 'developers',
      width: '40%',
      editable: false,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_: any, record: ProjectTableType) => {
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
              <Button icon={<EditOutlined />} />
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={() => handleDeleteButtonClick(record.key)}>
              <Button icon={<DeleteOutlined />} />
            </Popconfirm>
            <Typography.Link style={{ marginLeft: 8 }} disabled={editingId !== ''} onClick={() => handleAssignDevelopers(record.key)}>
              <Button icon={<SettingOutlined />} />
            </Typography.Link>
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
      onCell: (record: ProjectTableType) => ({
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

export default ProjectTable;