import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Form, Button, Alert, Space, message } from 'antd';
import {
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { fetchDevelopersAsync, createDeveloperAsync, updateDeveloperAsync, deleteDeveloperAsync, selectDevelopers, selectDevelopersStatus, selectDevelopersError } from '../../features/developerSlice';
import { DeveloperType, DeveloperTableType } from '../../global.type';
import { useAppDispatch } from '../../store';
import DeveloperFormModal from './DeveloperFormModal';
import DeveloperTable from './DeveloperTable';

const DeveloperList: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingId, setEditingId] = useState('');
  const [developer, setDeveloper] = useState<DeveloperType>({
    name: '',
    email: ''
  })
  const dispatch = useAppDispatch();
  const developers = useSelector(selectDevelopers);
  const developersStatus = useSelector(selectDevelopersStatus);
  const developersError = useSelector(selectDevelopersError);
  const [data, setData] = useState<DeveloperTableType[]>([]);

  useEffect(() => {
    dispatch(fetchDevelopersAsync());
  }, [])

  useEffect(() => {
    let originData: DeveloperTableType[] = []
    developers.map((developer) => {
      originData.push({
        key: developer.id,
        name: developer.name,
        email: developer.email,
        projects: developer.projects?.reduce((result, project) => result += `${project.title}, `, '').slice(0, -2),
      });
      return 0;
    });
    setData(originData);
  }, [developers]);

  const opnCreateDeveloperModal = () => {
    setIsModalOpen(true);
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setDeveloper({
      ...developer,
      [e.target.name]: e.target.value
    })
  }
  const handleCreateDeveloper = async (e: any) => {
    const response = await dispatch(createDeveloperAsync(developer));
    if (response.payload) setIsModalOpen(false);
    else alert("Email already exists");
  }
  const handleDeleteButtonClick = (id: string) => {
    dispatch(deleteDeveloperAsync(id))
  }
  const handleUpdateDeveloper = async (newDeveloper: { developerId: string, developer: DeveloperType }) => {
    const response = await dispatch(updateDeveloperAsync(newDeveloper))
    if (response.payload) setEditingId('');
    else alert("Email already exists");
  }
  return (
    <>
      <Button style={{ marginBottom: "20px" }} icon={<UsergroupAddOutlined />} onClick={() => { opnCreateDeveloperModal(); }}>Create New developer</Button>
      <DeveloperFormModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleChange={handleChange}
        handleCreateDeveloper={handleCreateDeveloper}
      />
      <DeveloperTable
        form={form}
        data={data}
        editingId={editingId}
        handleDeleteButtonClick={handleDeleteButtonClick}
        handleUpdateDeveloper={handleUpdateDeveloper}
        setEditingId={setEditingId}
      />
    </>
  );
};

export default DeveloperList;