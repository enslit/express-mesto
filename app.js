const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const userRouter = require('./routes/user');
const cardRouter = require('./routes/card');

const {
  SERVER_PORT = 5000,
  DB_HOST = 'localhost',
  DB_PORT = 27017,
  DB_NAME,
} = process.env;
const app = express();

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
