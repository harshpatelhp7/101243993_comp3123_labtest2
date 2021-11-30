import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [weatherData, setweatherData] = useState(null);
  const [cityName, setcityName] = useState("Toronto");
  const [loading, setLoading] = useState(false);
  const d = new Date();

  const weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  let day = weekday[d.getDay()];

  const getWeatherData = async (cityName) => {
    try {
      const { data } = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=e8073111604440a77d90fe604e55fd0c`
      );
      return data;
    } catch (error) {
      throw error;
    }
  };

  const getData = async () => {
    try {
      setLoading(true);
      const data = await getWeatherData(cityName);
      setweatherData(data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <section className="App">
      <h1>Get Weather Information</h1>
      <div className="searchContainer">
        <input
          type="text"
          value={cityName}
          onChange={(e) => setcityName(e.target.value)}
          placeholder="city name"
        />
        <button type="button" onClick={() => getData()}>
          Search
        </button>
      </div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {weatherData !== null ? (
            <div className="outputContainer">
              <h4
                style={{
                  color: "red",
                  fontFamily: "cursive",
                  fontSize: "30px",
                }}
              >
                Live Data : {day}
              </h4>
              <div className="icon_type">
                <img
                  src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                  alt="imgicon"
                />
              </div>
              <h3 className="type">{weatherData.weather[0].main}</h3>
              <h1 className="temp">
                {parseFloat(weatherData.main.temp - 273.15).toFixed(1)}
                &deg;C
              </h1>

              <h4 className="min-max">
                {parseFloat(weatherData.main.temp_min - 273.15).toFixed(1)}
                &deg;C /
                {parseFloat(weatherData.main.temp_max - 273.15).toFixed(1)}
                &deg;C
              </h4>
              <h4>
                Feels like{" "}
                {parseFloat(weatherData.main.feels_like - 273.15).toFixed(1)}
                &deg;C
              </h4>
              <h4 className="city">
                City: {weatherData.name}, {weatherData.sys.country}
              </h4>
            </div>
          ) : null}
        </>
      )}
    </section>
  );
}

export default App;
