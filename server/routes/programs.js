const express = require('express');
const router = express.Router();

// middlewares

// controllers
const {
  getPrograms,
  getCategories,
  getNextPrevPrograms,
  getProgramEpisodes,
  getProgram,
  getEpisode,
  getRecent,
} = require('../controllers/programs');

// routes
router.get('/programs', getPrograms);
router.get('/programs/nextprev', getNextPrevPrograms);
router.get('/program/episodes/:id', getProgramEpisodes);
router.get('/program/:id', getProgram);
router.get('/episode/:id', getEpisode);
// router.post('/program/schedule', getProgramSchedule);
router.get('/categories', getCategories);
router.get('/recent', getRecent);

// export
module.exports = router;
