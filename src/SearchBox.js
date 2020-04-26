import React, { useState, useContext } from "react";
import axios from "axios";
import Results from "./Result";
import ThemeContext from "./ThemeContext";

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState({ items: [] });
  const [theme, setTheme] = useContext(ThemeContext);

  const onInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  let API_URL = `https://www.googleapis.com/books/v1/volumes`;

  const fetchBooks = async () => {
    const result = await axios.get(`${API_URL}?q=${searchTerm}`);
    setBooks(result.data);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    fetchBooks();
  };

  return (
    <div className="search-params">
      <form onSubmit={onSubmitHandler}>
        <label>
          <span>Search</span>
          <input
            type="search"
            placeholder="sherlock, guilt, etc.,"
            value={searchTerm}
            onChange={onInputChange}
          />
        </label>
        <label htmlFor="theme">
          Theme
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}
          >
            <option value="peru">Peru</option>
            <option value="darkblue">Dark Blue</option>
            <option value="mediumorchid">Medium Orchid</option>
            <option value="chartreuse">Chartreuse</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }} type="submit">
          Ara
        </button>
      </form>
      {books.items.map((book, index) => {
        return <Results key={index} book={book} />;
      })}
    </div>
  );
};

export default SearchBox;
