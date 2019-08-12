import pool from './sqlPool';

async function getBooks() {
  const books = await pool.execute('select * from bookObject');
  return books;
}

async function getAuthors() {
  const author = await pool.execute('select * from authorObject');
  return author;
}

async function getAuthorInsert(requestauthor) {
  const newAuthor = await pool.execute('insert into authorObject(title, authorImage, content) values(?,?,?)', [requestauthor.title, requestauthor.authorImage, requestauthor.content]);
  return newAuthor;
}
async function getBookInsert(requestBook) {
  const newBook = await pool.execute('insert into bookObject(bookName, author, authorId, isbn, images, content) values(?,?,?,?,?,?)', [requestBook.bookName, requestBook.author, requestBook.authorId, requestBook.isbn, requestBook.images, requestBook.content]);
  return newBook;
}

async function deleteAuthor(deleteId) {
  const deleteauthor = await pool.execute('delete from authorObject where authorId = ?', [deleteId]);
  await pool.execute('delete from bookObject where authorId = ?', [deleteId]);
  return deleteauthor;
}
async function deleteBook(deleteId) {
  const deletebook = await pool.execute('delete from bookObject where id = ?', [deleteId]);
  return deletebook;
}

async function updateBook(updateId, updateRequest) {
  console.log(updateRequest);
  await Object.keys(updateRequest).forEach(async (entity) => {
    await pool.execute(`UPDATE bookObject set ${entity} = ? where id = ?`, [updateRequest[entity], updateId]);
    return 'Done';
  });
}

async function updateAuthor(updateId, updateRequest) {
  console.log(updateRequest);
  await Object.keys(updateRequest).forEach(async (entity) => {
    await pool.execute(`UPDATE authorObject set ${entity} = ? where authorId = ?`, [updateRequest[entity], updateId]);
  });
}
async function getBookById(bookId) {
  const Book = await pool.execute('select * from `bookObject` where id = ?', [bookId]);
  return Book;
}

async function getAuthorById(authorId) {
  const [singleAuthor, fields] = await pool.execute('select * from `authorObject` where authorid = ?', [authorId]);
  const [authorAndBooks, field] = await pool.execute('select * from bookObject b inner join authorObject o on b.authorId = o.authorId where b.authorId = ?', [authorId]);
  console.log('singleAuthor:', singleAuthor, 'authorAndBooks:', authorAndBooks);
  return ({ author: singleAuthor, authorAndBook: authorAndBooks });
}

async function getAuthorsAndBooks(authorId) {
  const authorAndBooks = await pool.execute('select * from bookObject b inner join authorObject o on b.authorId = o.authorId where b.authorId = ?', [authorId]);
  return authorAndBooks;
}

module.exports = {
  getBooks:getBooks,
  getAuthors:getAuthors,
  getBookInsert:getBookInsert,
  getAuthorInsert:getAuthorInsert,
  deleteAuthor:deleteAuthor,
  deleteBook:deleteBook,
  updateAuthor:updateAuthor,
  updateBook:updateBook,
  getBookById:getBookById,
  getAuthorById:getAuthorById,
  getAuthorsAndBooks:getAuthorsAndBooks,
};
