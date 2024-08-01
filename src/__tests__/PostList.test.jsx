import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import PostList from "../components/PostList";
import { fetchPosts } from "../store/postsSlice"; 
import "@testing-library/jest-dom";

const mockStore = configureStore([]);

jest.mock("../store/postsSlice", () => ({
  ...jest.requireActual("../store/postsSlice"),
  fetchPosts: jest.fn(() => ({ type: "posts/fetchPosts" })),
}));

test("renders PostList component with loading state", () => {
  const store = mockStore({
    posts: { posts: [], loading: true, error: null },
  });

  render(
    <Provider store={store}>
      <PostList />
    </Provider>
  );

  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
});

test("renders PostList component with error state", () => {
  const store = mockStore({
    posts: { posts: [], loading: false, error: "Error fetching posts" },
  });

  render(
    <Provider store={store}>
      <PostList />
    </Provider>
  );

  expect(screen.getByText(/Error fetching posts/i)).toBeInTheDocument();
});

test("renders PostList component with posts", () => {
  const store = mockStore({
    posts: {
      posts: [
        {
          id: "1",
          title: "Post 1",
          selftext: "Content 1",
          author: "Author 1",
          num_comments: 10,
          score: 100,
        },
        {
          id: "2",
          title: "Post 2",
          selftext: "Content 2",
          author: "Author 2",
          num_comments: 20,
          score: 200,
        },
      ],
      loading: false,
      error: null,
    },
  });

  render(
    <Provider store={store}>
      <PostList />
    </Provider>
  );

  expect(screen.getByText(/Post 1/i)).toBeInTheDocument();
  expect(screen.getByText(/Post 2/i)).toBeInTheDocument();
});
