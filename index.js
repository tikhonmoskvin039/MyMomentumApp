import { cities, days, months, rusDays, rusMonths } from "./assets/consts.js";

let locale = "ru";

function getNameOfMonth() {
  let date = new Date();
  let dayNumber = date.getDay();

  document.querySelector(".date").textContent =
    rusDays[dayNumber] +
    ", " +
    date.getDate() +
    " " +
    rusMonths[date.getMonth()];
}

getNameOfMonth();

//-------------------------------QUOTES  API---------------------------------

const changeQuotesButton = document.querySelector(".change-quote");

const author = document.querySelector(".author");
const quote = document.querySelector(".quote");

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

let greeting;
function userGreetings() {
  let hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    greeting = "утро";
    document.querySelector(".greeting").textContent = `Доброе ${greeting},`;
  } else if (hour >= 12 && hour < 18) {
    greeting = "день";
    document.querySelector(".greeting").textContent = `Добрый ${greeting},`;
  } else if (hour >= 18 && hour < 24) {
    greeting = "вечер";
    document.querySelector(".greeting").textContent = `Добрый ${greeting},`;
  } else if (hour >= 0 && hour < 5) {
    greeting = "ночи";
    document.querySelector(".greeting").textContent = `Доброй ${greeting},`;
  } else if (hour === 0) {
    getTimeOfDay();
  }
}
userGreetings();
//-------------------------------LOCAL STORAGE---------------------------------
const userName = document.querySelector(".name");

function setLocalStorage() {
  localStorage.setItem("city", city.value);
  localStorage.setItem("name", userName.value);
  localStorage.setItem("toDo", TODOinputs.value);
  localStorage.setItem("tagSetted", tagSetted.value);
}
window.addEventListener("beforeunload", setLocalStorage);
function getLocalStorage() {
  if (localStorage.getItem("city")) {
    city.value = localStorage.getItem("city");
  }
  if (localStorage.getItem("name")) {
    userName.value =
      localStorage.getItem("name").length > 10
        ? localStorage.getItem("name").slice(0, 10) + "..."
        : localStorage.getItem("name");
  }
  if (localStorage.getItem("toDo")) {
    TODOinputs.value = localStorage.getItem("toDo");
  }
  if (localStorage.getItem("tagSetted")) {
    tagSetted.value = localStorage.getItem("tagSetted");
  }
  getWeather();
  hiddenInfo();
}
document.addEventListener("DOMContentLoaded", getLocalStorage);
//------------------------------/LOCAL STORAGE---------------------------------
//-------------------------------WEATHER API---------------------------------
const weather = document.querySelector(".weather");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
let city = document.querySelector(".city");
let city2 = document.querySelector(".city2");
let audio_position = document.querySelector(".audio_position");
let audio_volume = document.querySelector(".audio_volume");

function hiddenInfo() {
  if (city.value !== "") {
    city2.classList.add("transperent-block");
  } else if (city.value == "") {
    city2.classList.remove("transperent-block");
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

async function getWeather() {
  city.addEventListener("change", getWeather);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${locale}&appid=8448ec756fbb6beea60615c2a2cdae25&units=metric`;

  if (city.value == true) {
    city2.remove();
  }

  const res = await fetch(url);
  const data = await res.json();

  weatherIcon.className = "weather-icon owf";
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  wind.textContent = `${locale === "en" ? "Wind speed:" : "Скорость ветра:"} ${
    data.wind.speed
  } ${locale === "en" ? "m/s" : "м/с"}`;
  humidity.textContent = `${locale === "en" ? "Humidity:" : "Влажность:"} ${
    data.main.humidity
  }%`;
}

getWeather();

//------------------------------/WEATHER API---------------------------------

//------------------------------APP TRANSLATE---------------------------------
//------------------------------APP SETTINGS---------------------------------
const settings = document.querySelector(".settings");
const setTitle = document.querySelector(".settings_title");
const visibleBlocks = document.querySelector(".visible-blocks");

const timeBlock = document.querySelector(".b-time-tittle");
const dateBlock = document.querySelector(".b-date-tittle");
const greetingsBlock = document.querySelector(".b-hello-tittle");
const quotesBlock = document.querySelector(".b-quote-tittle");
const weatherBlock = document.querySelector(".b-weather-tittle");
const playerBlock = document.querySelector(".b-player-tittle");
const toDoBlock = document.querySelector(".b-todo-tittle");
const linksBlock = document.querySelector(".b-link-tittle");
const contactsBlock = document.querySelector(".b-contact-tittle");
const toDoSeted = document.querySelector(".b-todo-seted");

const popupBlock = document.querySelector(".blockPopup");
const blure = document.querySelector(".blure");
const tagSetted = document.querySelector(".tag-seted");
const imgSetted = document.querySelector(".img-seted");
const imgTitle = document.querySelector(".img-tittle");
const centralClock = document.querySelector(".time");

const allSettings = document.querySelectorAll(".settings-seted");
const centralDate = document.querySelector(".date");
const greetingContainer = document.querySelector(".greeting-container");
const quoteOfTheDay = document.querySelector(".quoteOfTheDay");
const player = document.querySelector(".player");
const todoTable = document.querySelector(".toDoList");
const toDoDiv = document.querySelector(".toDoDive");

const TODOinputs = document.querySelector(".toDoInput");

for (let i = 0; i < allSettings.length; i++) {
  allSettings[i].onclick = () => {
    if (!allSettings[i].classList.contains("is-hide")) {
      allSettings[i].classList.add("is-hide");
      allSettings[i].textContent = "Hide";
    } else if (allSettings[i].classList.contains("is-hide")) {
      allSettings[i].classList.remove("is-hide");
      allSettings[i].textContent = "Show";
    }
    if (i === 1) {
      centralClock.classList.toggle("transperent-block");
    } else if (i === 2) {
      centralDate.classList.toggle("transperent-block");
    } else if (i === 3) {
      greetingContainer.classList.toggle("transperent-block");
    } else if (i === 4) {
      quoteOfTheDay.classList.toggle("transperent-block");
      changeQuotesButton.classList.toggle("transperent-block");
    } else if (i === 5) {
      weather.classList.toggle("transperent-block");
    } else if (i === 6) {
      player.classList.toggle("transperent-block");
    } else if (i === 7) {
      todoTable.style.visibility = "visible";
      allSettings[i].textContent = "Show";
    } else if (i === 8) {
      languageSelector.classList.toggle("transperent-block");
    }
  };
}

settings.style.backgroundImage = "url(/assets/svg/settings-778.svg)";

settings.onclick = () => {
  popupBlock.style.visibility = "visible";
  popupBlock.classList.remove("transperent-settings");
  blure.style.visibility = "visible";
  tagSetted.style.visibility = "hidden";
};

blure.addEventListener("click", () => {
  popupBlock.style.visibility = "hidden";
  blure.style.visibility = "hidden";
  tagSetted.style.visibility = "hidden";
  popupBlock.classList.toggle("transperent-settings");
  imgSetted.textContent = "GitHub";
});

imgSetted.addEventListener("click", () => {
  if ((popupBlock.style.visibility = "visible")) {
    tagSetted.style.visibility = "visible";
    imgSetted.textContent = "Unsplash API";
    tagSetted.style.background = "transparent";
    tagSetted.style.color = "white";
  } else {
    imgSetted.style.visibility = "hidden";
  }
});

const closeToDo = document.querySelector(".close");

closeToDo.addEventListener("click", () => {
  todoTable.style.visibility = "hidden";
  toDoSeted.classList.add("is-hide");
  toDoSeted.textContent = "Hide";
});

//-----------------------------/APP SETTINGS---------------------------------

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

const languageSelector = document.querySelector(".dropbtn");
const rus = document.querySelector(".russian");
const eng = document.querySelector(".english");

rus.addEventListener("click", () => {
  for (let i = 0; i < allSettings.length; i++) {
    allSettings.forEach((a) => (a.textContent = "Показать"));
    allSettings.forEach((a) => {
      if (a.classList.contains("is-hide")) {
        a.textContent = "Скрыть";
      }
    });
    allSettings[i].onclick = () => {
      if (!allSettings[i].classList.contains("is-hide")) {
        allSettings[i].classList.add("is-hide");
        allSettings[i].textContent = "Скрыть";
      } else {
        allSettings[i].classList.remove("is-hide");
        allSettings[i].textContent = "Показать";
      }
      if (i === 1) {
        centralClock.classList.toggle("transperent-block");
      } else if (i === 2) {
        centralDate.classList.toggle("transperent-block");
      } else if (i === 3) {
        greetingContainer.classList.toggle("transperent-block");
      } else if (i === 4) {
        quoteOfTheDay.classList.toggle("transperent-block");
        changeQuotesButton.classList.toggle("transperent-block");
      } else if (i === 5) {
        weather.classList.toggle("transperent-block");
      } else if (i === 6) {
        player.classList.toggle("transperent-block");
      } else if (i === 7) {
        todoTable.style.visibility = "visible";
        allSettings[i].textContent = "Показать";
      } else if (i === 8) {
        languageSelector.classList.toggle("transperent-block");
      }
    };
  }
  allSettings[0].textContent = "GitHub";
  closeToDo.textContent = "ЗАКРЫТЬ Х";
  toDoDiv.textContent = "СПИСОК ДЕЛ";
});

rus.onclick = () => {
  locale = "ru";
  getWeather();
  if (document.querySelector(".greeting").textContent === "Good evening,") {
    document.querySelector(".greeting").textContent = "Добрый вечер,";
  } else if (
    document.querySelector(".greeting").textContent === "Good night,"
  ) {
    document.querySelector(".greeting").textContent = "Доброй ночи,";
  } else if (
    document.querySelector(".greeting").textContent === "Good morning,"
  ) {
    document.querySelector(".greeting").textContent = "Доброе утро,";
  } else if (
    document.querySelector(".greeting").textContent === "Good afternoon,"
  ) {
    document.querySelector(".greeting").textContent = "Добрый день,";
  }

  city.placeholder = "[Введите город]";
  userName.placeholder = "[Введите имя]";
  city2.textContent = "И узнайте погоду";
  languageSelector.textContent = "Выберите язык";
  rus.textContent = "Русский";
  eng.textContent = "Английский";
  audio_volume.textContent = "Громкость:";
  audio_position.textContent = "Позиция трека:";

  async function getQuotes() {
    const quotes = "quotes.json";
    const res = await fetch(quotes);
    const data = await res.json();

    let rand = Math.floor(Math.random() * data.length);

    quote.textContent = `"${data[rand].rustext}"`;
    author.textContent = `${data[rand].rusauthor}`;
  }
  getQuotes();

  changeQuotesButton.onclick = getQuotes;

  function getNameOfMonth() {
    const date = new Date();
    const dayNumber = date.getDay();
    const day = date.getDate();
    const month = date.getMonth();

    document.querySelector(".date").textContent =
      rusDays[dayNumber] + ", " + day + " " + rusMonths[month];
  }

  getNameOfMonth();

  setTitle.textContent = "Настройки";
  imgTitle.textContent = "Выберите источник изображений:";
  visibleBlocks.textContent = "Отображаемые блоки";
  timeBlock.textContent = "Время:";
  dateBlock.textContent = "Дата:";
  greetingsBlock.textContent = "Приветствие:";
  quotesBlock.textContent = "Фраза дня:";
  weatherBlock.textContent = "Погода:";
  playerBlock.textContent = "Плеер:";
  toDoBlock.textContent = "Список дел:";
  linksBlock.textContent = "Ссылки:";
  contactsBlock.textContent = "Контакты:";
};

eng.addEventListener("click", () => {
  for (let i = 0; i < allSettings.length; i++) {
    allSettings.forEach((a) => (a.textContent = "Show"));
    allSettings.forEach((a) => {
      if (a.classList.contains("is-hide")) {
        a.textContent = "Hide";
      }
    });
    allSettings[i].onclick = () => {
      if (!allSettings[i].classList.contains("is-hide")) {
        allSettings[i].classList.add("is-hide");
        allSettings[i].textContent = "Hide";
      } else {
        allSettings[i].classList.remove("is-hide");
        allSettings[i].textContent = "Show";
      }
      if (i === 1) {
        centralClock.classList.toggle("transperent-block");
      } else if (i === 2) {
        centralDate.classList.toggle("transperent-block");
      } else if (i === 3) {
        greetingContainer.classList.toggle("transperent-block");
      } else if (i === 4) {
        quoteOfTheDay.classList.toggle("transperent-block");
        changeQuotesButton.classList.toggle("transperent-block");
      } else if (i === 5) {
        weather.classList.toggle("transperent-block");
      } else if (i === 6) {
        player.classList.toggle("transperent-block");
      } else if (i === 7) {
        todoTable.style.visibility = "visible";
        allSettings[i].textContent = "Show";
      } else if (i === 8) {
        languageSelector.classList.toggle("transperent-block");
      }
    };
  }
  allSettings[0].textContent = "GitHub";
  closeToDo.textContent = "CLOSE Х";
  toDoDiv.textContent = "TO DO LIST";
});

eng.onclick = () => {
  locale = "en";
  getWeather();
  if (document.querySelector(".greeting").textContent === "Добрый вечер,") {
    document.querySelector(".greeting").textContent = "Good evening,";
  } else if (
    document.querySelector(".greeting").textContent === "Доброй ночи,"
  ) {
    document.querySelector(".greeting").textContent = "Good night,";
  } else if (
    document.querySelector(".greeting").textContent === "Доброе утро,"
  ) {
    document.querySelector(".greeting").textContent = "Good morning,";
  } else if (
    document.querySelector(".greeting").textContent === "Добрый день,"
  ) {
    document.querySelector(".greeting").textContent = "Good afternoon,";
  }

  city.placeholder = "[Enter city]";
  userName.placeholder = "[Enter name]";
  city2.textContent = "And see the forecast";
  languageSelector.textContent = "Choose language";
  rus.textContent = "Russian";
  eng.textContent = "English";
  audio_volume.textContent = "Volume";
  audio_position.textContent = "Position";

  async function getQuotes() {
    const quotes = "quotes.json";
    const res = await fetch(quotes);
    const data = await res.json();

    let rand = Math.floor(Math.random() * data.length);

    quote.textContent = `"${data[rand].text}"`;
    author.textContent = `${data[rand].author}`;
  }
  getQuotes();

  changeQuotesButton.onclick = getQuotes;

  getWeather();

  function getNameOfMonth() {
    const date = new Date();
    const dayNumber = date.getDay();
    const day = date.getDate();
    const month = date.getMonth();

    document.querySelector(".date").textContent =
      days[dayNumber] + ", " + day + " " + months[month];
  }

  getNameOfMonth();

  setTitle.textContent = "Settings";
  imgTitle.textContent = "Select images source:";
  visibleBlocks.textContent = "Visible blocks";
  timeBlock.textContent = "Time:";
  dateBlock.textContent = "Date:";
  greetingsBlock.textContent = "Greetings:";
  quotesBlock.textContent = "Quote of the Day:";
  weatherBlock.textContent = "Weather:";
  playerBlock.textContent = "Player:";
  toDoBlock.textContent = "Todo list:";
  linksBlock.textContent = "Link list:";
  contactsBlock.textContent = "Contact list:";
};

//-----------------------------/APP TRANSLATE---------------------------------
// -----------------------------AUTOCOMPLITE----------------------------------

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

autocomplete(document.getElementById("myInput"), cities);
