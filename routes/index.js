const express = require('express');

const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { signUpValidation, signInValidation } = require('../middlewares/validator');
const { userRouter } = require('./users');
const { movieRouter } = require('./movies');

const routes = express.Router();

const NotFoundError = require('../errors/not-found-error');

routes.post('/signin', signInValidation, login);
routes.post('/signup', signUpValidation, createUser);
routes.use(auth);
routes.use('/users', userRouter);
routes.use('/movies', movieRouter);
routes.use('*', (req, res, next) => {
  next(new NotFoundError('Такая страница не существует'));
});
exports.routes = routes;
