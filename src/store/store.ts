import { configureStore } from '@reduxjs/toolkit';
import isUserAuthSlice from './isUserAuthSlice';
import accessToken  from '../features/AuthorizationForm/accessTokenSlice';
import accessTokenExpire from '../features/AuthorizationForm/accessTokenExpireSlice';
import requestBodySlice from '../features/SearchForm/requestBodySlice'

export const store = configureStore({
  reducer: {
    isUserAuthSlice, accessToken, accessTokenExpire, requestBodySlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;