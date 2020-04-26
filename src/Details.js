import React from "react";
import ErrorBoundary from "./ErrorBoundary";
import axios from "axios";
import bookAuthors from "./authors";
//import ThemeContext from "./ThemeContext";

let API_URL = `https://www.googleapis.com/books/v1/volumes`;

class Details extends React.Component {
  state = { loading: true };

  async componentDidMount() {
    // throw new error("lol");
    const result = await axios.get(`${API_URL}?q=${this.props.id}`);
    const books = result.data;

    books.items.map((book) => {
      this.setState({
        id: book.id,
        name: book.volumeInfo.title,
        authors: book.volumeInfo.authors,
        description: book.volumeInfo.description,
        publishedTime: book.volumeInfo.publishedDate,
        subtitle: book.volumeInfo.subtitle,
        country: book.accessInfo.country,
        publisher: book.volumeInfo.publisher,
        loading: false,
      });
    }, console.error);
  }

  render() {
    if (this.state.loading) {
      return <h1>loading ...</h1>;
    }

    const {
      id,
      name,
      authors,
      description,
      subtitle,
      publishedTime,
      publisher,
    } = this.state;

    return (
      <div className="details">
        <div className="carousel">
          <img
            src={`http://books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
            alt={`${name} book`}
            width="200"
            height="auto"
          />
        </div>
        <div>
          <h1>{name}</h1>
          <h2>{subtitle}</h2>
          <h2>{`${bookAuthors(authors)}`}</h2>
          <h2>{`${publisher} - ${publishedTime}`}</h2>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

export default function DetailsWthErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
