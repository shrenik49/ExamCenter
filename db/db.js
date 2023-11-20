const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "ExamCenter",
  password: "4997",
  port: 5432,
});

// Connect to the database
client.connect()
  .then(() => {
    console.log("Connected to PostgreSQL database");
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });

// Handle uncaught exceptions to ensure graceful shutdown
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // Close database connection gracefully
  client.end(() => {
    process.exit(1);
  });
});

// Handle process termination to ensure database connection is closed
process.on('SIGINT', () => {
  console.log('Received SIGINT. Closing database connection...');
  client.end(() => {
    console.log('Database connection closed.');
    process.exit(0);
  });
});

module.exports = client;
