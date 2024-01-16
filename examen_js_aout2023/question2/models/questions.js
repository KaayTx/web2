const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/q.json');

const jsonDbPath2 = path.join(__dirname, '/../data/games.json');

const usersResultat = [
  {
    username: 'user1',
    score: 2,
    Date: '2021-07-01T11:00:00.000Z',
  },
];

function getallusersresult() {
  const users = parse(jsonDbPath2, usersResultat);
  return users;
}

function updatescore(username, score) {
  const numericScore = parseInt(score, 10);
  if (!Number.isInteger(numericScore) || numericScore < 0 || numericScore > 3) {
    return { error: 'Invalid score. Please provide a score between 0 and 3.' };
  }
  const users = getallusersresult();
  const user = users.find((u) => u.username === username);

  if (user) {
    user.score = score;
  } else {
    users.push({
      username,
      score,
      Date: new Date().toISOString(),
    });
  }
  serialize(jsonDbPath2, users);
  return users;
}

const defaultQuestions = [
  {
    id: 1,
    level: 'easy',
    category: 'Mathematics',
    question: 'What is 2 + 2?',
    answers: [
      {
        text: '4',
        isCorrect: true,
      },
      {
        text: '3',
        isCorrect: false,
      },
      {
        text: '5',
        isCorrect: false,
      },
    ],
  },
  {
    id: 2,
    level: 'medium',
    category: 'Mathematics',
    question: 'What is the square root of 64?',
    answers: [
      {
        text: '6',
        isCorrect: false,
      },
      {
        text: '8',
        isCorrect: true,
      },
      {
        text: '10',
        isCorrect: false,
      },
    ],
  },
  {
    id: 3,
    level: 'hard',
    category: 'Mathematics',
    question: 'What is the value of pi (π) to two decimal places?',
    answers: [
      {
        text: '3.14',
        isCorrect: true,
      },
      {
        text: '3.12',
        isCorrect: false,
      },
      {
        text: '3.16',
        isCorrect: false,
      },
    ],
  },
  {
    id: 4,
    level: 'easy',
    category: 'Mathematics',
    question: 'What is 5 x 9?',
    answers: [
      {
        text: '45',
        isCorrect: true,
      },
      {
        text: '36',
        isCorrect: false,
      },
      {
        text: '50',
        isCorrect: false,
      },
    ],
  },
];

function getallquestion() {
  const questions = parse(jsonDbPath, defaultQuestions);
  return questions;
}

function getRandomInt(min, max) {
  // eslint-disable-next-line no-param-reassign
  min = Math.ceil(min);
  // eslint-disable-next-line no-param-reassign
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function read3divinete(level) {
  const questions = getallquestion();

  const filteredQuestions = level ? questions.filter((q) => q.level === level) : questions;

  if (level && filteredQuestions.length === 0) {
    return { error: 'Invalid level specified' };
  }

  const selectedQuestions = [];
  const usedIndexes = new Set();

  while (selectedQuestions.length < 3 && usedIndexes.size < filteredQuestions.length) {
    const randomIndex = getRandomInt(0, filteredQuestions.length - 1);
    if (!usedIndexes.has(randomIndex)) {
      selectedQuestions.push(filteredQuestions[randomIndex]);
      usedIndexes.add(randomIndex);
    }
  }

  return selectedQuestions;
}

module.exports = {
  getallquestion,
  read3divinete,
  getallusersresult,
  updatescore,
};
