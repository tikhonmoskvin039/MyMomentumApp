import { playList } from "./assets/consts.js";

let isPlay = false;
let playNum = 0;

const playPauseButton = document.querySelector(".play");
const audio = document.querySelector("audio");
const playPrev = document.querySelector(".play-prev");
const playNext = document.querySelector(".play-next");
const trackNames = document.querySelectorAll(".play-item");

// Инициализация названий треков
trackNames.forEach((item, index) => {
  item.textContent = playList[index].title;
});

// Функция для обновления активного класса
function updateActiveTrack(index) {
  trackNames.forEach((item) => item.classList.remove("item-active"));
  trackNames[index].classList.add("item-active");
}

// Функция для воспроизведения трека
function playTrack(index) {
  audio.src = playList[index].src;
  audio.load(); // принудительно загружаем
  audio.addEventListener("canplaythrough", function handler() {
    audio.removeEventListener("canplaythrough", handler); // одноразовое срабатывание
    audio.play();
    isPlay = true;
    playPauseButton.classList.add("pause");
    updateActiveTrack(index);
  });
}

// Обработчик клика на элемент списка
trackNames.forEach((item, index) => {
  item.addEventListener("click", () => {
    if (playNum === index) {
      if (isPlay) {
        audio.pause();
        isPlay = false;
        playPauseButton.classList.remove("pause");
      } else {
        audio.play();
        isPlay = true;
        playPauseButton.classList.add("pause");
      }
    } else {
      playNum = index;
      playTrack(playNum);
    }
  });
});

// Обработчик кнопки воспроизведения/паузы
playPauseButton.addEventListener("click", () => {
  if (!isPlay) {
    playTrack(playNum);
  } else {
    audio.pause();
    isPlay = false;
    playPauseButton.classList.remove("pause");
  }
});

// Обработчик кнопки предыдущего трека
playPrev.addEventListener("click", () => {
  playNum = (playNum - 1 + playList.length) % playList.length;
  playTrack(playNum);
});

// Обработчик кнопки следующего трека
playNext.addEventListener("click", () => {
  playNum = (playNum + 1) % playList.length;
  playTrack(playNum);
});

const volumeSlider = document.querySelector(".volume-slider");

// Обновляем громкость при изменении ползунка
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});

const progressBar = document.querySelector(".progress-bar");

// Обновление прогресс-бара при воспроизведении
audio.addEventListener("timeupdate", () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progressBar.value = progressPercent || 0;
});

// Позволяем пользователю перематывать трек
progressBar.addEventListener("input", () => {
  const seekTime = (progressBar.value / 100) * audio.duration;
  audio.currentTime = seekTime;
});

audio.addEventListener("ended", () => {
  playNum = (playNum + 1) % playList.length;
  playTrack(playNum);
});

const progressValue = document.getElementById("progressValue");
const volumeValue = document.getElementById("volumeValue");

// Обновление значения прогресса при воспроизведении
audio.addEventListener("timeupdate", () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progressBar.value = progressPercent || 0;
  progressValue.textContent = `${Math.floor(progressPercent) || 0}%`;
});

// Обновляем громкость и отображаем её значение
volumeSlider.addEventListener("input", () => {
  const volume = volumeSlider.value;
  audio.volume = volume;
  volumeValue.textContent = `${Math.round(volume * 100)}%`;
});

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60) || 0;
  const secs = Math.floor(seconds % 60) || 0;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

audio.addEventListener("timeupdate", () => {
  const current = audio.currentTime;
  const duration = audio.duration || 0;

  const progressPercent = (current / duration) * 100;
  progressBar.value = progressPercent || 0;

  progressValue.textContent = `${formatTime(current)} / ${formatTime(
    duration
  )}`;
});
