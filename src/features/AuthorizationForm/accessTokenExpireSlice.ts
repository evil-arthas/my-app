import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  value: "",
};

export const accessTokenExpireSlice = createSlice({
  name: 'accessTokenExpire',
  initialState,
  reducers: {
    accessTokenExpire: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
  },
})

export const { accessTokenExpire } = accessTokenExpireSlice.actions;

export default accessTokenExpireSlice.reducer;