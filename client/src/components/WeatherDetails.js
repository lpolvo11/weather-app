import React from "react";

const WeatherDetails = ({ weather }) => {
  if (!weather) {
    return null;
  }
  return (
    <div
      style={{
        background: "linear-gradient(to right, #00c6ff, #0072ff)",
        color: "white",
        borderRadius: "10px",
        padding: "20px",
        width: "100%",
        maxWidth: "600px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        textAlign: "center",
        minHeight: "300px",
      }}
    >
      <h1>Weather in: {weather.name}</h1>
      <p>Temp: {weather.main.temp}°C</p>
      <p>Feels like: {weather.main.feels_like}°C</p>
      <p>Humidity: {weather.main.humidity}</p>
      <p>Description: {weather.weather[0].description}</p>
    </div>
  );
};

export default WeatherDetails;
