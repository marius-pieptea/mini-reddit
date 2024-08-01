import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import SearchBar from "../components/SearchBar";

const mockStore = configureStore([]);

test("renders SearchBar component and performs search", () => {
  const store = mockStore({});
  store.dispatch = jest.fn();

  render(
    <Provider store={store}>
      <SearchBar />
    </Provider>
  );

  const input = screen.getByPlaceholderText(/Search posts.../i);
  fireEvent.change(input, { target: { value: "test" } });
  expect(input.value).toBe("test");

  const button = screen.getByText(/Search/i);
  fireEvent.click(button);

  expect(store.dispatch).toHaveBeenCalled();
});
