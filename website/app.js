/* Global Variables */
const apiKey = "6e15d3bd89bcaea57a3873471344ce2a";
const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather";

const zipInput = document.getElementById("zip");
const feelingsInput = document.getElementById("feelings");
const generateButton = document.getElementById("generate");

const dateEntry = document.getElementById("date");
const tempEntry = document.getElementById("temp");
const contentEntry = document.getElementById("content");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Helper function
async function getCurrentWeather() {
  const zipCode = zipInput.value;
  // zipcode: 10024
  const res = await fetch(
    `${weatherApiUrl}?zip=${zipCode}&appid=${apiKey}&units=metric`
  );
  return res.json();
}

async function saveProjectData({ temperature, date, userResponse }) {
  const res = await fetch("/projectData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      temperature,
      date,
      userResponse,
    }),
  });
  return res;
}

async function getProjectDataAndUpdateUI() {
  const res = await fetch("/projectData");
  const data = await res.json();
  console.log('data:', data);
  dateEntry.innerText = data.date;
  tempEntry.innerText = `${data.temperature} Celsius`;
  contentEntry.innerText = data.userResponse;
}

// Event binding
generateButton.addEventListener("click", (e) => {
  getCurrentWeather()
    .then((res) => {
      const data = {
        temperature: res.main.temp,
        date: newDate,
        userResponse: feelingsInput.value,
      };
      return saveProjectData(data);
    })
    .then(getProjectDataAndUpdateUI)
    .catch(e => alert('An error occurred, see log for more details!'));
});
