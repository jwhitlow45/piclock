const clock = document.getElementById("clock");

function runClock() {
  let t = new Date();

  const hours = String(t.getHours() % 12).padStart(2, '0');
  const mins = String(t.getMinutes()).padStart(2, '0');
  const secs = String(t.getSeconds()).padStart(2, '0');

  const timestr = `${hours}:${mins}:${secs}`;
  clock.innerText = timestr;
}

setInterval(function() {
  runClock()
}, 1000)