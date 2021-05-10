const db = require('../models/dbHelpers');
const bcrypt = require('bcrypt');
const authToken = require('../auth/authToken');
const axios = require('axios');
const json = 'format=json';
const { convertToDateObject, checkPassword, checkEmail } = require('../utils');

const saltRounds = 10;

exports.userRegister = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const validatePassword = checkPassword(password);
  const validateEmail = checkEmail(email);

  // check email
  if (!validateEmail) return res.json({ error: 'email not valid' });

  // check password
  if (!validatePassword.val) return res.json({ error: validatePassword.err });
  // encrpt pw and continue register
  bcrypt.hash(password, saltRounds, async (err, hash) => {
    if (err) {
      console.log(err);
      return res.json({ error: err });
    }
    try {
      const user = await db('users').insert({ email, password: hash });

      res.json({ registered: true });
    } catch (err) {
      res.json({ error: err });
      console.log(err);
    }
  });
};

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  await db('users')
    .where({ email })
    .then((response) => {
      console.log(response);
      // user exists => check password
      //   response return array[{user}]
      if (response.length > 0) {
        bcrypt.compare(password, response[0].password, (error, result) => {
          if (result) {
            console.log(result);

            const token = authToken({
              email: response[0].email,
              id: response[0].id,
            });

            return res.json({
              user: { email: response[0].email, id: response[0].id },
              token,
              auth: true,
            });
          } else {
            return res.json({
              message: 'wrong username/password combination',
            });
          }
        });
        return;
      }
      // no email found
      return res.json({ message: 'email not registered' });
    })
    .catch((err) => {
      res.status(401).json({ message: err.message });
    });
};

exports.getUser = async (req, res) => {
  const { id, username } = req.user;

  const token = authToken({ email: username, id });

  res.json({
    user: { email: username, id },
    token,
    auth: true,
  });
};

exports.verifyUser = async (req, res) => {
  console.log('asd');
  res.json(req.user);
};
exports.addToFavorite = async (req, res) => {
  const { id } = req.user;
  const { type, typeId } = req.body;
  console.log(type, typeId);
  const keyVal = Object.entries(typeId);
  try {
    const add = await db(type).insert({
      userId: id,
      [keyVal[0][0]]: keyVal[0][1],
    });
    console.log(add);
    res.json({ added: true });
  } catch (err) {
    console.log(err);
  }
};
exports.removeFromFavorite = async (req, res) => {
  const { id } = req.user;
  console.log(req.body);
  const { type, typeId } = req.body.data;
  const keyVal = Object.entries(typeId);
  try {
    const del = await db(type)
      .where({
        userId: id,
        [keyVal[0][0]]: keyVal[0][1],
      })
      .del();
    console.log(del);
    res.json({ deleted: true });
  } catch (err) {
    console.log(err);
  }
};

exports.getFavorites = async (req, res) => {
  console.log('fav');
  const { id } = req.user;
  console.log(id);
  const channels = await db('favoriteChannels').where({ userId: id });
  const programs = await db('favoritePrograms').where({ userId: id });
  const episodes = await db('favoriteEpisodes').where({ userId: id });
  console.log('episodes', programs);

  let channelArr = await Promise.all(
    channels.map((c) =>
      axios
        .get(`http://api.sr.se/api/v2/channels/${c.channelId}?${json} `)
        .then((res) => res.data.channel)
        .catch((err) => {
          console.log('error channel', err);
        })
    )
  );

  let programArr = await Promise.all(
    programs.map((p) =>
      axios
        .get(`http://api.sr.se/api/v2/programs/${p.programId}?${json} `)
        .then((res) => res.data.program)
        .catch((err) => {
          console.log('error program', err);
        })
    )
  );

  let episodeArr = await axios
    .get(
      `http://api.sr.se/api/v2/episodes/getlist?ids=${episodes.map(
        (e) => e.episodeId
      )}&${json}`
    )
    .then((res) => res.data.episodes)
    .catch((err) => console.log('err ep', err.message));
  console.log('episode', episodeArr);

  res.json({
    channels: channelArr,
    programs: programArr,
    episodes: episodeArr,
  });
};

exports.getFavoriteSchedule = async (req, res) => {
  const { id } = req.user;
  console.log(id);
  const d = req.body.date;
  const channels = await db('favoriteChannels').where({ userId: id });
  const programs = await db('favoritePrograms').where({ userId: id });
  const episodes = await db('favoriteEpisodes').where({ userId: id });

  let channelsSchedule = await Promise.all(
    channels.map(async (c) => {
      const schedule = await axios.get(
        'http://api.sr.se/v2/scheduledepisodes?channelid=' +
          c.channelId +
          '&date=' +
          d +
          '&' +
          json
      );
      // return {copyright, schedule: []}
      console.log(c.id);

      schedule.data.schedule = await schedule.data.schedule.map((s) => {
        return {
          ...s,
          starttimeutc: convertToDateObject(s.starttimeutc),
          endtimeutc: convertToDateObject(s.endtimeutc),
        };
      });
      return { ...c, schedule: schedule.data.schedule };
    })
  );
  console.log(channelsSchedule);
  res.json(channelsSchedule);
};
