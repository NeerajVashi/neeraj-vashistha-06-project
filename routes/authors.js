import express from 'express';
import pool from '../config/sqlPool';
import sqlQuery from '../config/query';
import allowCrossDomain from '../config/middleware';

const router = express.Router();
router.get('/', allowCrossDomain, async (req, res) => {
  const [authors, fields] = await sqlQuery.getAuthors();
  res.json(authors);
});

router.get('/:id', async (req, res) => {
  const authorId = req.params.id;
  console.log('author');
  const author = await sqlQuery.getAuthorById(authorId);
  res.status(200).json(author);
});

router.get('/relation/:id', async (req, res) => {
  const authorId = req.params.id;
  const [authorsAndBooks, fields] = await sqlQuery.getAuthorsAndBooks(authorId);
  res.status(200).json(authorsAndBooks);
})

router.delete('/delete/:id', allowCrossDomain, async (req, res) => {
  console.log('delete id', req.params.id);
  const [deleteAuthor, fields] = await sqlQuery.deleteAuthor(req.params.id);
  res.send(deleteAuthor);
});

router.post('/insert', async (req, res) => {
  console.log('you are in author', req.body);
  const [result, fields] = await sqlQuery.getAuthorInsert(req.body);
  res.json(result);
});
router.put('/update/:id', async (req, res) => {
  const updateId = req.params.id;
  const updateRequest = req.body;
  console.log('you are in updateRequest: updateId', updateId, 'updateRequest:', updateRequest);
  await sqlQuery.updateAuthor(updateId, updateRequest);
  res.json(updateRequest);
});


module.exports = router;
