const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const auth = require('./middlewares/auth');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const errorLogger = require('./middlewares/errorLogger');
const clientErrorHandler = require('./middlewares/clientErrorHandler');

const {
  SERVER_PORT = 5000,
  DB_HOST = 'localhost',
  DB_PORT = 27017,
  DB_NAME,
} = process.env;
const app = express();

app.use(cors({ origin: 'http://localhost' }));
app.use(express.json());
app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use(errorLogger);
app.use(clientErrorHandler);

mongoose
  .connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Соединение с базой данных установлено');
  })
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  });

app.listen(SERVER_PORT, () => {
  console.log('Сервер был запущен на порту', SERVER_PORT);
});
