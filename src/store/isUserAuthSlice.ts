import { createSlice } from "@reduxjs/toolkit";



const isUserAuthSlice = createSlice({
  name: "isUserAuth",
  initialState: { isUserAuth: false },
  reducers: {
    logIn(state) {
      state.isUserAuth = true
    },
    logOut(state) {
      state.isUserAuth = false
    }
  }
})

export default isUserAuthSlice.reducer
export const { logIn, logOut } = isUserAuthSlice.actions