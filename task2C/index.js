import express from 'express';
import cors from 'cors';

function canonize(url) {
  const re = /(https?:)?(\/\/)?(.*[.]\w*\/)?\@?(\w*\.?[\w?]*)([/]\w*)?/;
  const username = url.match(re);
  console.log(username);
  console.log(username.length);
  if (username.length > 5) {
    return username[username.length-2];
  } else {
    return username[username.length-1];
  };
}

const app = express();
app.use(cors());

app.get('/task2C', (req, res) => {
  const user = canonize(req.query.username);
  console.log(user);
  res.send('@' + user);
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});