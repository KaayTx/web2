const express = require('express');
const {
  getallquestion, read3divinete, getallusersresult, updatescore,
} = require('../models/questions');

const router = express.Router();

router.get('/', (req, res) => {
  const questions = getallquestion();
  return res.json(questions);
});

router.get('/start', (req, res) => {
  const level = req.query;
  const result = read3divinete(level);
  if (!result) {
    return res.status(400).json({ error: result.error });
  }
  return res.json(result);
});

router.get('/users', (req, res) => {
  const users = getallusersresult();
  return res.json(users);
});

router.post('/users', (req, res) => {
  const { username, score } = req.body;
  if (!username || !score) {
    return res.status(400).json({ error: 'username and score are required' });
  }
  const result = updatescore(username, score);
  return res.json(result);
});

module.exports = router;
