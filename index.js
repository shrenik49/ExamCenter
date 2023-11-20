const express = require('express');
const students= require('./controller');


const app = express();
app.use(express.json());

app.use('/addstudentdata', students);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
