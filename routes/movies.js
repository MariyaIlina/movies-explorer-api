const express = require('express');

const movieRouter = express.Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const { createMovieValidation, validateMovieId } = require('../middlewares/validator');

movieRouter.get('/', getMovies);

movieRouter.post('/', createMovieValidation, createMovie);

movieRouter.delete('/:movieId', validateMovieId, deleteMovie);

module.exports = { movieRouter };
