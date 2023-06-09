import { configureStore } from '@reduxjs/toolkit';
import projectReducer from './features/projectSlice';
import developerReducer from './features/developerSlice';
import { useDispatch } from "react-redux";
export const store = configureStore({
  reducer: {
    projects: projectReducer,
    developers: developerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;