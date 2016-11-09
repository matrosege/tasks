import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/task2B', (req, res) => {

  const fioReq = req.query.fullname.trim().toLowerCase();
  const fio = fioReq.split(/\s+/);
  const surname = fio[fio.length-1];  
  var initials = 'Invalid fullname';

  if (surname && !/\d|\W(!.)|_|\//.test(fioReq)) {

    var upSurname = surname.charAt(0).toUpperCase() + surname.slice(1);
    if (fio.length == 3) {
      const name = fio[0].charAt(0).toUpperCase();
      const patr = fio[1].charAt(0).toUpperCase();
      var initials = `${upSurname} ${name}. ${patr}.`; 

    } else if (fio.length == 2) {
      const name = fio[0].charAt(0).toUpperCase();
      var initials = `${upSurname} ${name}.`;  
    } else if (fio.length == 1) {
      var initials = `${upSurname}`; 
    }
  };
  res.send(initials);
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});