const client = require('./db');
const db = require('./db')

const cityDetails = {}

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

  async function addCenter( city,Coordinates) {
    const {latitude,longitude} = Coordinates
    try { 
      await client.query(
        "INSERT INTO examcenter (city,lat,lon) VALUES ($1, $2, $3)",
        [city,latitude,longitude]
      );
      cityDetails[city]={Coordinates}
      console.log(cityDetails);
    } catch (err) {
      console.log("error while addding contacts",err);
      return err
    } finally {
      db.end();
    }
  }

async function getStudent(id) {
    try {
      const result = await db.query(
        "SELECT * FROM student WHERE id = $1",
        [id]
      );
      if (result != null && result.rowCount) {
        console.log(result.rows[0].city);
        return result.rows[0].city;
      }
    } catch (err) {
      console.log("error while addding contacts",err);
      return err
    } finally {
      db.end();
    }
}

async function getCenter(coordinates) {
    const { latitude, longitude } = coordinates
    try {
      const queryString = `
          SELECT city, earth_distance(ll_to_earth($1, $2), ll_to_earth(latitude, longitude)) AS distance 
          FROM examcenter 
          ORDER BY distance 
          LIMIT 1;
        `;
      const result = await client.query(queryString, [latitude, longitude]);

      if (result) {
        console.log(result);
        return result;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
}

  module.exports = {addstudent,getStudent,addCenter,getCenter}