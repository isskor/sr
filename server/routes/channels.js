const express = require('express');
const router = express.Router();

// middlewares

// controllers
const {
  getChannels,
  getCategories,
  getChannel,
  getChannelSchedule,
  getNextPrevChannel,
  getChannelPrograms,
} = require('../controllers/channels');

// routes
router.get('/channels', getChannels);
router.get('/channels/nextprev', getNextPrevChannel);
router.get('/channels/programs/:id', getChannelPrograms);
router.get('/channels/:id', getChannel);
router.post('/channels/schedule', getChannelSchedule);
router.get('/categories', getCategories);

// export
module.exports = router;
