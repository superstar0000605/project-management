import React from 'react'
import { Form, Input, Modal } from 'antd';

interface ProjectFormModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  handleCreateProject: (e: any) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const ProjectFormModal = ({ isModalOpen, setIsModalOpen, handleCreateProject, handleChange }: ProjectFormModalProps) => {
  return (
    <Modal
        title="Please create a project"
        centered
        open={isModalOpen}
        onOk={(e) => { handleCreateProject(e); }}
        onCancel={() => setIsModalOpen(false)}
        width={800}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please input the title!' }]}
          >
            <Input name='title' onChange={(e) => { handleChange(e); }} />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input your description!' }]}
          >
            <Input name='description' onChange={(e) => { handleChange(e); }} />
          </Form.Item>
        </Form>
      </Modal>
  )
}

export default ProjectFormModal;