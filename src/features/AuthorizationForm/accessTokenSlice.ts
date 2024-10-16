import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';

const initialState = {
  value: "",
};

export const accessTokenSlice = createSlice({
  name: 'accessToken',
  initialState,
  reducers: {
    accessToken: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
  },
})

export const { accessToken } = accessTokenSlice.actions;

export const selectCount = (state: RootState) => state.accessToken.value;


export default accessTokenSlice.reducer;