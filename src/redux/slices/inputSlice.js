import { createSlice } from '@reduxjs/toolkit';

const inputSlice = createSlice({
  name: 'inputText',
  initialState: { text: '' },
  reducers: {
    settext: (state, action) => {
      state.text = action.payload;
    },
  },
});

export const { settext } = inputSlice.actions;
export default inputSlice.reducer;
