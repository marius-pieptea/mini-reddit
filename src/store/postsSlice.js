import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get("https://www.reddit.com/r/popular.json");
  return response.data.data.children.map((child) => child.data);
});

export const searchPosts = createAsyncThunk(
  "posts/searchPosts",
  async (searchTerm) => {
    const response = await axios.get(
      `https://www.reddit.com/search.json?q=${searchTerm}`
    );
    return response.data.data.children.map((child) => child.data);
  }
);

export const fetchPostDetails = createAsyncThunk(
  "posts/fetchPostDetails",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://www.reddit.com/comments/${postId}.json`
      );
      if (!response.data || response.data.length < 2) {
        throw new Error("Post not found");
      }

      const postData = response.data[0].data.children[0].data;
      const comments = response.data[1].data.children
        .filter((child) => child.kind === "t1")
        .map((child) => child.data);

      return { post: postData, comments };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    loading: false,
    error: null,
    currentPost: null,
    comments: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchPostDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostDetails.fulfilled, (state, action) => {
        state.loading = false;
        if (
          !state.currentPost ||
          state.currentPost.id !== action.payload.post.id
        ) {
          state.currentPost = action.payload.post;
          state.comments = action.payload.comments;
        }
      })
      .addCase(fetchPostDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(searchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(searchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default postsSlice.reducer;
