const db = require('./db')

async function addstudent(name, city ,seatno) {
    try {
      await db.query(
        "INSERT INTO student (name, city,seatno) VALUES ($1, $2, $3)",
        [name, city ,seatno]
      );
    } catch (err) {
      console.log("error while addding contacts",err);
      return err
    } finally {
      db.end();
    }
  }

  module.exports = {addstudent}