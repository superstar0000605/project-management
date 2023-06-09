import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ProjectType, ProjectResType } from '../global.type';
import { api } from '../api/api';
import { stat } from 'fs';

export interface ProjectState {
  projects: ProjectResType[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProjectState = {
  projects: [],
  status: 'idle',
  error: null,
};

// Async thunk actions
export const fetchProjectsAsync = createAsyncThunk<ProjectResType[]>('projects/fetchProjects', async () => {
  const response = await api.get('/projects');
  return response.data;
});

export const createProjectAsync = createAsyncThunk<ProjectResType, ProjectType>('projects/createProject', async (project: ProjectType) => {
  const response = await api.post('/projects', project);
  return response.data;
});

export const updateProjectAsync = createAsyncThunk('projects/updateProject', async ({ projectId, project }: { projectId: string, project: ProjectType}) => {
  const response = await api.patch(`/projects/${projectId}`, project);
  return response.data;
});

export const deleteProjectAsync = createAsyncThunk('projects/deleteProject', async (projectId:string) => {
  await api.delete(`/projects/${projectId}`);
  return projectId;
});

export const assignDevelopersAsync = createAsyncThunk<ProjectResType, {projectId: string, developerIds: string[]}>('projects/assignProject', async ({ projectId, developerIds }) => {
  const response = await api.post(`/projects/assign/${projectId}`, developerIds);
  return response.data;
});

// Slice
const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProjectsAsync.fulfilled, (state, action: PayloadAction<ProjectResType[]>) => {
        state.status = 'succeeded';
        state.projects = action.payload;
      })
      .addCase(fetchProjectsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string;
      })
      .addCase(createProjectAsync.fulfilled, (state, action: PayloadAction<ProjectResType>) => {
        state.status = 'succeeded';
        state.projects.push(action.payload);
      })
      .addCase(createProjectAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'title already exists'
      })
      .addCase(updateProjectAsync.fulfilled, (state, action: PayloadAction< ProjectResType >) => {
        state.status = 'succeeded';
        const project = action.payload;
        const existingProjectIndex = state.projects.findIndex((p) => p.id === project.id);
        if (existingProjectIndex !== -1) {
          state.projects[existingProjectIndex] = project;
        }
      })
      .addCase(updateProjectAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'title already exists'
      })
      .addCase(deleteProjectAsync.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'succeeded';
        const projectId = action.payload;
        state.projects = state.projects.filter((project) => project.id !== projectId);
      })
      .addCase(assignDevelopersAsync.fulfilled, (state, action: PayloadAction<ProjectResType>) => {
        state.status = 'succeeded';
        const project = action.payload;
        const existingProjectIndex = state.projects.findIndex((p) => p.id === project.id);
        if (existingProjectIndex !== -1) {
          state.projects[existingProjectIndex] = project;
        }
      });
  },
});

export default projectSlice.reducer;

export const selectProjects = (state: RootState) => state.projects.projects;
export const selectProjectsStatus = (state: RootState) => state.projects.status;
export const selectProjectsError = (state: RootState) => state.projects.error;
