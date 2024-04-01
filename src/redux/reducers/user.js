import { createSlice } from '@reduxjs/toolkit';
const storedUser = JSON.parse(localStorage.getItem('user'));
const storedToken = localStorage.getItem('token');
const userSlice = createSlice({

  name: 'user',
  initialState: {
    userData: storedUser,
    token: storedToken,
  },
  reducers: {
    setUserData: (state, action) => ({...state, userData: action.payload}),
    setToken: (state, action) => ({...state, token: action.payload}),
  },
});

export const { setUserData, setToken } = userSlice.actions;
export default userSlice.reducer;
