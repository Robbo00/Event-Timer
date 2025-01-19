const form = document.getElementById("event-form");
const countdownsContainer = document.getElementById("countdowns");

document.addEventListener("DOMContentLoaded", function () {
  for (let i = 0; i < localStorage.length; i++) {
    let name = localStorage.key(i);
    let date = localStorage.getItem(name);
    addTimer(name, new Date(date));
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let eventName = document.getElementById("event-name").value;
  let eventDate = document.getElementById("event-date").value;
  if (!eventName || !eventDate || new Date(eventDate) <= new Date()) {
    alert("uhh pick a valid date or name");
    return;
  }
  addTimer(eventName, new Date(eventDate));
  localStorage.setItem(eventName, eventDate);
});

function addTimer(name, date) {
  let div = document.createElement("div");
  div.className = "countdown";
  div.innerHTML = `
    <p>${name}: <span class="timer"></span></p>
    <button>Delete</button>
  `;
  let timerSpan = div.querySelector(".timer");
  let btn = div.querySelector("button");

  let int = setInterval(function () {
    let now = new Date();
    let diff = date - now;
    if (diff <= 0) {
      clearInterval(int);
      timerSpan.innerHTML = "🎉 Happy Holidays!";
    } else {
      let days = Math.floor(diff / (1000 * 60 * 60 * 24));
      let hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      let minutes = Math.floor((diff / (1000 * 60)) % 60);
      let seconds = Math.floor((diff / 1000) % 60);
      timerSpan.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
  }, 1000);

  btn.addEventListener("click", function () {
    clearInterval(int);
    div.remove();
    localStorage.removeItem(name);
  });

  countdownsContainer.appendChild(div);
}
