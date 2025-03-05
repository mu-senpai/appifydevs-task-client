import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
    loading: false, 
  },
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
      state.loading = false; 
    },
    clearUser: (state) => {
      state.userInfo = null;
      state.loading = false;
    },
    setLoading: (state) => {
      state.loading = true; 
    },
  },
});

export const { setUser, clearUser, setLoading } = userSlice.actions;

export default userSlice.reducer;
