import { WEATHER_API_KEY, CITY, STATE } from "./env.js";

const clock = document.getElementById("clock");

function runClock() {
  let t = new Date();

  const hours = String(t.getHours() % 12).padStart(2, '0');
  const mins = String(t.getMinutes()).padStart(2, '0');
  const secs = String(t.getSeconds()).padStart(2, '0');

  const timestr = `${hours}:${mins}:${secs}`;
  clock.innerText = timestr;

  
}

function getUri() {
  let options = '&options=preview'
  let uri = `weather.visualcrossing.com/VisualCrossingWebServices/rest/services/
            timeline/${CITY}%20${STATE}?unitGroup=us&key=${WEATHER_API_KEY}&contentType=json`
}

setInterval(function() {
  runClock()
}, 1000)