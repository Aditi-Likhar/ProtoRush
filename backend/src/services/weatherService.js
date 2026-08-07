const axios = require("axios");

// Free, keyless weather API — Open-Meteo
const getCurrentWeather = async (lat, lng) => {
  try {
    const { data } = await axios.get("https://api.open-meteo.com/v1/forecast", {
      params: {
        latitude: lat,
        longitude: lng,
        current: "temperature_2m,weather_code",
      },
    });

    const temp = data?.current?.temperature_2m;
    return {
      temp: temp !== undefined ? Math.round(temp) : null,
    };
  } catch (err) {
    console.error("Weather fetch failed:", err.message);
    return { temp: null }; // fail gracefully — frontend can hide temp badge if null
  }
};

module.exports = { getCurrentWeather };