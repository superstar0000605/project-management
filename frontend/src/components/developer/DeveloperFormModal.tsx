import React from 'react'
import { Form, Input, Modal } from 'antd';

interface DeveloperFormModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  handleCreateDeveloper: (e: any) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const DeveloperFormModal = ({ isModalOpen, setIsModalOpen, handleCreateDeveloper, handleChange }: DeveloperFormModalProps) => {
  return (
    <Modal
        title="Please create a developer"
        centered
        open={isModalOpen}
        onOk={(e) => { handleCreateDeveloper(e); }}
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
            label="Username"
            name="name"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input name='name' onChange={(e) => { handleChange(e); }} />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }, {pattern:/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,}$/i, message:"Please confirm your email type!"}]}
          >
            <Input name='email' onChange={(e) => { handleChange(e); }} />
            
          </Form.Item>
        </Form>
      </Modal>
  )
}

export default DeveloperFormModal;