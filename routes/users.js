const express = require('express');

const userRouter = express.Router();
const {
  updateUser,
  getUserMe,
} = require('../controllers/users');
const { patchUserMeValidation } = require('../middlewares/validator');

userRouter.get('/me', getUserMe);
userRouter.patch('/me', patchUserMeValidation, updateUser);

module.exports = { userRouter };
