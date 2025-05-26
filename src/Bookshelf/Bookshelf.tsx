import { useState } from "react";

type Book = {
  title: string;
  author: string;
};

const Bookshelf = () => {
  const [books, setBooks] = useState<Book[]>([
    { title: "Fourth Wing", author: "Rebecca Yarros" },
    { title: "The Lion, the Witch and the Wardrobe", author: "C.S. Lewis" },
  ]);
  const [newBook, setNewBook] = useState<Book>({ title: "", author: "" });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewBook({ ...newBook, [name]: value });

    // triggered each time user types in an input field
    // event accesses name of input field and value the user has typed
    // newBook created to update field
    // setNewBooks(newBook);
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    // execute when form is submitted
    event.preventDefault();
    setBooks([...books, newBook]);
    setNewBook({ title: "", author: "" });
    // SetBooks --> update new list to include newly added books
    // reset newBook to initial empty values to clear form fields
  };

  const bookCard = books.map((book) => {
    return (
      <>
        <div className="bookCard">
          <h3>{book.title}</h3>
          <p>by {book.author}</p>
        </div>
      </>
    );
  });

  return (
    <>
      <div className="bookshelfDiv">
        <div className="formDiv">
          <h3>Add a Book</h3>
          <form onSubmit={handleSubmit}>
            <label>
              Title: <br />
              <input name="title" type="text" onChange={handleInputChange} />
            </label>
            <br />
            <label>
              Author: <br />
              <input name="author" type="text" onChange={handleInputChange} />
            </label>
            <br />
            <button>Add Book</button>
          </form>
        </div>
        <div className="bookCardsDiv">
          {bookCard}
          {/* Book cards will display here */}
        </div>
      </div>
    </>
  );
};

export default Bookshelf;
