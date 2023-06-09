import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Form, Button } from 'antd';
import {
  FileAddOutlined,
} from '@ant-design/icons';
import { fetchProjectsAsync, createProjectAsync, updateProjectAsync, deleteProjectAsync, assignDevelopersAsync, selectProjects, selectProjectsStatus, selectProjectsError } from '../../features/projectSlice';
import { fetchDevelopersAsync, selectDevelopers } from '../../features/developerSlice';
import { ProjectTableType, ProjectType, DeveloperTableType } from '../../global.type';
import { useAppDispatch } from '../../store';
import ProjectFormModal from './ProjectFormModal';
import ProjectTable from './ProjectTable';
import AssigningDevelopersModal from './AssigningDevelopersModal';

const ProjectList: React.FC = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState('');
  const [project, setProject] = useState<ProjectType>({
    title: '',
    description: ''
  });
  const [isViewAssigningModal, setIsViewAssigningModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const projects = useSelector(selectProjects);
  const developers = useSelector(selectDevelopers);
  const projectsStatus = useSelector(selectProjectsStatus);
  const projectsError = useSelector(selectProjectsError);
  const [data, setData] = useState<ProjectTableType[]>([]);
  const [developersData, setDevelopersData] = useState<DeveloperTableType[]>([]);
  const [projectId, setProjectId] = useState<string>('');

  useEffect(() => {
    dispatch(fetchProjectsAsync());
  }, [])

  useEffect(() => {
    let originData: ProjectTableType[] = [];

    projects.map((project) => {
      originData.push({
        key: project.id,
        title: project.title,
        description: project.description,
        developers: project.developers?.reduce((result, developer) => result += `${developer.name} (${developer.email}), `, '').slice(0, -2),
      });
      return 0;
    });

    setData(originData);
    let originDeveloperData: DeveloperTableType[] = [];

    developers.map((developer) => {
      originDeveloperData.push({
        key: developer.id,
        name: developer.name,
        email: developer.email,
        projects: '',
      });
      return 0;
    });
    setDevelopersData(originDeveloperData);
  }, [projects, developers]);


  const opnCreateProjectModal = () => {
    setIsModalOpen(true);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setProject({
      ...project,
      [e.target.name]: e.target.value
    });
  }
  const handleCreateProject = async (e: any) => {
    e.preventDefault();
    const response = await dispatch(createProjectAsync(project));
    if (response.payload) setIsModalOpen(false);
    else alert("Title already exists");
  }
  const handleDeleteButtonClick = (id: string) => {
    dispatch(deleteProjectAsync(id))
  }
  const handleUpdateProject = async ({ projectId, project }: { projectId: string, project: ProjectType }) => {
    const response = await dispatch(updateProjectAsync({ projectId, project }))
    console.log(response)
    if (response.payload) setEditingId('');
    else alert("Title already exists");
  }
  const handleSelectDeveloper = (ids: string[]) => {
    dispatch(assignDevelopersAsync({ projectId: projectId, developerIds: ids }));
  }
  const handleAssignDevelopers = (id: string) => {
    setProjectId(id);
    dispatch(fetchDevelopersAsync())
    setIsViewAssigningModal(true);
  }
  return (
    <>
      <Button style={{ marginBottom: "20px" }} icon={<FileAddOutlined />} onClick={() => { opnCreateProjectModal(); }}>Create New project</Button>
      <ProjectFormModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleChange={handleChange}
        handleCreateProject={handleCreateProject}
      />
      <AssigningDevelopersModal
        data={developersData}
        isViewAssigningModal={isViewAssigningModal}
        setIsViewAssigningModal={setIsViewAssigningModal}
        handleSelectDeveloper={handleSelectDeveloper}
      />
      <ProjectTable
        form={form}
        data={data}
        editingId={editingId}
        handleDeleteButtonClick={handleDeleteButtonClick}
        setEditingId={setEditingId}
        handleAssignDevelopers={handleAssignDevelopers}
        handleUpdateProject={handleUpdateProject}
      />
    </>
  );
};

export default ProjectList;