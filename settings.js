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

settings.style.backgroundImage = "url(/assets/svg/2344310.png)";

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


