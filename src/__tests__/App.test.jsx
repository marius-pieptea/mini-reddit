import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import App from "../App";
import "@testing-library/jest-dom";


const mockStore = configureStore([]);

test("renders App component with Header and PostList", () => {
  const store = mockStore({
    posts: { posts: [], loading: false, error: null },
  });

  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/Mini-Reddit/i)).toBeInTheDocument();
  expect(getByText(/Loading.../i)).toBeInTheDocument();
});
