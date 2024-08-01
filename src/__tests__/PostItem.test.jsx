import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PostItem from "../components/PostItem";
import "@testing-library/jest-dom";


test("renders PostItem component", () => {
  const post = {
    id: "1",
    title: "Post 1",
    selftext: "Content 1",
    author: "Author 1",
    num_comments: 10,
    score: 100,
  };

  const onPostSelect = jest.fn();

  render(<PostItem post={post} onPostSelect={onPostSelect} />);

  expect(screen.getByText(/Post 1/i)).toBeInTheDocument();
  expect(screen.getByText(/Content 1/i)).toBeInTheDocument();
  expect(screen.getByText(/Author 1/i)).toBeInTheDocument();
  expect(screen.getByText(/10 comments/i)).toBeInTheDocument();
  expect(screen.getByText(/100 points/i)).toBeInTheDocument();

  fireEvent.click(screen.getByText(/Post 1/i));
  expect(onPostSelect).toHaveBeenCalledWith("1");
});
