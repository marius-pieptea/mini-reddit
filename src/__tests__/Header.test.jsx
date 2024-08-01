import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Header from "../components/Header";
import "@testing-library/jest-dom";

const mockStore = configureStore([]);
const store = mockStore({});

test("renders Header component", () => {
  render(
    <Provider store={store}>
      <Header />
    </Provider>
  );
  expect(screen.getByText(/Mini-Reddit/i)).toBeInTheDocument();
});
