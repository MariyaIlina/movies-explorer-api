const Movie = require('../models/movies');
const NotFoundError = require('../errors/not-found-error');
const DeleteMovieError = require('../errors/delete-movie-error');
const ValidationError = require('../errors/validation-error');

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({});
    res.send(movies);
  } catch (err) {
    next(err);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image, trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
    } = req.body;
    const ownerId = req.user._id;
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner: ownerId,
    });
    res.send({ data: movie });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new ValidationError('Некорректные данные'));
    } else {
      next(err);
    }
  }
};
const deleteMovie = (req, res, next) => Movie.findById(req.params.movieId)
  .then((movie) => {
    if (!movie) {
      throw new NotFoundError('Такого фильма нет в базе данных');
    }
    if (!movie.owner.equals(req.user._id)) {
      throw new DeleteMovieError('Чужой фильм не может быть удален');
    }
    movie.deleteOne()
      .then(() => res.json({ movie }))
      .catch(next);
  })
  .catch((err) => {
    next(err);
  });

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
