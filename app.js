const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const cors = require('cors');
const { errors } = require('celebrate');
const { routes } = require('./routes/index');
const { limiter } = require('./middlewares/limiter');

const { PORT = 3000 } = process.env;
const app = express();
const { requestLogger, errorLogger } = require('./middlewares/logger');

app.use(cors({
  origin: ['http://localhost:3000',
    'http://localhost:3002',
    'http://localhost:3001',
    'http://api.praktikum.movies.nomoredomains.rocks',
    'http://praktikum.movies.nomoredomains.rocks',
    'https://api.praktikum.movies.nomoredomains.rocks',
    'https://praktikum.movies.nomoredomains.rocks'],
  credentials: true,
}));

app.use(requestLogger);

app.use(limiter);
app.use(express.json());
app.use(routes);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});
app.listen(PORT, () => {
  console.log('Сервер запущен на порту', { PORT });
});
