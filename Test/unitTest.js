import { expect } from 'chai';
import { exec } from 'child_process';
import pool from '../config/query';
import createTestData from '../migrationScript/testMigration';

describe('Query Test', () => {
  beforeEach(async () => {
    //  await exec('npm run mig');
    await createTestData();
  });
  it('show all authors data', async () => {
    const expectation = [
      {
        authorId: 1,
        title: 'Ankit',
        authorImage: 'Ankit.jpg',
        content: 'Author ankit',
      },
      {
        authorId: 2,
        title: 'Vivek',
        authorImage: 'Vivek.jpg',
        content: 'Author vivek',
      },
      {
        authorId: 3,
        title: 'Nikhil',
        authorImage: 'Nikhil.jpg',
        content: 'Author Nikhil',
      },
    ];
    const [authors, fields] = await pool.getAuthors();
    expect(authors).deep.equals(expectation);
  });
  it('show all Books data', async () => {
    const expectation = [
      {
        id: 1,
        bookName: 'First book',
        author: 'Vivek',
        isbn: '123',
        images: 'First',
        content: 'This is first book',
        authorId: '1',
      },
      {
        id: 2,
        bookName: 'Second book',
        author: 'Ankit',
        isbn: '234',
        images: 'second',
        content: 'This is second book',
        authorId: '2',
      },
      {
        id: 3,
        bookName: 'Third book',
        author: 'Nikhil',
        isbn: '345',
        images: 'Third',
        content: 'This is third book',
        authorId: '3',
      },
    ];
    const [books, fields] = await pool.getBooks();
    expect(books).deep.equals(expectation);
  });
  it('Insert in authors table', async () => {
    const input = {"title":"Neeraj","authorImage":"neeraj.jpg","content":"This is first"}
    const expectation = [
      {
        authorId: 1,
        title: 'Ankit',
        authorImage: 'Ankit.jpg',
        content: 'Author ankit',
      },
      {
        authorId: 2,
        title: 'Vivek',
        authorImage: 'Vivek.jpg',
        content: 'Author vivek',
      },
      {
        authorId: 3,
        title: 'Nikhil',
        authorImage: 'Nikhil.jpg',
        content: 'Author Nikhil',
      },
      {
        authorId: 4,
        title: 'Neeraj',
        authorImage: 'neeraj.jpg',
        content: 'This is first',
      },
    ];   
    await pool.getAuthorInsert(input);
    const [authors, fields1] = await pool.getAuthors();
    // await pathName.getDeletedAuthorData(4);
    expect(authors).deep.equals(expectation);
  });
  it('Insert in Book Table', async () => {
    const expectation = [
      {
        id: 1,
        bookName: 'First book',
        author: 'Vivek',
        content: 'This is first book',
        isbn: '123',
        images: 'First',
        authorId: '1',
      },
      {
        id: 2,
        bookName: 'Second book',
        author: 'Ankit',
        content: 'This is second book',
        isbn: '234',
        images: 'second',
        authorId: '2',
      },
      {
        id: 3,
        bookName: 'Third book',
        author: 'Nikhil',
        content: 'This is third book',
        isbn: '345',
        images: 'Third',
        authorId: '3',
      },
      {
        id: 4,
        bookName: 'Forth Book',
        author: 'forth',
        content: 'This is forth book',
        isbn: '456',
        images: 'forth',
        authorId: '4',
      },
    ];
    const input = {"bookName":"Forth Book","author": "forth","content": "This is forth book","isbn":"456","images":"forth","authorId":"4"};
    await pool.getBookInsert(input);
    const [books, fields] = await pool.getBooks();
    // await pathName.getDeletedBookData(4);
    expect(books).deep.equals(expectation);
  });
  it('Update author', async () => {
    const expectation = [
      {
        authorId: 1,
        title: 'update',
        authorImage: 'Ankit.jpg',
        content: 'Author ankit',
      },
      {
        authorId: 2,
        title: 'Vivek',
        authorImage: 'Vivek.jpg',
        content: 'Author vivek',
      },
      {
        authorId: 3,
        title: 'Nikhil',
        authorImage: 'Nikhil.jpg',
        content: 'Author Nikhil',
      },
    ];
    await pool.updateAuthor(1, { "title":"update" });
    const [authors, fields] = await pool.getAuthors();
    expect(authors).deep.equals(expectation);
  });
  it('Update books', async () => {
    const expectation1 = [
      {
        id: 1,
        bookName: 'update',
        author: 'Vivek',
        content: 'This is first book',
        isbn: '123',
        images: 'First',
        authorId: '1',
      },
      {
        id: 2,
        bookName: 'Second book',
        author: 'Ankit',
        content: 'This is second book',
        isbn: '234',
        images: 'second',
        authorId: '2',
      },
      {
        id: 3,
        bookName: 'Third book',
        author: 'Nikhil',
        content: 'This is third book',
        isbn: '345',
        images: 'Third',
        authorId: '3',
      },
    ];
    const expec = 'Done';
    await pool.updateBook(1, { "bookName":"update" });
    const [books, fields] = await pool.getBooks();
    expect('Done').equals(expec);
  });
  it('delete a book', async () => {
    const expectation1 = [
      {
        id: 2,
        bookName: 'Second book',
        author: 'Ankit',
        content: 'This is second book',
        isbn: '234',
        images: 'second',
        authorId: '2',
      },
      {
        id: 3,
        bookName: 'Third book',
        author: 'Nikhil',
        isbn: '345',
        images: 'Third',
        content: 'This is third book',
        authorId: '3',
      },
    ];
    await pool.deleteBook(1);
    const [books, fields] = await pool.getBooks();
    expect(books).deep.equals(expectation1);
  });
  it('delete a author', async () => {
    const expectation = [{
      "authorId": 2,
      "authorImage": "Vivek.jpg",
      "content": "Author vivek",
      "title": "Vivek",
    },
    {
      "authorId": 3,
      "authorImage": "Nikhil.jpg",
      "content": "Author Nikhil",
      "title": "Nikhil",
    },
    ];
    await pool.deleteAuthor(1);
    const [books, fields] = await pool.getAuthors();
    expect(books).deep.equals(expectation);
  });
});
