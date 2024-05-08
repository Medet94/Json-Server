import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCommentsByPostId, createNewCommentByPostId } from '../../url';
import axios from 'axios';

// API
export const getAllComments = createAsyncThunk(
  'comments/getComments',
  async (postId) => {
    const response = await fetch(`${getCommentsByPostId}${postId}`).then(
      (response) => response.json()
    );

    return response;
  }
);

export const sendMessage = createAsyncThunk(
  'comments/createComments',
  async (text, postId) => {
    if (text.length > 0) {
      try {
        const response = await axios.post(createNewCommentByPostId, {
          text: text,
          postId: postId,
        });

        return response.data;
      } catch (err) {
        console.error('Ошибка при отправке комментария:', err);
      }
    }
  }
);

// Slice
const commentSlice = createSlice({
  name: 'comments',
  initialState: { comments: [], isLoading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllComments.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllComments.fulfilled, (state, action) => {
      state.isLoading = false;
      state.comments = action.payload;
    });
  },
});

export default commentSlice.reducer;
