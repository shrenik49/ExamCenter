const express = require('express');
const students= require('./controller');
const admin= require('./model/admin');


const app = express();
app.use(express.json());

app.use('/student', students);
app.use('/admin', admin);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
