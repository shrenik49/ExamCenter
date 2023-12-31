const axios = require("axios");
const { getCenter, getStudent } = require("../services/dbservices");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


async function getCoordinates(cityName) {
  const apiUrl = `https://nominatim.openstreetmap.org/search?city=${cityName}&format=json`;
  try {
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (response.status === 200 && data.length > 0) {
      const firstResult = data[0];
      const latitude = parseFloat(firstResult.lat);
      const longitude = parseFloat(firstResult.lon);
      console.log(
        `Coordinates for ${cityName}: Latitude - ${latitude}, Longitude - ${longitude}`
      );
      return { latitude, longitude };
    } else {
      console.log(`No coordinates found for ${cityName}`);
      return false;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
}

async function validCity(city) {
  try {
    const coordinates = await getCoordinates(city);
    if (coordinates) {
      return coordinates;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error validating city:", error);
    return false;
  }
}


async function getCityDetails(city) {
  try {
    const coordinates = await getCoordinates(city);
    if (coordinates) {
      return coordinates;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error validating city:", error);
    return false;
  }
}

async function getExamCenter(city) {
  
    try {
      const coordinates = await getCoordinates(city);

      const result = await getCenter(coordinates)
      
      if (result) {
          return result
      } else {
        return "Nearest City Not Found";
      }
    } catch (error) {
      console.error("Error validating city:", error);
      return error;
    }
  }

  

  async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }

  function comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  }


module.exports = { validCity, getCoordinates,getCityDetails,getExamCenter};