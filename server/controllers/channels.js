const axios = require('axios');
const json = 'format=json';
const pagination = 'pagination=false';
const { convertToDateObject } = require('../utils');

exports.getChannels = async (req, res) => {
  const channels = await axios.get(
    'http://api.sr.se/api/v2/channels/?' + json + '&' + pagination
  );
  const ch = channels.data.channels.filter((c) => c.id !== 163);
  res.json(ch);
};

exports.getChannel = async (req, res) => {
  const channel = await axios.get(
    `http://api.sr.se/api/v2/channels/${req.params.id}?${json} `
  );

  const rightNow = await axios.get(
    `http://api.sr.se/api/v2/scheduledepisodes/rightnow?channelid=${req.params.id}&format=json`
  );

  rightNow.data.channel.currentscheduledepisode.endtimeutc = convertToDateObject(
    rightNow.data.channel.currentscheduledepisode.endtimeutc
  );
  rightNow.data.channel.currentscheduledepisode.starttimeutc = convertToDateObject(
    rightNow.data.channel.currentscheduledepisode.starttimeutc
  );

  const c = { channel: channel.data.channel, rightNow: rightNow.data.channel };
  res.json(c);
};

exports.getChannelSchedule = async (req, res) => {
  const { id, date } = req.body;
  const d = date.slice(0, 10);

  try {
    const schedule = await axios.get(
      'http://api.sr.se/v2/scheduledepisodes?channelid=' +
        id +
        '&date=' +
        d +
        '&' +
        json
    );
    // return {copyright, schedule: []}

    schedule.data.schedule = await schedule.data.schedule.map((s) => {
      return {
        ...s,
        starttimeutc: convertToDateObject(s.starttimeutc),
        endtimeutc: convertToDateObject(s.endtimeutc),
      };
    });
    res.json(schedule.data);
  } catch (err) {
    console.log(err);
    res.json(err.data);
  }
};

exports.getNextPrevChannel = async (req, res) => {
  const { url } = req.query;
  const newSchedule = await axios.get(url);
  if (newSchedule.data.schedule) {
    newSchedule.data.schedule = await newSchedule.data.schedule.map((s) => {
      return {
        ...s,
        starttimeutc: convertToDateObject(s.starttimeutc),
        endtimeutc: convertToDateObject(s.endtimeutc),
      };
    });
  }
  res.json(newSchedule.data);
};

exports.getChannelPrograms = async (req, res) => {
  const programs = await axios.get(
    `http://api.sr.se/api/v2/programs/index?channelid=${req.params.id}&${json}`
  );
  res.json(programs.data);
};

exports.getCategories = async (req, res) => {
  const { data } = await axios.get(
    'http://api.sr.se/api/v2/programcategories?format=json&pagination=false'
  );
  res.json(data);
};

exports.getProgramsByCategory = async (req, res) => {
  const categoryId = req.params.categoryId;
};
