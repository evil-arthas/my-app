import { configureStore } from '@reduxjs/toolkit';
import isUserAuthSlice from './isUserAuthSlice';
import accessToken  from '../features/AuthorizationForm/accessTokenSlice';
import accessTokenExpire from '../features/AuthorizationForm/accessTokenExpireSlice';

export const store = configureStore({
  reducer: {
    isUserAuthSlice, accessToken, accessTokenExpire,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;