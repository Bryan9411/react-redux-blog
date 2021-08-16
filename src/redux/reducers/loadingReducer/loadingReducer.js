import { createSlice } from '@reduxjs/toolkit';

export const loadingReducer = createSlice({
  name: 'loading',
  initialState: {
    isLoading: true,
  },
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setIsLoading } = loadingReducer.actions;

export default loadingReducer.reducer;
