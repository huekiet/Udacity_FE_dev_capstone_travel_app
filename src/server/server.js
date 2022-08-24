// Environment variable setup
const dotenv = require("dotenv");
dotenv.config();

// Global variables
const geonameURL = "http://api.geonames.org/searchJSON";
const weatherForecastFutureURL =
  "https://api.weatherbit.io/v2.0/forecast/daily";
const weatherForecastCurrentURL = "http://api.weatherbit.io/v2.0/current";
const pixabayURL = "https://pixabay.com/api";
const geonameUsername = process.env.GEONAMES_USERNAME
const weatherKey = process.env.WEATHER_API_KEY;
const pixabayKey = process.env.PIXABAY_API_KEY;

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

// Other dependencies
const request = require("request");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("dist"));

// Setup Server
const port = 3000;
const server = app.listen(port, () => {
  console.log(`running server on local host at port: ${port}`);
});

// Root
app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
  // res.sendFile(path.resolve('src/client/views/index.html'))
});

// API: Get position of place
app.get("/getPositionData", (req, res) => {
  const query = req.query.city;
  const url = new URL(geonameURL);
  url.searchParams.set("username", geonameUsername);
  url.searchParams.set("q", query);
  url.searchParams.set("maxRows", 1);

  request(url.href, (error, response, body) => {
    try {
      const r = JSON.parse(body).geonames[0];
      res.status(200).send(r);
    } catch (e) {
      console.log("error in /getPositionData:", e);
      res.status(202).send(e.message);
    }
  });
});

// API: Get weather forecast
app.get("/weather-forecast", (req, res) => {
  const { days, lat, lon } = req.query;

  let url;
  if (days <= 7) {
    url = new URL(weatherForecastCurrentURL);
  } else {
    url = new URL(weatherForecastFutureURL);
    url.searchParams.set("days", days);
  }

  url.searchParams.set("key", weatherKey);
  url.searchParams.set("lat", lat);
  url.searchParams.set("lon", lon);

  request(url.href, (error, response, body) => {
    try {
      const r = JSON.parse(body);
      return res.status(200).send(r.data.pop());
    } catch (e) {
      console.log("error in /weather-forecast:", e);
      res.status(202).send(e.message);
    }
  });
});

// API: Get place image
app.get("/place-image", (req, res) => {
  const { q } = req.query;
  const url = new URL(pixabayURL);
  url.searchParams.set("key", pixabayKey);
  url.searchParams.set("q", q);
  url.searchParams.set("image_type", "photo");
  url.searchParams.set("category", "places");
  url.searchParams.set("per_page", 3);

  request(url.href, (error, response, body) => {
    try {
      const r = JSON.parse(body);
      res.status(200).send(r.hits[0]);
    } catch (e) {
      console.log("error in /place-image:", e);
      res.status(202).send(e.message);
    }
  });
});
