import request from 'supertest';
import { exec } from 'child_process';
import app from '../server';
import createTestData from '../migrationScript/testMigration';
describe('Integration Test', () => {
  beforeEach(async () => {
    await createTestData();
    // await exec('npm run mig');
  });
  it ("HomePage Route Test", (done) => {
    request(app).get('/')
      .expect(200)
      .expect('you are in home', done);
  });
  it ("Books Route Test ", (done) => {
    const books = [
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
    request(app).get('/book')
      .expect('Content-Type', /json/)
      .expect(books)
      .expect(200, done);
  });
  it ("Book Insert Route Test ", (done) => {
    const response = {"affectedRows": 1,
      // eslint-disable-next-line indent
      "fieldCount": 0,
      "info": "",
      "insertId": 4,
      "serverStatus" : 2,
      "warningStatus" : 0,
    };
    const newbook = {"bookName":"Forth Book","author": "forth","content": "This is forth book","isbn":"456","images":"forth","authorId":"4"};
    request(app).post('/book/insert')
      .send(newbook)
      .expect('Content-Type', /json/)
      .expect(response)
      .expect(200, done);
  });
  it ("Book Update Route Test ", (done) => {
    const newUpdateBook =  {"author":"update" };
    request(app)
      .put('/book/update/1')
      .send(newUpdateBook)
      .expect(newUpdateBook)
      .expect(200)
      .end(done);
  });
  it ("Book Delete Route Test ", (done) => {
    const id = 1;
    request(app).delete(`/book/delete/${id}`)
      .expect(`Id:${id} book is deleted`)
      .expect(200, done);
  });
  it ("Authors Route Test", (done) => {
    const authors = [
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
    request(app).get('/author')
      .expect('Content-Type', /json/)
      .expect(authors)
      .expect(200, done);
  });
  it ("Author Insert Route Test", (done) => {
    const authorResponse = {
      "affectedRows": 1,
      "fieldCount": 0,
      "info": "",
      "insertId": 4,
      "serverStatus": 2,
      "warningStatus": 0,
    };
    const input = {"title":"Neeraj","authorImage":"neeraj.jpg","content":"This is first"}
    request(app).post('/author/insert')
      .send(input)
      .expect('Content-Type', /json/)
      .expect(authorResponse)
      .expect(200, done);
  });
  it ("Author Update Route Test", (done) => {
    request(app).put('/author/update/3')
      .send({ "title":"update" })
      .expect('Content-Type', /json/)
      .expect(200)
      .end(done);
  });
  it ("Author delete Route Test", (done) => {
    request(app).delete('/author/delete/1')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
