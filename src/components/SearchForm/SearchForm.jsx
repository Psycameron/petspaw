"use client";

import SearchIcon from "public/images/svg/search.svg";

export default function SearchForm() {
  return (
    <div>
      <input type="text" placeholder="Search for breeds by name" />
      <button type="submit">
        <SearchIcon />
      </button>
    </div>
  );
}