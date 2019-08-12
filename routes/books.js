import express from 'express';
import pool from '../config/sqlPool';
import sqlQuery from '../config/query';
import allowCrossDomain from '../config/middleware';

const router = express.Router();
router.get('/', allowCrossDomain, async (req, res) => {
  console.log('withoutId');
  const [books, fields] = await sqlQuery.getBooks();
  res.json(books);
});

router.post('/insert', allowCrossDomain, async (req, res) => {
  console.log('bookRequest', req.body);
  const [book, fields] = await sqlQuery.getBookInsert(req.body);
  res.json(book);
});
router.put('/update/:id', allowCrossDomain, async (req, res) => {
  const updateId = req.params.id;
  const updateRequest = req.body;
  await sqlQuery.updateBook(updateId, updateRequest);
  res.json(updateRequest);
});

router.delete('/delete/:id', allowCrossDomain, async (req, res) => {
  const reqId = req.params.id;
  console.log(reqId);
  await sqlQuery.deleteBook(reqId);
  res.status(200).send(`Id:${reqId} book is deleted`);
});

router.get('/:id', async (req, res) => {
  const reqId = req.params.id;
  console.log('book request Id:', reqId);
  const [book, fields] = await sqlQuery.getBookById(reqId);
  console.log(book);
  res.status(200).json(book);
});

module.exports = router;
