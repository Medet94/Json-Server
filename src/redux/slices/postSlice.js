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
          title: title,
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
  async (title, id) => {
    if (title.length > 0) {
      try {
        const response = await axios.patch(`${updatePostById}${id}`, {
          title: title,
        });
        console.log(response.data);
        return response.data;
        // const updatedPosts = allChats.map((post) =>
        //   post.id === postId ? { ...post, title: response.data.title } : post
        // );
      } catch (error) {
        console.error('Ошибка при обновлении поста:', error);
      }
    }
  }
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',

  async (id) => {
    if (window.confirm('Do you wanna delete the post?')) {
      console.log('Post deleted with createAsyncThunk');

      try {
        await axios
          .delete(`${deletePostById}${id}`)
          .then((response) => response.data);
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
    builder.addCase(createANewPost.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.posts = action.payload;
      // return {...state.posts, action.payload}
    });
  },
});

export default postSlice.reducer;
