const body = document.querySelector("body");
let slideIndex = getRandomNum(1, 128);
const totalSlides = 128;

// Генерация случайного числа в заданном диапазоне
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Установка фоновой картинки по индексу
function setBg(index = slideIndex) {
  const formattedIndex = index.toString().padStart(2, "0");
  const img = new Image();
  img.src = `assets/img/${formattedIndex}.jpg`;
  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`;
  };
}

setBg();

// Кнопки переключения
const nextButton = document.querySelector(".slide-next");
const prevButton = document.querySelector(".slide-prev");

// Следующий слайд
nextButton.addEventListener("click", () => {
  slideIndex = slideIndex < totalSlides ? slideIndex + 1 : 1;
  setBg(slideIndex);
});

// Предыдущий слайд
prevButton.addEventListener("click", () => {
  slideIndex = slideIndex > 1 ? slideIndex - 1 : totalSlides;
  setBg(slideIndex);
});

// 🔁 Автоматическое переключение картинки каждые 2 секунды
setInterval(() => {
  slideIndex = getRandomNum(1, totalSlides);
  setBg(slideIndex);
}, 10000);
