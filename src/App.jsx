import React, { useState } from "react";
import axios from "axios";
import "./index.css";
export default function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("5803786");

  // API URL
  const url = `https://api.openweathermap.org/data/2.5/weather?id=${location}&appid=86953946c9e7fecad2cd08c5ee12572f&units=imperial`;

  const searchLocation = async (event) => {
    if (event.key === "Enter") {
      const response = await axios.get(url);
      console.log(response);
      setData(response.data);
    }
    setLocation("");
  };
  // 5803786
  return (
    <div className="app">
      <div className="search">
        <input
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter a city id"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()} &deg;F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.main !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()} &deg;F</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}

              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.main ? (
                <p className="bold">{data.wind.speed.toFixed()} mph</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
