const express = require('express');
const router = express.Router();

// middlewares
const { authCheck } = require('../auth/authRoute');
// controllers
const {
  userLogin,
  userRegister,
  getUser,
  verifyUser,
  addToFavorite,
  getFavorites,
  removeFromFavorite,
  getFavoriteSchedule,
} = require('../controllers/users');

// routes
router.post('/user/register', userRegister);
router.post('/user/login', userLogin);
router.get('/user/get', authCheck, getUser);
// router.get('/user/favorite', authCheck, verifyUser);
router.post('/user/favorite', authCheck, addToFavorite);
router.delete('/user/favorite', authCheck, removeFromFavorite);
router.get('/user/favorite', authCheck, getFavorites);
router.get('/user/schedule', authCheck, getFavoriteSchedule);

// export
module.exports = router;
