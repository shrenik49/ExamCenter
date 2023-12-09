const ExamCenter = require("../model/ExamCenter");

async function addCenter(city, Coordinates) {
    const { latitude, longitude } = Coordinates;
    try {
      await ExamCenter.create({
        city,
        lat: latitude,
        lon: longitude,
      });
    } catch (error) {
      console.error('Error while adding exam center:', error);
      throw error;
    }
  }

  async function deleteCenterByCity(cityName) {
    try {
      const centerToDelete = await ExamCenter.findOne({ where: { city: cityName } });
      if (centerToDelete) {
        await centerToDelete.destroy();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }

module.exports = {
    addCenter,
    deleteCenterByCity
}