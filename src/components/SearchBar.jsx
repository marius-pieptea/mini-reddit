import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchPosts } from "../store/postsSlice";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchPosts(searchTerm));
  };

  return (
    <form onSubmit={handleSearch} className="flex">
      <input
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
      <button
        type="submit"
        className="bg-orange-500 text-white px-4 py-2 rounded-r-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
