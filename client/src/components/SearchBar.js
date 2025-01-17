import React, { useState } from "react";
import WeatherDetails from "./WeatherDetails";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const SearchBar = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchWeather = async () => {
    if (!city) {
      setIsError("city parameter is required");
      return;
    }
    setIsLoading(true);
    setWeatherData(null);
    setIsError(false);
    const url = `http://localhost:3001/api?city=${city}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setWeatherData(data);
      }
    } catch (error) {
      setIsError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Box sx={{ width: 200, marginTop: 12 }}>
          <TextField
            fullWidth
            label="Enter city"
            id="fullWidth"
            onChange={handleCityChange}
          />
        </Box>
        <Stack
          spacing={2}
          direction="row"
          sx={{ marginLeft: 2, marginTop: 12 }}
        >
          <Button onClick={fetchWeather} variant="contained">
            Search
          </Button>
        </Stack>
      </div>
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {isError && (
        <p
          style={{
            color: "red",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "25px",
          }}
        >
          Error... {isError}
        </p>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          minHeight: "300px",
        }}
      >
        {weatherData && <WeatherDetails weather={weatherData} />}
      </div>
    </>
  );
};

export default SearchBar;
