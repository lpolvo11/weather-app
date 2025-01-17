const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
dotenv.config();
const PORT = 3001;
app.use(cors());
app.use(express.json());
const API = process.env.API;

if (!API) {
  console.error("No api key is provided");
  process.exit(1);
}

app.get("/", (request, response) => {
  response.send("Hello world");
});

app.get("/api", async (request, response) => {
  const city = request.query.city;
  if (!city) {
    return response.status(400).send({ error: "city parameter is required" });
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}&units=metric`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Error while fetching data from the server");
    }
    const data = await res.json();
    response.send(data);
  } catch (err) {
    console.error(err);
    response.status(500).send({ error: "internal server error" });
  }
});

app.listen(PORT, () => {
  console.log("Listening on http://localhost:3001");
});
