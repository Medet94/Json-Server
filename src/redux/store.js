import { configureStore } from '@reduxjs/toolkit';
import postSlice from './slices/postSlice';
import commentsSlice from './slices/commentsSlice';
import idSlice from './slices/idSlice';

const store = configureStore({
  reducer: {
    posts: postSlice,
    comments: commentsSlice,
    id: idSlice,
  },
});

export default store;
