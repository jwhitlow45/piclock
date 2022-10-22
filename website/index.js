import { WEATHER_API_KEY, CITY, STATE } from "./env.js";
const clock = document.getElementById("clock");
const button = document.getElementById("temp");
button.addEventListener('click', weatherTest);
const URI = buildURI();

function runClock() {
  let t = new Date();

  const hours = String(t.getHours() % 12).padStart(2, '0');
  const mins = String(t.getMinutes()).padStart(2, '0');
  const secs = String(t.getSeconds()).padStart(2, '0');

  let timestr = `${hours}:${mins}`;
  timestr = '00:00' 
  clock.innerText = timestr;

  // update weather every 10 minutes
  if (mins % 10 == 0 && secs == 0) {
    console.log('dosomething')
  }

}

function weatherTest() {
  console.log('weather test');

  fetch(URI,
  {
    "method": "GET",
    "headers": {}
  })
  .then(response => {
    if (!response.status == 200) {
      throw "Bad response!";
    }
    return response.json();
  })
  .then(json => {
    var curCond = json.currentConditions;
    var forecast = json.days;

    console.log(curCond);
    console.log(forecast);
  })
  .catch(err => {
    console.error(err);
  });
}

function buildURI() {
  let uri = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${CITY}%2C${STATE}?unitGroup=us&key=${WEATHER_API_KEY}&contentType=json`;
  return uri;
}

setInterval(function() {
  runClock()
}, 1000)