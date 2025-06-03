import {
  changeQuotesButton,
  setLocale,
  getWeather,
  quote,
  author,
} from "./index.js";
import { days, months, rusDays, rusMonths } from "./assets/consts.js";

// DOM-элементы
const settings = document.querySelector(".settings");
const toDoSeted = document.querySelector(".b-todo-seted");
const setTitle = document.querySelector(".settings_title");
const visibleBlocks = document.querySelector(".visible-blocks");

const timeBlock = document.querySelector(".b-time-tittle");
const dateBlock = document.querySelector(".b-date-tittle");
const greetingsBlock = document.querySelector(".b-hello-tittle");
const quotesBlock = document.querySelector(".b-quote-tittle");
const weatherBlock = document.querySelector(".b-weather-tittle");
const playerBlock = document.querySelector(".b-player-tittle");
const toDoBlock = document.querySelector(".b-todo-tittle");
const imgTitle = document.querySelector(".img-tittle");
const centralClock = document.querySelector(".time");
const centralDate = document.querySelector(".date");
const userName = document.querySelector(".name");
const greetingContainer = document.querySelector(".greeting-container");
const quoteOfTheDay = document.querySelector(".quoteOfTheDay");
const player = document.querySelector(".player");
const todoTable = document.querySelector(".toDoList");
const toDoDiv = document.querySelector(".toDoDive");
const popupBlock = document.querySelector(".blockPopup");
const blure = document.querySelector(".blure");
const tagSetted = document.querySelector(".tag-seted");
const imgSetted = document.querySelector(".img-seted");
const weather = document.querySelector(".weather");

const city = document.querySelector(".city");
const city2 = document.querySelector(".city2");
const audioPosition = document.querySelector(".audio_position");
const audioVolume = document.querySelector(".audio_volume");

const allSettings = document.querySelectorAll(".settings-seted");

const languageSelector = document.querySelector(".dropbtn");
const rus = document.querySelector(".russian");
const eng = document.querySelector(".english");
const closeToDo = document.querySelector(".close");

// Карта блоков для переключения видимости
const toggleMap = {
  1: () => centralClock.classList.toggle("transperent-block"),
  2: () => centralDate.classList.toggle("transperent-block"),
  3: () => greetingContainer.classList.toggle("transperent-block"),
  4: () => {
    quoteOfTheDay.classList.toggle("transperent-block");
    changeQuotesButton.classList.toggle("transperent-block");
  },
  5: () => weather.classList.toggle("transperent-block"),
  6: () => player.classList.toggle("transperent-block"),
  7: () => {
    const isVisible = todoTable.style.visibility === "visible";
    todoTable.style.visibility = isVisible ? "hidden" : "visible";
  },
  8: () => languageSelector.classList.toggle("transperent-block"),
};

function setupSettingsToggle(locale) {
  const showText = locale === "ru" ? "Показать" : "Show";
  const hideText = locale === "ru" ? "Скрыть" : "Hide";

  allSettings.forEach((btn, index) => {
    if (index === 0) return; // пропускаем кнопку GitHub

    btn.textContent = btn.classList.contains("is-hide") ? hideText : showText;

    btn.onclick = () => {
      const isHidden = btn.classList.contains("is-hide");
      btn.classList.toggle("is-hide");
      btn.textContent = isHidden ? showText : hideText;

      if (toggleMap[index]) {
        toggleMap[index]();

        // специальная логика для тудулиста
        if (index === 7) {
          todoTable.style.visibility = isHidden ? "visible" : "hidden";
        }
      }
    };
  });

  allSettings[0].textContent = "GitHub";
}

// Смена языка
function updateLanguageText(locale) {
  const isRu = locale === "ru";
  const greetingText = document.querySelector(".greeting").textContent;

  document.querySelector(".greeting").textContent = isRu
    ? convertGreetingToRu(greetingText)
    : convertGreetingToEn(greetingText);

  city.placeholder = isRu ? "[Введите город]" : "[Enter city]";
  userName.placeholder = isRu ? "[Введите имя]" : "[Enter name]";
  city2.textContent = isRu ? "И узнайте погоду" : "And see the forecast";
  languageSelector.textContent = isRu ? "Выберите язык" : "Choose language";
  rus.textContent = isRu ? "Русский" : "Russian";
  eng.textContent = isRu ? "Английский" : "English";
  audioVolume.textContent = isRu ? "Громкость:" : "Volume:";
  audioPosition.textContent = isRu ? "Позиция трека:" : "Position:";

  setTitle.textContent = isRu ? "Настройки" : "Settings";
  imgTitle.textContent = isRu
    ? "Выберите источник изображений:"
    : "Select images source:";
  visibleBlocks.textContent = isRu ? "Отображаемые блоки" : "Visible blocks";
  timeBlock.textContent = isRu ? "Время:" : "Time:";
  dateBlock.textContent = isRu ? "Дата:" : "Date:";
  greetingsBlock.textContent = isRu ? "Приветствие:" : "Greetings:";
  quotesBlock.textContent = isRu ? "Фраза дня:" : "Quote of the Day:";
  weatherBlock.textContent = isRu ? "Погода:" : "Weather:";
  playerBlock.textContent = isRu ? "Плеер:" : "Player:";
  toDoBlock.textContent = isRu ? "Список дел:" : "Todo list:";
  closeToDo.textContent = isRu ? "ЗАКРЫТЬ Х" : "CLOSE Х";
  toDoDiv.textContent = isRu ? "СПИСОК ДЕЛ" : "TO DO LIST";

  updateQuote(locale);
  updateDate(locale);
}

function convertGreetingToRu(text) {
  const map = {
    "Good evening,": "Добрый вечер,",
    "Good night,": "Доброй ночи,",
    "Good morning,": "Доброе утро,",
    "Good afternoon,": "Добрый день,",
  };
  return map[text] || text;
}

function convertGreetingToEn(text) {
  const map = {
    "Добрый вечер,": "Good evening,",
    "Доброй ночи,": "Good night,",
    "Доброе утро,": "Good morning,",
    "Добрый день,": "Good afternoon,",
  };
  return map[text] || text;
}

function updateQuote(locale) {
  async function getQuotes() {
    const res = await fetch("quotes.json");
    const data = await res.json();
    const rand = Math.floor(Math.random() * data.length);

    quote.textContent = `"${
      locale === "ru" ? data[rand].rustext : data[rand].text
    }"`;
    author.textContent =
      locale === "ru" ? data[rand].rusauthor : data[rand].author;
  }
  getQuotes();
  changeQuotesButton.onclick = getQuotes;
}

function updateDate(locale) {
  const date = new Date();
  const dayName =
    locale === "ru" ? rusDays[date.getDay()] : days[date.getDay()];
  const monthName =
    locale === "ru" ? rusMonths[date.getMonth()] : months[date.getMonth()];
  document.querySelector(
    ".date"
  ).textContent = `${dayName}, ${date.getDate()} ${monthName}`;
}

// Обработчики языка
rus.addEventListener("click", () => {
  setLocale("ru");
  getWeather();
  updateLanguageText("ru");
  setupSettingsToggle("ru");
});

eng.addEventListener("click", () => {
  setLocale("en");
  getWeather();
  updateLanguageText("en");
  setupSettingsToggle("en");
});

// Настройки
settings.style.backgroundImage = "url(/assets/svg/2344310.png)";
settings.onclick = () => {
  popupBlock.style.visibility = "visible";
  popupBlock.classList.remove("transperent-settings");
  blure.style.visibility = "visible";
  tagSetted.style.visibility = "hidden";
};

blure.onclick = () => {
  popupBlock.style.visibility = "hidden";
  blure.style.visibility = "hidden";
  tagSetted.style.visibility = "hidden";
  popupBlock.classList.toggle("transperent-settings");
  imgSetted.textContent = "GitHub";
};

imgSetted.onclick = () => {
  tagSetted.style.visibility = "visible";
  imgSetted.textContent = "Unsplash API";
  tagSetted.style.background = "transparent";
  tagSetted.style.color = "white";
};

closeToDo.onclick = () => {
  todoTable.style.visibility = "hidden";
  toDoSeted.classList.add("is-hide");
  const locale = localStorage.getItem("locale") || "ru";
  toDoSeted.textContent = locale === "ru" ? "Показать" : "Show";
};

// Установить язык по умолчанию и инициализировать настройки
const initialLocale = "ru"; // или "en"
setLocale(initialLocale);
updateLanguageText(initialLocale);
setupSettingsToggle(initialLocale);
