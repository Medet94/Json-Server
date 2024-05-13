import { configureStore } from '@reduxjs/toolkit';
import postSlice from './slices/postSlice';
import commentsSlice from './slices/commentsSlice';
import idSlice from './slices/idSlice';
import inputSlice from './slices/inputSlice';

const store = configureStore({
  reducer: {
    posts: postSlice,
    comments: commentsSlice,
    id: idSlice,
    text: inputSlice,
  },
});

export default store;
