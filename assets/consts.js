const playList = [
  {
    title: "Ace of Base - All That She Wants",
    src: "../assets/sounds/Ace of Base - All That She Wants.mp3",
    duration: "03:34",
  },
  {
    title: "Ace of Base - The Sign",
    src: "../assets/sounds/Ace of Base - The Sign.mp3",
    duration: "03:08",
  },
  {
    title: "Blue - Curtain falls",
    src: "../assets/sounds/Blue - Curtain falls.mp3",
    duration: "03:40",
  },
  {
    title: "E-Type - I Just Wanna Be With You",
    src: "../assets/sounds/E-Type - I Just Wanna Be With You.mp3",
    duration: "03:46",
  },
  {
    title: "Jessica Jay - Casablanca",
    src: "../assets/sounds/Jessica Jay - Casablanca.mp3",
    duration: "06:20",
  },
  {
    title: "Manfred Mann's Earth Band - Angels At My Gate",
    src: "../assets/sounds/Manfred Mann's Earth Band - Angels At My Gate.mp3",
    duration: "04:50",
  },
  {
    title: "Jeff Wayne - The Eve of the War",
    src: "../assets/sounds/Jeff Wayne - The Eve of the War.mp3",
    duration: "04:25",
  },
  {
    title: "Scorpions - Hotel California",
    src: "../assets/sounds/Scorpions - Hotel California.mp3",
    duration: "06:13",
  },
  {
    title: "Scorpions - Here I Am (Send Me An Angel)",
    src: "../assets/sounds/Scorpions - Here I Am (Send Me An Angel).mp3",
    duration: "04:18",
  },
  {
    title: "Led Zeppelin - Stairway To Heaven (1971)",
    src: "../assets/sounds/Led Zeppelin - Stairway To Heaven (1971).mp3",
    duration: "08:05",
  },
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const rusMonths = [
  "Января",
  "Февраля",
  "Марта",
  "Апреля",
  "Мая",
  "Июня",
  "Июля",
  "Августа",
  "Сентября",
  "Октября",
  "Ноября",
  "Декабря",
];

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const rusDays = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
];

const cities = [
  "Алупка",
  "Амурск",
  "Анадырь",
  "Анапа",
  "Архангельск",
  "Астрахань",
  "Багратионовск",
  "Балтийск",
  "Барнаул",
  "Белгород",
  "Белозерск",
  "Белокуриха",
  "Берёзовский",
  "Болхов",
  "БольшойКамень",
  "Бор",
  "Борзя",
  "Борисоглебск",
  "Боровичи",
  "Боровск",
  "Бородино",
  "Братск",
  "Бронницы",
  "Брянск",
  "ВеликиеЛуки",
  "Великий Новгород",
  "Верхнеуральск",
  "Вилюйск",
  "Владивосток",
  "Владикавказ",
  "Владимир",
  "Волгоград",
  "Волгодонск",
  "Волгореченск",
  "Волжск",
  "Волжский",
  "Вологда",
  "Володарск",
  "Волоколамск",
  "Волосово",
  "Волхов",
  "Волчанск",
  "Вольск",
  "Воркута",
  "Воронеж",
  "Ворсма",
  "Воскресенск",
  "Воткинск",
  "Всеволожск",
  "Вуктыл",
  "Выборг",
  "Выкса",
  "Высоковск",
  "Высоцк",
  "Горно-Алтайск",
  "Горнозаводск",
  "Грозный",
  "Гудермес",
  "Гурьевск",
  "Гусев",
  "Домодедово",
  "Екатеринбург",
  "Зарайск",
  "Звенигород",
  "Зеленоградск",
  "Иваново",
  "Иркутск",
  "Искитим",
  "Йошкар-Ола",
  "Казань",
  "Калининград",
  "Калуга",
  "Карачаевск",
  "Кемерово",
  "Кингисепп",
  "Кисловодск",
  "Краснознаменск",
  "Курильск",
  "Курск",
  "Курчатов",
  "Ладушкин",
  "Ленинск-Кузнецкий",
  "Лесной",
  "Липецк",
  "Луга",
  "Луза",
  "Лукоянов",
  "Луховицы",
  "Лысково",
  "Магадан",
  "Магнитогорск",
  "Мамоново",
  "Махачкала",
  "Междуреченск",
  "Мезень",
  "Москва",
  "Можайск",
  "Мурманск",
  "Мытищи",
  "Новокузнецк",
  "Новороссийск",
  "Новосибирск",
  "Новотроицк",
  "Новоульяновск",
  "Новоуральск",
  "Ногинск",
  "Норильск",
  "Одинцово",
  "Озёрск",
  "Петрозаводск",
  "Петропавловск-Камчатский",
  "Пионерский",
  "Поронайск",
  "Правдинск",
  "Приморск",
  "Ростов",
  "Ростов-на-Дону",
  "Рязань",
  "Самара",
  "Санкт-Петербург",
  "Саранск",
  "Светлогорск",
  "Светлый",
  "Светогорск",
  "Севастополь",
  "Северо-Курильск",
  "Северодвинск",
  "Североморск",
  "Североуральск",
  "Серпухов",
  "Симферополь",
  "Славск",
  "Смоленск",
  "Советск",
  "Солнечногорск",
  "Сочи",
  "Тверь",
  "Тихвин",
  "Тихорецк",
  "Тобольск",
  "Тогучин",
  "Тольятти",
  "Томари",
  "Томмот",
  "Томск",
  "Тула",
  "Тюмень",
  "Ульяновск",
  "Уссурийск",
  "Уфа",
  "Феодосия",
  "Хабаровск",
  "Ханты-Мансийск",
  "Химки",
  "Чебоксары",
  "Челябинск",
  "Череповец",
  "Черняховск",
  "Электрогорск",
  "Электросталь",
  "Электроугли",
  "Южно-Сахалинск",
  "Южно-Сухокумск",
  "Южноуральск",
  "Якутск",
  "Ялта",
  "Ярославль",
];

export { cities, days, months, playList, rusDays, rusMonths };
