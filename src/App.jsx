import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import Header from "./components/Header";
import PostList from "./components/PostList";

const App = () => {
  return (
    <Provider store={store}>
      <div className="bg-gray-100 min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <PostList />
        </main>
      </div>
    </Provider>
  );
};

export default App;
