import express from 'express';
import cors from 'cors';
import fetch from 'isomorphic-fetch';

const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

let pc = {};
fetch(pcUrl)
  .then(async (res) => {
    pc = await res.json();
  })
  .catch((err) => {
    console.log('Чтото пошло не так:', err);
  });

const app = express();
app.use(cors());
app.get('/volumes', (req, res) => {
  const result = pc.hdd.reduce((acc, hdd) => {
    if (!acc[hdd.volume]) {
      acc[hdd.volume] = 0;
    }
    acc[hdd.volume] += hdd.size;
    return acc;
  }, {});

  Object.keys(result).forEach((key) => {
    result[key] = `${result[key]}B`;
  });

  res.send(result);
});

app.use((req, res, next) => {
  const splittedReq = req.originalUrl.split('/')
    .filter(Boolean);
  let result = JSON.parse(JSON.stringify(pc));
  splittedReq.forEach((reqPart) => {
    result = Object.keys(result).indexOf(reqPart) !== -1 ? result[reqPart] : undefined;
    if (result === undefined) {
      res.send(404);
    }
  });

  if (typeof result === 'string') {
    result = `"${result}"`;
  }
  if (result === null || typeof result === 'number') {
    result = String(result);
  }
  res.send(result);
  next();
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});