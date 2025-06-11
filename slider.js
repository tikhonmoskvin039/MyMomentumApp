const body = document.querySelector("body");
const TOTAL_SLIDES = 235;
let slideIndex = getRandomNum(1, TOTAL_SLIDES);
let touchStartX = 0;
let touchEndX = 0;

function handleSwipe() {
  const swipeDistance = touchEndX - touchStartX;

  // Учитываем минимальную дистанцию для свайпа
  if (Math.abs(swipeDistance) < 50) return;

  if (swipeDistance < 0) {
    // Свайп влево — следующий слайд
    slideIndex = slideIndex < TOTAL_SLIDES ? slideIndex + 1 : 1;
  } else {
    // Свайп вправо — предыдущий слайд
    slideIndex = slideIndex > 1 ? slideIndex - 1 : TOTAL_SLIDES;
  }

  setBg(slideIndex);
}

// Навешиваем события на body
body.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

body.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

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
  img.src = `/assets/${folder}/${formattedIndex}.jpg?nocache=${Date.now()}`; // <--- ВАЖНО: абсолютный путь

  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`;
  };

  img.onerror = () => {
    console.error("Ошибка загрузки изображения:", img.src);
  };
}

window.addEventListener("DOMContentLoaded", () => {
  setBg();
});

setBg();

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
