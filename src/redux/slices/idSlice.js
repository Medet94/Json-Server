import { createSlice } from '@reduxjs/toolkit';

const idSlice = createSlice({
  name: 'id',
  initialState: { postId: '', commentId: '' },
  reducers: {
    select(state, action) {
      state.postId = action.payload;
    },
    commentSelect(state, action) {
      state.commentId = action.payload;
    },
  },
});

export const { select, commentSelect } = idSlice.actions;

export default idSlice.reducer;
