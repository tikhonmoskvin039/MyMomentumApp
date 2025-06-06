function setHolidayBackground() {
  const img = document.querySelector("img.vacation");
  if (!img) return;

  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1; // Месяцы от 0 до 11

  let fileName = "";

  if ((day === 31 && month === 12) || (day === 1 && month === 1)) {
    fileName = "happy_NY.png";
  } else if (day === 25 && month === 12) {
    fileName = "merry_christmas.png";
  } else if (day === 16 && month === 6) {
    fileName = "happy_birthday.png";
  } else if (day === 8 && month === 3) {
    fileName = "international_womens_day.png";
  } else if (day === 1 && month === 12) {
    fileName = "first_winter_day.png";
  } else if (day === 1 && month === 3) {
    fileName = "spring_first_day.png";
  } else if (day === 1 && month === 6) {
    fileName = "summer_first_day.png";
  } else if (day === 1 && month === 9) {
    fileName = "autumn_first_day.png"; // !
  }

  if (fileName) {
    img.src = `./assets/transparent-backgroungs/${fileName}`;
    img.style.display = "block"; // Показываем элемент, если был скрыт
  } else {
    img.style.display = "none"; // Скрываем, если сегодня не праздник
  }
}

document.addEventListener("DOMContentLoaded", setHolidayBackground);
