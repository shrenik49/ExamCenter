const express = require('express');

const studentRoute = require('./src/routes/studentRoutes');
const adminrouter = require('./src/routes/adminRoutes');



const app = express();
app.use(express.json());

app.use('/student', studentRoute);
app.use('/admin', adminrouter);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
