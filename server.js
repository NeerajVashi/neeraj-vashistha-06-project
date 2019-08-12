import express from 'express';
import winston from 'winston';
import bodyParser from 'body-parser';
import booksPage from './routes/books';
import authorsPage from './routes/authors';
import home from './routes/home';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const cors = require('cors');

app.use(cors());
const LogConfiguration = {
  transports: [
    new winston.transports.File({
      filename: './Log/log1.log',
    }),
  ],
};
const logger = winston.createLogger(LogConfiguration);
logger.info('logger info message lets check');
app.set('view engine', 'ejs');
app.use('/', home);
app.use('/book', booksPage);
app.use('/author', authorsPage);
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`you are listening ${port}`));

module.exports = app;
