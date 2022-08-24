import {
  startDate,
  endDate,
  check,
  city,
  picture,
  info,
  temperature,
  count_down,
  duration,
} from "./element";
import { getCity, getPlaceImage, getWeatherForecast } from "./service";
import {
  getISODateWithoutTime,
  addDayDate,
  calculateNumberOfDaysBetweenTwoDates,
} from "./helper";

const now = new Date();
export function initialize() {
  setMaxStartDate(now);
  setMinStartDate(now);
  setMinEndDate(startDate.valueAsDate);
  setCountdown();

  // Event binding
  check.addEventListener("click", async (e) => {
    e.preventDefault();
    await handleClickCheckEvent();
  });

  startDate.addEventListener("change", (e) => {
    setMinEndDate(e.target.valueAsDate);
    setCountdown();
    endDate.value = null;
  });

  endDate.addEventListener("change", (e) => {
    setDuration();
  });
}

function checkUserInput() {
  if (!startDate.value) {
    alert("Please choose a start date");
    return false;
  }

  if (!endDate.value) {
    alert("Please choose an end date!");
    return false;
  }

  if (!city.value) {
    alert("Please enter a city name!");
    return false;
  }

  return true;
}

function setMinStartDate(now) {
  const newMinStartDate = addDayDate(now, 1);
  startDate.setAttribute("min", getISODateWithoutTime(newMinStartDate));
  startDate.valueAsDate = newMinStartDate;
  return newMinStartDate;
}

function setMaxStartDate(now) {
  const newMaxStartDate = addDayDate(now, 16);
  startDate.setAttribute("max", getISODateWithoutTime(newMaxStartDate));
  return newMaxStartDate;
}

function setMinEndDate(startDate) {
  const newMinEndDate = new Date(+startDate);
  endDate.setAttribute("min", getISODateWithoutTime(newMinEndDate));
  return newMinEndDate;
}

function setCountdown() {
  count_down.innerText = calculateNumberOfDaysBetweenTwoDates(
    now,
    startDate.valueAsDate
  );
}

function setDuration() {
  duration.innerText = calculateNumberOfDaysBetweenTwoDates(
    startDate.valueAsDate,
    endDate.valueAsDate
  );
}

function setTemperature(temp) {
  temperature.innerText = temp;
}

function displayAndSetImageSrc(src) {
  picture.setAttribute("src", src);
  picture.style.setProperty("visibility", "visible");
}

function clear() {
  picture.style.setProperty("visibility", "hidden");
  temperature.innerText = "";
}

async function handleClickCheckEvent() {
  if (!checkUserInput()) {
    return;
  }
  clear();

  const userInputCityName = city.value;
  const userInputStartDate = startDate.valueAsDate;

  const foundedCity = await (await getCity(userInputCityName)).json();
  const daysUntilDepart = calculateNumberOfDaysBetweenTwoDates(
    now,
    userInputStartDate
  );
  const weatherForecastRequest = getWeatherForecast(
    daysUntilDepart,
    foundedCity.latitude,
    foundedCity.longitude
  );
  const placeImageRequest = getPlaceImage(foundedCity.locality);

  let [weatherForecast, placeImage] = await Promise.all([
    weatherForecastRequest,
    placeImageRequest,
  ]);

  weatherForecast = await weatherForecast.json();
  setTemperature(weatherForecast.temp);

  try {
    placeImage = await placeImage.json();
    displayAndSetImageSrc(placeImage.webformatURL);
  } catch (e) {
    displayAndSetImageSrc("");
  }
}
