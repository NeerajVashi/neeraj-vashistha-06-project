import express from 'express';
import allowCrossDomain from '../config/middleware';

const router = express.Router();
router.get('/', allowCrossDomain, (req, res) => {
  // res.send('you are in Home page', req.header);

  res.status(200).send('you are in home');
});

router.get('/form', (req, res) => {
  res.render('form');
});
router.post('/', (req, res) => {
  console.log('body:', req.body);
  res.status(200).send('yess');
});
module.exports = router;
