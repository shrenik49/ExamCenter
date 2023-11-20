const axios = require("axios");

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
      return true;
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
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error validating city:", error);
    return false;
  }
}

module.exports = { validCity, getCoordinates };
