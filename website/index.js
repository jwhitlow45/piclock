import { WEATHER_API_KEY, CITY, STATE } from "./env.js";

const clock = document.getElementById("clock");
const button = document.getElementById("temp");
const forecast_imgs = document.getElementsByClassName("forecast-img");

const forecast_dates = document.getElementsByClassName("forecast-date");
const forecast_highs = document.getElementsByClassName("forecast-high");
const forecast_lows = document.getElementsByClassName("forecast-low");

const URI = buildURI();

updateClockWeather();

function runClock() {
  let t = new Date();


  const hours = String(t.getHours() % 12).padStart(2, '0');
  const mins = String(t.getMinutes()).padStart(2, '0');
  const secs = String(t.getSeconds()).padStart(2, '0');

  let timestr = `${hours}:${mins}`;
  clock.innerText = timestr;

  // update weather every 10 minutes
  if (mins % 10 == 0 && secs == 0) {
    updateClockWeather();
  }

}

function updateClockWeather() {
  fetch(URI,
  {
    "method": "GET",
    "headers": {}
  })
  .then(response => {
    if (!response.ok) {
      throw response;
    }
    return response.json();
  })
  .then(json => {
    var curCond = json.currentConditions;
    var forecast = json.days;

    forecast_imgs[0].src = "./img/weathericons/" + curCond.icon + ".svg";
    forecast_dates[0].innerText = curCond.temp + " F";
    
    let sunrise = new Date(0);
    let sunset = new Date(0);
    sunrise.setUTCSeconds(curCond.sunriseEpoch);
    sunset.setUTCSeconds(curCond.sunsetEpoch);
    let sunrisestr = String(sunrise.getHours() % 12).padStart(2, '0') + ":" + String(sunrise.getMinutes()).padStart(2, '0') + " AM";
    let sunsetstr = String(sunset.getHours() % 12).padStart(2, '0') + ":" + String(sunset.getMinutes()).padStart(2, '0') + " PM";

    forecast_highs[0].innerText = sunrisestr;
    forecast_lows[0].innerText = sunsetstr;

    for (let i = 0; i < forecast_imgs.length - 1; i++) {
      let t = new Date(0);
      t.setUTCSeconds(forecast[i].datetimeEpoch);
      let timestr = `${t.getMonth()}/${t.getDate()}`;

      forecast_imgs[i+1].src = "./img/weathericons/" + forecast[i].icon + ".svg";
      forecast_dates[i+1].innerText = timestr;
      forecast_highs[i+1].innerText = Math.round(forecast[i].tempmax) + " F";
      forecast_lows[i+1].innerText = Math.round(forecast[i].tempmin) + " F";
    }
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