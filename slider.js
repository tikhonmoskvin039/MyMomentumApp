const body = document.querySelector("body");
const TOTAL_SLIDES = 235;
let slideIndex = getRandomNum(1, TOTAL_SLIDES);

// Проверка: мобилка или нет
function isMobile() {
  return window.matchMedia("(max-width: 768px)").matches;
}

// Генерация случайного числа в диапазоне
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Установка фоновой картинки по индексу
function setBg(index = slideIndex) {
  const formattedIndex = index.toString().padStart(2, "0");
  const folder = isMobile() ? "img_mobile" : "img";
  const img = new Image();
  img.src = `assets/${folder}/${formattedIndex}.jpg?${Date.now()}`;
  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`;
  };
}

window.onload = () => {
  setBg();
};

// Кнопки переключения
const nextButton = document.querySelector(".slide-next");
const prevButton = document.querySelector(".slide-prev");

nextButton.addEventListener("click", () => {
  slideIndex = slideIndex < TOTAL_SLIDES ? slideIndex + 1 : 1;
  setBg(slideIndex);
});

prevButton.addEventListener("click", () => {
  slideIndex = slideIndex > 1 ? slideIndex - 1 : TOTAL_SLIDES;
  setBg(slideIndex);
});

// Автоматическое переключение раз в 10 секунд
setInterval(() => {
  slideIndex = getRandomNum(1, TOTAL_SLIDES);
  setBg(slideIndex);
}, 10000);

// Обновляем фон при смене размера экрана (на случай перехода между mobile/desktop)
window.addEventListener("resize", () => {
  setBg(slideIndex);
});
