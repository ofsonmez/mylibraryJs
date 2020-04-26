import React from "react";
import bookAuthors from "./authors";

const Results = ({ book }) => {
  return (
    <div className="search">
      <div className="image-container">
        <img
          src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
          alt={`${book.volumeInfo.title} book`}
        />
      </div>
      <div className="info">
        <a href={`details/${book.id}`}>
          <h2>{book.volumeInfo.title}</h2>
        </a>
        <h2> </h2>
        <h3>{`${bookAuthors(book.volumeInfo.authors)} -
                 ${book.volumeInfo.publisher}`}</h3>
      </div>
    </div>
  );
};

export default Results;
