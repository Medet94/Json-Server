import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getCommentsByPostId,
  createNewCommentByPostId,
  deleteMessageById,
} from '../../url';
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
  async ({ text, postId }) => {
    try {
      const response = await axios.post(createNewCommentByPostId, {
        text,
        postId,
      });
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.error('Ошибка при отправке комментария:', err);
    }
  }
);

export const deleteComment = createAsyncThunk(
  'comment/deleteComment',
  async (commentId) => {
    if (window.confirm('Do you wanna delete this comment?')) {
      try {
        const comments = await axios.delete(`${deleteMessageById}${commentId}`);

        console.log(comments);
        return comments;
      } catch (error) {
        console.error('Ошибка при удалении комментария:', error);
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
    builder.addCase(sendMessage.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.comments.push(action.payload);
    });
    builder.addCase(deleteComment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.comments = action.payload;
    });
  },
});

export default commentSlice.reducer;
