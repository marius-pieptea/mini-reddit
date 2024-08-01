import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import PostDetails from "../components/PostDetails";
import "@testing-library/jest-dom";

const mockStore = configureStore([]);

jest.mock("../store/postsSlice", () => ({
  ...jest.requireActual("../store/postsSlice"),
  fetchPostDetails: jest.fn(() => ({ type: "posts/fetchPostDetails" })),
}));

test("renders PostDetails component with loading state", () => {
  const store = mockStore({
    posts: { currentPost: null, comments: [], loading: true, error: null },
  });

  render(
    <Provider store={store}>
      <PostDetails postId="1" onClose={() => {}} />
    </Provider>
  );

  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
});

test("renders PostDetails component with error state", () => {
  const store = mockStore({
    posts: {
      currentPost: null,
      comments: [],
      loading: false,
      error: "Error fetching post details",
    },
  });

  render(
    <Provider store={store}>
      <PostDetails postId="1" onClose={() => {}} />
    </Provider>
  );

  expect(screen.getByText(/Error fetching post details/i)).toBeInTheDocument();
});

test("renders PostDetails component with post and comments", () => {
  const store = mockStore({
    posts: {
      currentPost: { id: "1", title: "Post 1", selftext: "Content 1" },
      comments: [{ id: "1", body: "Comment 1", author: "Author 1" }],
      loading: false,
      error: null,
    },
  });

  render(
    <Provider store={store}>
      <PostDetails postId="1" onClose={() => {}} />
    </Provider>
  );

  expect(screen.getByText(/Post 1/i)).toBeInTheDocument();
  expect(screen.getByText(/Content 1/i)).toBeInTheDocument();
  expect(screen.getByText(/Comment 1/i)).toBeInTheDocument();
  expect(screen.getByText(/by Author 1/i)).toBeInTheDocument();
});
