const client = require("../config/db.config");

const cityDetails = {};

async function addstudent(name, city, seatno) {
  try {
    await client.query(
      "INSERT INTO student (name, city,seatno) VALUES ($1, $2, $3)",
      [name, city, seatno]
    );
  } catch (err) {
    console.log("error while addding contacts", err);
    return err;
  } 
}

async function addCenter(city, Coordinates) {
  const { latitude, longitude } = Coordinates;
  try {
    await client.query(
      "INSERT INTO ExamCenter1 (city,lat,lon) VALUES ($1, $2, $3)",
      [city, latitude, longitude]
    );
    cityDetails[city] = { Coordinates };
    console.log(cityDetails);
  } catch (err) {
    return err;
  } 
}

async function getStudent(id) {
  try {
    const result = await client.query("SELECT * FROM student WHERE id = $1", [
      id,
    ]);
    if (result != null && result.rowCount) {
      return result.rows[0].city;
    } else {
      return null;
    }
  } catch (err) {
    console.log("error while getting details", err);
    return err;
  } 
}

async function getCenter(coordinates) {
  try {
    const { latitude, longitude } = coordinates;

    const result = await client.query (
      "SELECT city FROM ExamCenter1 ORDER BY ((lat - $1) * (lat - $1) + (lon - $2) * (lon - $2)) ASC LIMIT 1",
      [latitude, longitude]
    );

    if (result && result.rows.length > 0) {
      return result.rows[0].city;
    } else {
      return null;
    }
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { addstudent, getStudent, addCenter, getCenter };
