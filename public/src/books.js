function findAuthorById(authors, id) {
  let result = authors.find((authorsObj) => {
    //find will get the first author.id (and should be only) that matches are function inputed ID and return that to result
    return authorsObj.id === id;
  });
  return result;
}

function findBookById(books, id) {
  let result = books.find((booksObj) => {
    //find will get the first books.id (and should be only) that matches are function inputed ID and return that to result
    return booksObj.id === id;
  });
  return result;
}

function partitionBooksByBorrowedStatus(books) {
  //this function will return ONE ARRAY with two sepeate arrays in it.
  //First array index (being an array) with only books that are checked out completly (as in EVERY book in its is returned = false)
  //seoncd array index (still an array) with only books that have been returned (as in SOME books are returned = true)

  //so books.filter will loop through the books array. BUT i need to loop through the BORROWS array in the currentBookObj
  let booksReturned = books.filter((currentBookObj) => {
    let currentBookArray = currentBookObj.borrows;
    let bookReturned = currentBookArray.every((currentBook) => {
      return currentBook.returned === true;
    });
    return bookReturned;
  });

  let booksBorrowed = books.filter((currentBookObj) => {
    let currentBookArray = currentBookObj.borrows;
    let bookBorrowed = currentBookArray.some((currentBook) => {
      return currentBook.returned === false;
    });
    return bookBorrowed;
  });

  return [booksBorrowed, booksReturned];
}

//input book is an object of one single book in the books file. And accounts is the whole array
function getBorrowersForBook(book, accounts) {
  let { borrows } = book;
  //destructed borrows array from the book object each index looks like
  //{ id: '5f446f2e2cfa3e1d234679b9', returned: false },
  //result will be an array of the accounts that have a borrowed book
  return borrows
    .map((borrowsObj) => {
      let test = accounts.find((accountsObj) => {
        return accountsObj.id === borrowsObj.id;
      });
      return { ...test, returned: borrowsObj.returned };
    })
    .slice(0, 10);
  //okay result just needs TWO more things
  //FIRST needs to have returned status added to it
  //SECOND be limited to 10 indexes

  // return result.slice(0, 10);
}
//should return an array filled with objects that is the users who have borrowed a stated book

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
