import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getAllPosts,
  createNewPost,
  deletePostById,
  updatePostById,
} from '../../url';
import axios from 'axios';

// API
export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async function getResponse() {
    let result = await fetch(getAllPosts).then((response) => response.json());
    return result;
  }
);

export const createANewPost = createAsyncThunk(
  'posts/createNewPost',
  async (title) => {
    if (title.length > 0) {
      try {
        const response = await axios.post(createNewPost, {
          label: title,
        });

        return response.data;
      } catch (err) {
        console.error('Ошибка при отправке комментария:', err);
      }
    }
  }
);

export const updatePost = createAsyncThunk(
  'posts/updatePostById',
  async (postId) => {
    const text = prompt('enter new title');
    if (text.length > 0) {
      try {
        const response = await axios.patch(`${updatePostById}${postId}`, {
          title: text,
        });

        return response.data;
      } catch (error) {
        console.error('Ошибка при обновлении поста:', error);
      }
    }
  }
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',

  async (id, { rejectWithValue, dispatch }) => {
    if (window.confirm('Do you wanna delete the post?')) {
      try {
        const response = await axios.delete(`${deletePostById}${id}`);

        if (!response.ok) {
          throw new Error('Cant delete post. Error');
        }
        dispatch(deletePost(id));
      } catch (error) {
        console.error('Ошибка при удалении комментария:', error);
      }
    }
  }
);

// Slice
const postSlice = createSlice({
  name: 'post',
  initialState: { posts: [], isLoading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    });
    // builder.addCase(updatePost.pending, (state) => {
    //   state.isLoading = true;
    // });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.isLoading = false;
      const index = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    });
    builder.addCase(createANewPost.fulfilled, (state, action) => {
      state.posts.push(action.payload);
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.posts = state.posts.filter((id) => id !== action.payload);
      //return [...state.posts, action.payload];
      //state.posts = action.payload;
    });
  },
});

export default postSlice.reducer;
