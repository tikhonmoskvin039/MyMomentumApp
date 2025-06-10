import {
  changeQuotesButton,
  setLocale,
  getWeather,
  quote,
  author,
  currentYear,
} from "./index.js";
import { days, months, rusDays, rusMonths } from "./assets/consts.js";

function isMobile() {
  return window.matchMedia("(max-width: 768px)").matches;
}

// DOM-элементы
const settings = document.querySelector(".settings");
const visibleBlocks = document.querySelector(".visible-blocks");

const timeBlock = document.querySelector(".b-time-title");
const dateBlock = document.querySelector(".b-date-title");
const year = document.querySelector(".year");
const languageBlock = document.querySelector(".b-language-title");
const greetingsBlock = document.querySelector(".b-hello-title");
const quotesBlock = document.querySelector(".b-quote-title");
const weatherBlock = document.querySelector(".b-weather-title");
const playerBlock = document.querySelector(".b-player-title");
const centralClock = document.querySelector(".time");
const centralDate = document.querySelector(".date");
const centralYear = document.querySelector(".year");
const userName = document.querySelector(".name");
const greetingContainer = document.querySelector(".greeting-container");
const quoteOfTheDay = document.querySelector(".quoteOfTheDay");
const player = document.querySelector(".player");
const popupBlock = document.querySelector(".blockPopup");
const blure = document.querySelector(".blure");
const weather = document.querySelector(".weather");

const audioPositionLabel = document.querySelector(".audio_position_label");
const audioVolumeLabel = document.querySelector(".audio_volume_label");
const audioVolume = document.querySelector(".audio_volume");

const allSettings = document.querySelectorAll(".settings-seted");
const city = document.querySelector(".city");
const defaultText = document.querySelector(".defaultText");

const languageSelector = document.querySelector(".dropbtn");
const rus = document.querySelector(".russian");
const eng = document.querySelector(".english");

// Карта блоков для переключения видимости
const toggleMap = {
  1: () => centralClock.classList.toggle("transparent-block"),
  2: () => {
    centralDate.classList.toggle("transparent-block");
    centralYear.classList.toggle("transparent-block");
  },
  3: () => greetingContainer.classList.toggle("transparent-block"),
  4: () => {
    quoteOfTheDay.classList.toggle("transparent-block");
    changeQuotesButton.classList.toggle("transparent-block");
  },
  5: () => weather.classList.toggle("transparent-block"),
  6: () => player.classList.toggle("transparent-block"),
  7: () => languageSelector.classList.toggle("transparent-block"),
};

function setupSettingsToggle(locale) {
  const showText = locale === "ru" ? "Показать" : "Show";
  const hideText = locale === "ru" ? "Скрыть" : "Hide";

  allSettings.forEach((btn, index) => {
    btn.textContent = btn.classList.contains("is-hide") ? hideText : showText;

    btn.onclick = () => {
      const isHidden = btn.classList.contains("is-hide");
      btn.classList.toggle("is-hide");
      btn.textContent = isHidden ? showText : hideText;

      if (toggleMap[index + 1]) {
        toggleMap[index + 1]();
      }
    };
  });
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
  defaultText.textContent = isRu ? "И узнайте погоду" : "And see the forecast";
  languageSelector.textContent = isRu ? "Выберите язык" : "Choose language";
  rus.textContent = isRu ? "Русский" : "Russian";
  eng.textContent = isRu ? "Английский" : "English";

  audioVolumeLabel.textContent = isRu ? "Громкость:" : "Volume:";

  audioPositionLabel.textContent = isRu ? "Позиция трека:" : "Position:";

  visibleBlocks.textContent = isRu ? "Отображаемые блоки" : "Visible blocks";
  timeBlock.textContent = isRu ? "Время:" : "Time:";
  dateBlock.textContent = isRu ? "Дата:" : "Date:";
  year.textContent = isRu ? `${currentYear} года` : `${currentYear} year`;
  greetingsBlock.textContent = isRu ? "Приветствие:" : "Greetings:";
  quotesBlock.textContent = isRu ? "Фраза дня:" : "Quote of the Day:";
  weatherBlock.textContent = isRu ? "Погода:" : "Weather:";
  playerBlock.textContent = isRu ? "Плеер:" : "Player:";
  languageBlock.textContent = isRu ? "Язык:" : "Language:";

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
settings.style.backgroundImage = "url(/assets/svg/settings.png)";
settings.onclick = () => {
  popupBlock.style.visibility = "visible";
  popupBlock.classList.remove("transparent-settings");
  blure.style.visibility = "visible";
};

blure.onclick = () => {
  popupBlock.style.visibility = "hidden";
  blure.style.visibility = "hidden";
  popupBlock.classList.toggle("transparent-settings");
};

// Установить язык по умолчанию и инициализировать настройки
const initialLocale = "ru"; // или "en"
setLocale(initialLocale);
updateLanguageText(initialLocale);
setupSettingsToggle(initialLocale);

// При изменении размера окна — если изменился "режим", меняем картинку
window.addEventListener("resize", () => {
  if (isMobile()) {
    audioVolume.style.display = "none";
  } else {
    audioVolume.style.display = "block";
  }
});
