const axios = require('axios');
const json = 'format=json';
const pagination = 'pagination=false';
const { convertToDateObject } = require('../utils');

exports.getPrograms = async (req, res) => {
  const { categoryId, page } = req.query;

  const programs = await axios.get(
    `http://api.sr.se/api/v2/programs/index?&programcategoryid=${categoryId}&page=${page}&size=20&` +
      json
  );
  res.json(programs.data);
};

exports.getProgram = async (req, res) => {
  const program = await axios.get(
    `http://api.sr.se/api/v2/programs/${req.params.id}?${json} `
  );
  res.json(program.data);
};

exports.getNextPrevPrograms = async (req, res) => {
  const { url } = req.query;
  const nextPage = await axios.get(url);
  if (nextPage.data.episodes) {
    nextPage.data.episodes = await nextPage.data.episodes.map((s) => {
      return {
        ...s,
        broadcasttime: {
          starttimeutc: convertToDateObject(s.broadcasttime.starttimeutc),
          endtimeutc: convertToDateObject(s.broadcasttime.endtimeutc),
        },
      };
    });
  }
  res.json(nextPage.data);
};

exports.getCategories = async (req, res) => {
  const { data } = await axios.get(
    'http://api.sr.se/api/v2/programcategories?format=json&pagination=false'
  );
  res.json(data);
};

exports.getProgramEpisodes = async (req, res) => {
  const { end, start } = req.query;
  const { id } = req.params;
  const episodes = await axios.get(
    `http://api.sr.se/api/v2/episodes/index?programid=${id}&fromdate=${start}&todate=${end}&audioquality=hi&format=json`
  );

  episodes.data.episodes = episodes.data.episodes.map((e) => {
    const start = convertToDateObject(e.broadcasttime.starttimeutc);
    const end = convertToDateObject(e.broadcasttime.endtimeutc);

    return {
      ...e,
      broadcasttime: {
        starttimeutc: start,
        endttimeutc: end,
      },
    };
  });

  res.json(episodes.data);
};

exports.getEpisode = async (req, res) => {
  const { id } = req.params;
  const episode = await axios.get(
    `http://api.sr.se/api/v2/episodes/get?id=${id}&format=json`
  );

  episode.data.episode.broadcasttime.endtimeutc = convertToDateObject(
    episode.data.episode.broadcasttime.endtimeutc
  );
  episode.data.episode.broadcasttime.starttimeutc = convertToDateObject(
    episode.data.episode.broadcasttime.starttimeutc
  );

  res.json(episode.data);
};

exports.getRecent = async (req, res) => {
  const recent = await axios.get(
    'http://api.sr.se/api/v2/lastpublished?&format=json'
  );

  res.json(recent.data.shows);
};
