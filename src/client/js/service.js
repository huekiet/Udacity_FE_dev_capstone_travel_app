import { config } from "./config";

/**
 * Get city name (full text search)
 * @param {string} cityName name of the city
 * @returns Api response
 */
export async function getCity(cityName) {
  return await fetch(`${config.apiUrl}/getPositionData?city=${cityName}`);
}

/**
 * Get weather forecast for specific location
 * @param {number} days number of days (1 - 16)
 * @param {number} lat latitude
 * @param {number} lon longitude
 * @returns Api response
 */
export async function getWeatherForecast(days, lat, lon) {
  return await fetch(`${config.apiUrl}/weather-forecast?days=${days}&lat=${lat}&lon=${lon}`);
}

/**
 * Get a picture from a place
 * @param {string} placeName name of the place
 * @returns Api response
 */
export async function getPlaceImage(placeName) {
  return await fetch(`${config.apiUrl}/place-image?q=${placeName}`);
}