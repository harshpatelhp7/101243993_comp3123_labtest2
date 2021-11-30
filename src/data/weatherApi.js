import axios from "axios";

const baseUrl = "http://api.openweathermap.org/data/2.5/weather?";
const apiKey = "e8073111604440a77d90fe604e55fd0c";

export const getWeatherData = async (cityName) => {
  try {
    const { data } = await axios.get(baseUrl + `q=${cityName}&appid=${apiKey}`);
    return data;
  } catch (error) {
    throw error;
  }
};
