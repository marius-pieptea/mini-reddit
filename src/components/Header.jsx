import React from "react";
import SearchBar from "./SearchBar";

const Header = () => (
  <header className="bg-white shadow-md">
    <div className="container mx-auto px-4 py-3 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-orange-500">Mini-Reddit</h1>
      <SearchBar />
    </div>
  </header>
);

export default Header;
