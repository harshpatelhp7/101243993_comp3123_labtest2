import "./App.css";
import { getWeatherData } from "./data/weatherApi";
import React, { useState, useEffect } from "react";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [cityName, setCityName] = useState("Toronto");
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await getWeatherData(cityName);
      setWeatherData(response);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message)
      setIsLoading(false);
    }
  };
  
 useEffect(() => {
   getData();
 }, []);
  

  return (
    <section className="App">
      <h1>Get Weather Information</h1>

      <input
        type="text"
        placeholder="City"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
      />
      <button type="submit" onClick={() => getData()}>
        Search
      </button>

      <div className="outputContainer">
        <h1>{weatherData.main.temp - 273.15} &deg;C </h1>
      </div>
    </section>
  );
}

export default App;
