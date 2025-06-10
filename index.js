import { cities, rusDays, rusMonths } from "./assets/consts.js";

export const currentYear = new Date().getFullYear();

let locale = "ru";
export const getLocale = () => locale;
export const setLocale = (val) => {
  locale = val;
};

function setText(selector, value) {
  const el = document.querySelector(selector);
  if (el) el.textContent = value;
}

function getNameOfMonth() {
  let date = new Date();
  let dayNumber = date.getDay();

  document.querySelector(".date").textContent =
    rusDays[dayNumber] +
    ", " +
    date.getDate() +
    " " +
    rusMonths[date.getMonth()];
  document.querySelector(".year").textContent = currentYear;
}

getNameOfMonth();

//-------------------------------QUOTES  API---------------------------------

export const changeQuotesButton = document.querySelector(".change-quote");

export const author = document.querySelector(".author");
export const quote = document.querySelector(".quote");

async function getQuotes(locale) {
  const quotes = "quotes.json";
  const res = await fetch(quotes);
  const data = await res.json();

  const rand = Math.floor(Math.random() * data.length);

  // Выбор цитаты по языку
  if (locale === "ru") {
    quote.textContent = `"${data[rand].rustext}"`;
    author.textContent = `${data[rand].rusauthor}`;
  } else {
    quote.textContent = `"${data[rand].text}"`;
    author.textContent = `${data[rand].author}`;
  }
}

// Показываем первую цитату при загрузке
getQuotes(locale);

// При клике — меняем вручную
changeQuotesButton.onclick = () => getQuotes(locale);

// Меняем автоматически каждые 10 секунд
setInterval(() => {
  getQuotes(locale);
}, 10000);

//------------------------------/QUOTES  API---------------------------------

function getTimeOfDay() {
  const date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  // Форматируем значения
  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;

  // Обновляем текст на странице
  document.querySelector(".time").textContent =
    hours + ":" + minutes + ":" + seconds;

  // Вызываем повторно через 1 секунду
  setTimeout(getTimeOfDay, 1000);
}

// Запуск функции
getTimeOfDay();

const greetings = {
  ru: {
    morning: "Доброе утро,",
    day: "Добрый день,",
    evening: "Добрый вечер,",
    night: "Доброй ночи,",
  },
  en: {
    morning: "Good morning,",
    day: "Good afternoon,",
    evening: "Good evening,",
    night: "Good night,",
  },
};

function userGreetings() {
  const hour = new Date().getHours();
  const lang = getLocale();
  const g = greetings[lang];

  let greeting;
  if (hour >= 5 && hour < 12) greeting = g.morning;
  else if (hour >= 12 && hour < 18) greeting = g.day;
  else if (hour >= 18 && hour < 24) greeting = g.evening;
  else greeting = g.night;

  setText(".greeting", greeting);
}

userGreetings();

const nightTime = new Date();
nightTime.setHours(0); // Set hours to 10PM
nightTime.setMinutes(0); // Set minutes to 0
nightTime.setSeconds(0); // Set seconds to 0
nightTime.setMilliseconds(0); // Set milliseconds to 0

const morningTime = new Date();
morningTime.setHours(6); // Set hours to 10PM
morningTime.setMinutes(0); // Set minutes to 0
morningTime.setSeconds(0); // Set seconds to 0
morningTime.setMilliseconds(0); // Set milliseconds to 0

const dayTime = new Date();
dayTime.setHours(12); // Set hours to 10PM
dayTime.setMinutes(0); // Set minutes to 0
dayTime.setSeconds(0); // Set seconds to 0
dayTime.setMilliseconds(0); // Set milliseconds to 0

const eveningTime = new Date();
eveningTime.setHours(18); // Set hours to 10PM
eveningTime.setMinutes(0); // Set minutes to 0
eveningTime.setSeconds(0); // Set seconds to 0
eveningTime.setMilliseconds(0); // Set milliseconds to 0

const now = new Date();
let nightDelay = nightTime.getTime() - now.getTime();
let morningDelay = morningTime.getTime() - now.getTime();
let dayDelay = dayTime.getTime() - now.getTime();
let eveningDelay = eveningTime.getTime() - now.getTime();

if (nightDelay < 0) {
  nightDelay += 24 * 60 * 60 * 1000; // If time has passed, schedule for next day
}

if (morningDelay < 0) {
  morningDelay += 24 * 60 * 60 * 1000; // If time has passed, schedule for next day
}

if (dayDelay < 0) {
  dayDelay += 24 * 60 * 60 * 1000; // If time has passed, schedule for next day
}

if (eveningDelay < 0) {
  eveningDelay += 24 * 60 * 60 * 1000; // If time has passed, schedule for next day
}

setTimeout(userGreetings, nightDelay);
setTimeout(userGreetings, morningDelay);
setTimeout(userGreetings, dayDelay);
setTimeout(userGreetings, eveningDelay);
//-------------------------------LOCAL STORAGE---------------------------------
const userName = document.querySelector(".name");

function setLocalStorage() {
  localStorage.setItem("city", city.value);
  localStorage.setItem("name", userName.value);
}

window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem("city")) {
    city.value = localStorage.getItem("city");
  }
  if (!localStorage.getItem("name")) {
    userName.value = "Мам ❤️";
  } else if (localStorage.getItem("name")) {
    userName.value =
      localStorage.getItem("name").length > 10
        ? localStorage.getItem("name").slice(0, 10) + "..."
        : localStorage.getItem("name");
  }
  getWeather();
  hiddenInfo();
}

document.addEventListener("DOMContentLoaded", getLocalStorage);
//------------------------------/LOCAL STORAGE---------------------------------
//-------------------------------WEATHER API---------------------------------

const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const city = document.querySelector(".city");
const defaultText = document.querySelector(".defaultText");

function hiddenInfo() {
  if (city.value !== "") {
    defaultText.classList.add("transparent-block");
  } else if (city.value == "") {
    defaultText.classList.remove("transparent-block");
  }

  if (city.value == false) {
    weatherIcon.classList.add("hidden");
    temperature.classList.add("hidden");
    weatherDescription.classList.add("hidden");
    wind.classList.add("hidden");
    humidity.classList.add("hidden");
  } else {
    weatherIcon.classList.remove("hidden");
    temperature.classList.remove("hidden");
    weatherDescription.classList.remove("hidden");
    wind.classList.remove("hidden");
    humidity.classList.remove("hidden");
  }
}

city.addEventListener("input", hiddenInfo);

city.addEventListener("change", getWeather);

export async function getWeather() {
  if (!city.value) {
    // Очистка UI, если поле пустое
    weatherDescription.textContent = "";
    temperature.textContent = "";
    wind.textContent = "";
    humidity.textContent = "";
    weatherIcon.style.display = "none";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${locale}&appid=8448ec756fbb6beea60615c2a2cdae25&units=metric`;

  if (city.value == true) {
    defaultText.remove();
  }

  const res = await fetch(url);

  if (res.status === 404) {
    weatherDescription.textContent = "Город не найден";
    weatherDescription.style.color = "red";
    weatherDescription.style.fontWeight = "bold";
    weatherDescription.style.marginTop = "1rem";
    temperature.textContent = "";
    wind.textContent = "";
    humidity.textContent = "";
    weatherIcon.style.display = "none";
  }

  if (!res.ok) {
    throw new Error(`Ошибка ${res.status}`);
  }

  const data = await res.json();
  weatherDescription.style.marginTop = 0;
  weatherDescription.style.color = "black";
  weatherDescription.style.fontWeight = "normal";

  weatherIcon.className = "weather-icon owf";
  if (data.weather && Array.isArray(data.weather) && data.weather.length > 0) {
    weatherIcon.style.display = "flex";
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `${
      locale === "en" ? "Wind speed:" : "Скорость ветра:"
    } ${data.wind.speed} ${locale === "en" ? "m/s" : "м/с"}`;
    humidity.textContent = `${locale === "en" ? "Humidity:" : "Влажность:"} ${
      data?.main?.humidity
    }%`;
  } else {
    weatherDescription.textContent = "Город не найден";
    temperature.textContent = "";
    wind.textContent = "";
    humidity.textContent = "";
    weatherIcon.style.display = "none";
  }
}

getWeather();

//------------------------------/WEATHER API---------------------------------

// DOWNDROP ELEMENT

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Явно добавляем в глобальный объект window
window.myFunction = myFunction;

window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    let dropdowns = document.getElementsByClassName("dropdown-content");
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const dropdownButton = document.getElementById("dropdownButton");
  const dropdown = document.getElementById("myDropdown");

  dropdownButton.addEventListener("click", (e) => {
    e.stopPropagation(); // Чтобы не закрывалось тут же
    dropdown.classList.toggle("show");
  });

  window.addEventListener("click", (event) => {
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove("show");
    }
  });
});

//-----------------------------/APP TRANSLATE---------------------------------
// -----------------------------AUTOCOMPLITE----------------------------------

const myInput = document.getElementById("myInput");

// Блокировка ввода цифр с клавиатуры
myInput.addEventListener("keydown", function (e) {
  const allowedKeys = [
    "Backspace",
    "Delete",
    "ArrowLeft",
    "ArrowRight",
    "Tab",
    "Enter",
    "Escape",
  ];
  if (e.key >= "0" && e.key <= "9" && !e.ctrlKey && !e.metaKey) {
    e.preventDefault();
  }
  if (allowedKeys.includes(e.key)) {
    return; // Разрешаем служебные клавиши
  }
});

// Удаление цифр при вставке из буфера обмена
myInput.addEventListener("input", function () {
  this.value = this.value.replace(/\d/g, "");
});

function autocomplete(inp, arr) {
  let currentFocus;
  inp.addEventListener("input", function (e) {
    let a,
      b,
      i,
      val = this.value;
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    this.parentNode.appendChild(a);
    for (i = 0; i < arr.length; i++) {
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        b = document.createElement("DIV");
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        b.addEventListener("click", function (e) {
          inp.value = this.getElementsByTagName("input")[0].value;
          closeAllLists();

          // 💡 Вот это добавьте:
          getWeather(); // вызываем обновление погоды вручную
        });
        a.appendChild(b);
      }
    }
  });
  inp.addEventListener("keydown", function (e) {
    let x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      currentFocus++;
      addActive(x);
    } else if (e.keyCode == 38) {
      currentFocus--;
      addActive(x);
    } else if (e.keyCode == 13) {
      e.preventDefault();
      if (currentFocus > -1) {
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

autocomplete(myInput, cities);

/*How to capture the hide keyboard event on iOS using JavaScript
 * Without this snippet, the app container stayed in the up-scrolled position until page refresh.
 */
document.addEventListener("focusout", function (e) {
  window.scrollTo(0, 0);
});
