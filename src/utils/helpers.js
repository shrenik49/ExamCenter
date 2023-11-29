const axios = require("axios");
const { getCenter } = require("../services/dbservices");
// const { getCenter } = require("../db/dbactions");

async function getCoordinates(cityName) {
  const apiUrl = `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(
    cityName
  )}&format=json`;
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
     console.log(result);
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error validating city:", error);
    return false;
  }
}

// async function getNearestCenter(city) {
//   const {latitude,longitude} = coordinates
//   if (coordinates) {
//     let city = getNearestCenter(coordinates)
//   } else {
//     return null;
//   }
// } catch (error) {
//   console.error("Error validating city:", error);
//   return false;
// }




module.exports = { validCity, getCoordinates,getCityDetails,getExamCenter};
