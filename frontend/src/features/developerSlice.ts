import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { DeveloperType, DeveloperResType } from '../global.type';
import { api } from '../api/api';
import { stat } from 'fs';

export interface DeveloperState {
  developers: DeveloperResType[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DeveloperState = {
  developers: [],
  status: 'idle',
  error: null,
};

// Async thunk actions
export const fetchDevelopersAsync = createAsyncThunk<DeveloperResType[]>('developers/fetchDevelopers', async () => {
  const response = await api.get('/developers');
  return response.data;
});


export const createDeveloperAsync = createAsyncThunk<DeveloperResType, DeveloperType>('developers/createDeveloper', async (developer: DeveloperType) => {

  const response = await api.post('/developers', developer)
  return response.data;

});

export const updateDeveloperAsync = createAsyncThunk('developers/updateDeveloper', async ({ developerId, developer }: { developerId: string, developer: DeveloperType }) => {
  const response = await api.patch(`/developers/${developerId}`, developer);
  return response.data;
});

export const deleteDeveloperAsync = createAsyncThunk('developers/deleteDeveloper', async (developerId: string) => {
  await api.delete(`/developers/${developerId}`);
  return developerId;
});

// Slice
const developerSlice = createSlice({
  name: 'developers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDevelopersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDevelopersAsync.fulfilled, (state, action: PayloadAction<DeveloperResType[]>) => {
        state.status = 'succeeded';
        state.developers = action.payload;
      })
      .addCase(fetchDevelopersAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string;
      })
      .addCase(createDeveloperAsync.fulfilled, (state, action: PayloadAction<DeveloperResType>) => {
        state.status = 'succeeded';
        state.developers.push(action.payload);
      })
      .addCase(createDeveloperAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'email already exists'
      })
      .addCase(updateDeveloperAsync.fulfilled, (state, action: PayloadAction<DeveloperResType>) => {
        state.status = 'succeeded';
        const developer = action.payload;
        const existingDeveloperIndex = state.developers.findIndex((d) => d.id === developer.id);
        if (existingDeveloperIndex !== -1) {
          state.developers[existingDeveloperIndex] = developer;
        }
      })
      .addCase(updateDeveloperAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'email already exists'
      })
      .addCase(deleteDeveloperAsync.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'succeeded';
        const developerId = action.payload;
        state.developers = state.developers.filter((developer) => developer.id !== developerId);
      });
  },
});

export default developerSlice.reducer;

export const selectDevelopers = (state: RootState) => state.developers.developers;
export const selectDevelopersStatus = (state: RootState) => state.developers.status;
export const selectDevelopersError = (state: RootState) => state.developers.error;
