function findAccountById(accounts, id) {
  let result = accounts.find((accountsObj) => {
    //find will get the first acount.id (and should be only) that matches are function inputed ID and return that to result
    return accountsObj.id === id;
  });
  return result;
}

function sortAccountsByLastName(accounts) {
  let result = accounts.sort((accountsObjOne, accountsObjTwo) => {
    let accountOneName = accountsObjOne.name.last.toUpperCase();
    let accountTwoName = accountsObjTwo.name.last.toUpperCase();
    //.sort will subtract the two accounts, and do...stuff. But I need to get like -1 or 1 here
    return accountOneName < accountTwoName ? -1 : 1; //a Ternarny operator...my worse enemy but i need them for grading requirements
    //I pray to never type one of those again
    // if (accountOneName < accountTwoName) {
    //   return -1;
    // }
    // if (accountOneName > accountTwoName) {
    //   return 1;
    // }
  });
  return result;
}
//INPUT: A single object for account (I just need the ID from it), and the full Books array
function getTotalNumberOfBorrows(account, books) {
  //Getting just ID from the singular account we have
  const { id } = account;
  //just need to see how often the ID is in currentBooks.borrows
  let totalBorrows = books.reduce((total, currentBookObj) => {
    let isBookBorrowed = currentBookObj.borrows.some((currentBorrowsObj) => {
      return currentBorrowsObj.id === id;
    });
    if (isBookBorrowed) {
      total++;
    }
    return total;
  }, 0);
  return totalBorrows;
}
//OUTPUT: number represesenting how many times the account's ID appears in ANY books borrow array

//INPUT: a single object from account, the entire books array and the entire authors array
function getBooksPossessedByAccount(account, books, authors) {
  let { id } = account; // A string EX: "5f446f2ed3609b719568a415"

  let booksBorrowedByAccount = books.filter((currentBookObj) => {
    //currentBookObj.borrows[0].id = string "5f446f2ea6b68cf6f85f6e28"
    if (!currentBookObj.borrows[0].returned) {
      return currentBookObj.borrows[0].id === id;
    }
  });

  //Okay booksBorrowedByAccount is an array of book currently checked out by the user. Now need to add author to the
  let booksBorrowedWithAuthor = booksBorrowedByAccount.filter(
    (currentBookBorrowedObj) => {
      const { authorId } = currentBookBorrowedObj;
      let foundAuthors = authors.find((currentAuthorObj) => {
        return currentAuthorObj.id === authorId;
      });
      currentBookBorrowedObj.author = foundAuthors;
      return currentBookBorrowedObj;
    }
  );
  return booksBorrowedWithAuthor;
}
//OUTPUT: Array of books object currently checkout out by the given account WHILE ALSO having the author object related to the book nested inside.

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
