import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  value: "",
};

export const requestBodySlice = createSlice({
  name: 'requestBody',
  initialState,
  reducers: {
    setRequestBody: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
  },
})

export const { setRequestBody } = requestBodySlice.actions;

export default requestBodySlice.reducer;