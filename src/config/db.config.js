const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "ExamCenter",
  password: "4997",
  port: 5432,
});

client.connect()
  .then(() => {
    console.log("Connected to PostgreSQL database");
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });


module.exports = client;