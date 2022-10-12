function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}
//INPUT books array
function getBooksBorrowedCount(books) {
  let booksBorrowed = books.filter((currentBookObj) => {
    return currentBookObj.borrows[0].returned === false;
  });
  return booksBorrowed.length;
}
//OUTPUT number of books where borrowed[0].returned = false

//INPUT BOOKS ARRAY
function getMostCommonGenres(books) {
  //So step 1. find all the genres and cycle them so each match adds 1 to its array total
  //EX: [{genre: "VARIABLEHERE", count: NUMBER_TO_BE_INCREMENTED}]
  let result = [];

  let bookGenres = getArrayProperty(books, "genre"); //A helper function to get an array of just genre names from books
  //need to loop through that and can .push object into result
  //example of what next result.push({name: "GENREVARIHERE", count: NUMBER})

  bookGenres.find((currentGenresObj) => {
    let genresInResult = result.some((currentResultObj) => {
      return currentResultObj.name === currentGenresObj;
    });
    if (!genresInResult) {
      result.push({ name: currentGenresObj, count: 1 });
    } else {
      result.find((currentResultObj) => {
        if (currentResultObj.name === currentGenresObj) {
          currentResultObj.count += 1;
        }
      });
    }
  });
  //Okay result is formated, i just need to sort based on the value of count
  result.sort((currentResultA, currentResultB) => {
    return currentResultB.count - currentResultA.count;
  });
  return result.slice(0, 5);
}
//OUTPUT A NEW array with 5 or less indexes, sorted by count EX [{ name: "Nonfiction", count: 9 },{ name: "Historical Fiction", count: 7 }]

function getMostPopularBooks(books) {
  let result = [];
  let bookBorrows = books.reduce((total, currentBookObj) => {
    let { borrows } = currentBookObj;
    total = borrows.length;
    result.push({ name: currentBookObj.title, count: total });
    return total;
  });
  result.sort((resultObjA, resultObjB) => {
    return resultObjB.count - resultObjA.count;
  });
  return result.slice(0, 5);
} // OUTPUT A new array with 5 or less indexes sorted by their book.borrows length EX [{{ name: "incididunt nostrud minim", count: 30 },}]
//INPUT Entire books array and entire authors array
function getMostPopularAuthors(books, authors) {
  //So I need to loop through authors array, use that then loop through books array.
  //then when at each book where author ID match, get their borrows.length  and just sort
  //but then gotta get it in a new array structured like  [{ name: "Cristina Buchanan", count: 112 },{ name: "Tami Hurst", count: 83 },]
  //I wanna get an array of {name: nameVariHere, count: countNumberHere, and authorId: author ID here}
  //I will use .map at the end and make it only name and count property ex let BetterResuult = result.map((currentResultObj) => { return { name: currentResultObj.name, count: currentResultObj.count };
  let resultFormat = authors.map((currentAuthorObj) => {
    return {
      id: currentAuthorObj.id,
      name: `${currentAuthorObj.name.first} ${currentAuthorObj.name.last}`,
      count: 0,
    };
  }); //ex   { id: 37, name: 'Cristina Buchanan', count: 0 },
  //with result format can loop through this and books, no more author loop
  //just gonna format the books array too cause why not
  let booksFormat = books.map((currentBooksObj) => {
    return {
      authorId: currentBooksObj.authorId,
      borrowsLength: currentBooksObj.borrows.length,
    };
  }); //ex   { authorId: 37, borrowsLength: 2 }

  resultFormat.find((currentResultObj) => {
    let booksIDmatch = booksFormat.find((currentBookObj) => {
      return currentBookObj.authorId === currentResultObj.id;
    });
    if (booksIDmatch) {
      currentResultObj.count += booksIDmatch.borrowsLength;
    }
  });
  let resultSort = resultFormat.sort((objA, objB) => {
    return objB.count - objA.count;
  });

  let resultMinusId = resultSort.map((currentResultObj) => {
    return { name: currentResultObj.name, count: currentResultObj.count };
  });
  return resultMinusId.slice(0, 5);
  //RETURN TO Main functiongetMostPopularAuthors HERE
}
//OUTPUT A new array with 5 or less indexes sorted by most popular authors (checked by how often their books are borrowed)

function getArrayProperty(array, objectToGet) {
  //A helper function for getting a list of just genres
  let arrProp = array.map((currentArrayObj) => {
    let prop = currentArrayObj[objectToGet];
    return prop;
  });
  return arrProp;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
