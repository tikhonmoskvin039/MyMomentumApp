let isPlay = false
let playNum = 0


function getTimeOfDay() {
    let date = new Date()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()

    let day = date.getUTCDate() + date.getMonth()

    if (hours < 10) hours = "0" + hours
    if (minutes < 10) minutes = "0" + minutes
    if (seconds < 10) seconds = "0" + seconds
    if (hours === 0) getTimeOfDay() && (greeting = "night") && getNameOfMounth() + 1

    document.querySelector('.time').textContent = hours + ":" + minutes + ":" + seconds
    setTimeout("getTimeOfDay()", 1000)
}
getTimeOfDay()

let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
let rusMonths = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
let rusDays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']

function getNameOfMounth() {
    let date = new Date()
    let dayNumber = date.getDay()
    document.querySelector('.date').textContent = days[dayNumber] + ', ' + months[date.getMonth()] + ' ' + date.getDate()
};

getNameOfMounth()


let spanGreetings = document.querySelector('.greeting')

let greeting
function userGreetings() {
    let hour = new Date().getHours()
    if (hour >= 5 && hour < 12) {
        greeting = "morning"
    }
    else if (hour >= 12 && hour < 18) {
        greeting = "afternoon"
    }
    else if (hour >= 18 && hour < 24) {
        greeting = "evening"
    }
    else if (hour >= 0 && hour < 5) {
        greeting = "night"
    } else if (hour === 0) {
        getTimeOfDay()
    }
    document.querySelector('.greeting').textContent = `Good ${greeting},`
}
userGreetings()
//-------------------------------LOCAL STORAGE---------------------------------
const userName = document.querySelector('.name')

function setLocalStorage() {
    localStorage.setItem('city', city.value);
    localStorage.setItem('name', userName.value);
    localStorage.setItem('toDo', TODOinputs.value);
    localStorage.setItem('tagSetted', tagSetted.value);
}
window.addEventListener('beforeunload', setLocalStorage)
function getLocalStorage() {
    if (localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');
    }
    if (localStorage.getItem('name')) {
        userName.value = localStorage.getItem('name');
    }
    if (localStorage.getItem('toDo')) {
        TODOinputs.value = localStorage.getItem('toDo');
    }
    if (localStorage.getItem('tagSetted')) {
        tagSetted.value = localStorage.getItem('tagSetted');
    }
    getWeather()
    hiddenInfo()
}
document.addEventListener("DOMContentLoaded", getLocalStorage);
//------------------------------/LOCAL STORAGE---------------------------------
//------------------------------SLIDER JS--------------------------------------
const body = document.querySelector('body')
body.style.backgroundImage = `url(https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${greeting}/${getRandomNum(1, 20).toString().padStart(2, "0")}.jpg`

function getRandomNum(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    let targetUrl = Math.floor(Math.random() * (max - min + 1)) + min
    if (targetUrl >= 10) {
        return targetUrl
    } else {
        return `0${targetUrl}`
    }
}

function setBg() {
    const timeOfDay = getTimeOfDay()
    const bgNum = getRandomNum(1, 20)
    const img = new Image();
    img.onload = () => {
        body.style.backgroundImage = `url("https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${greeting}/${getRandomNum(1, 20)}.jpg")`
    }
}
setBg()


const nextButton = document.querySelector('.slide-next')
function getSlideNext() {
    nextButton.onclick = () => {
        body.style.backgroundImage = `url(https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${greeting}/${getRandomNum(1, 20)}.jpg)`
    }, 2000
}
setTimeout(getSlideNext, 2000)

const prevButton = document.querySelector('.slide-prev')
function getSlidePrev() {
    prevButton.onclick = () => {
        body.style.backgroundImage = `url(https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${greeting}/${getRandomNum(1, 20)}.jpg)`
    }, 2000
}
setTimeout(getSlidePrev, 2000)

//------------------------------/SLIDER JS-------------------------------------
//-------------------------------WEATHER API---------------------------------
const weather = document.querySelector('.weather')
const weatherIcon = document.querySelector('.weather-icon')
const temperature = document.querySelector('.temperature')
const weatherDescription = document.querySelector('.weather-description')
const wind = document.querySelector('.wind')
const humidity = document.querySelector('.humidity')
let city = document.querySelector('.city')
let city2 = document.querySelector('.city2')

function hiddenInfo() {
    if (city.value !== '') {
        city2.classList.add('transperent-block')
    } else if (city.value == '') {
        city2.classList.remove('transperent-block')
    }

    if (city.value == false) {
        weatherIcon.classList.add('hidden')
        temperature.classList.add('hidden')
        weatherDescription.classList.add('hidden')
        wind.classList.add('hidden')
        humidity.classList.add('hidden')
    }
    else {
        weatherIcon.classList.remove('hidden')
        temperature.classList.remove('hidden')
        weatherDescription.classList.remove('hidden')
        wind.classList.remove('hidden')
        humidity.classList.remove('hidden')
    }
}
city.addEventListener("input", hiddenInfo);


async function getWeather() {
    city.addEventListener('change', getWeather)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=8448ec756fbb6beea60615c2a2cdae25&units=metric`;

    if (city.value == true) {
        city2.remove()
    }

    const res = await fetch(url)
    const data = await res.json()

    weatherIcon.className = 'weather-icon owf'
    weatherIcon.classList.add(`owf-${data.weather[0].id}`)
    temperature.textContent = `${Math.round(data.main.temp)}°C`
    weatherDescription.textContent = data.weather[0].description
    wind.textContent = `Wind speed: ${data.wind.speed} m/s`
    humidity.textContent = `Humidity: ${data.main.humidity}%`
}

getWeather()

//------------------------------/WEATHER API---------------------------------
//-------------------------------QUOTES  API---------------------------------

const changeQuotesButton = document.querySelector('.change-quote')


const author = document.querySelector('.author')
const quote = document.querySelector('.quote')

async function getQuotes() {
    const quotes = 'quotes.json';
    const res = await fetch(quotes);
    const data = await res.json();

    let rand = Math.floor(Math.random() * data.length);

    quote.textContent = `"${data[rand].text}"`
    author.textContent = `${data[rand].author}`
}
getQuotes();

changeQuotesButton.onclick = getQuotes



//------------------------------/QUOTES  API---------------------------------
//------------------------------AUDIO PLAYER---------------------------------
//-----------------------------PLAYLIST--------------------------------------
// import playList from './assets/playList.js';
// console.log(playList);

const playList = [
    {
        title: 'Aqua Caelestis',
        rusTitle: 'Гармония воды',
        src: '../assets/sounds/Aqua Caelestis.mp3',
        duration: '00:58'
    }, {
        title: 'River Flows In You',
        rusTitle: 'Река течёт в тебе',
        src: '../assets/sounds/River Flows In You.mp3',
        duration: '03:50'
    },
    {
        title: 'Summer Wind',
        rusTitle: 'Летний ветер',
        src: '../assets/sounds/Summer Wind.mp3',
        duration: '05:05'
    },
    {
        title: 'Ennio Morricone',
        rusTitle: 'Эннио Морриконе',
        src: '../assets/sounds/Ennio Morricone.mp3',
        duration: '05:03'
    }
]

const playPauseButton = document.querySelector('.play')
const audio = document.querySelector('audio');
const playPrev = document.querySelector('.play-prev')
const playNext = document.querySelector('.play-next')
const trackNames = document.querySelectorAll('.play-item')

// function playAudio() {
//     if (!isPlay) {
//         audio.src = playList[playNum].src;
//         audio.currentTime = 0;
//         audio.play();
//     } else {
//         audio.pause();
//     }
// }

for (let i = 0; i < trackNames.length; i++) {
    trackNames[i].textContent = playList[i].title

    playPauseButton.onclick = () => {
        playPauseButton.classList.toggle('pause')
        if (playPauseButton.classList.contains('pause')) {
            audio.play()
            isPlay = true
            trackNames.classList.toggle('item-active')
        } else if (!playPauseButton.classList.contains('pause')) {
            audio.pause();
            isPlay = false
            trackNames.classList.toggle('item-active')
        }
    }
}


function playPrevTrack() {
    playPauseButton.classList.add('pause')
    if (playNum > 0) {
        playNum--
        audio.src = playList[playNum].src
        trackNames[playNum].classList.toggle('item-active')
        trackNames[playNum + 1].classList.remove('item-active')
        audio.play()
        playPauseButton.classList.add('pause')
    } else if (playNum == 0) {
        playNum = 3
        trackNames[playNum].classList.toggle('item-active')
        trackNames[0].classList.remove('item-active')
        audio.src = playList[3].src
        audio.play()
        playPauseButton.classList.add('pause')
    }
    console.log('playPrev', playNum)
}
playPrev.addEventListener('click', playPrevTrack)

function playNextTrack() {
    if (playNum < 3) {
        playNum++
        audio.src = playList[playNum].src
        audio.play()
        playPauseButton.classList.add('pause')
        trackNames[playNum].classList.add('item-active')

        trackNames[playNum - 1].classList.remove('item-active')
    }
    else if (playNum == 3) {
        playNum = 0
        audio.src = playList[0].src
        trackNames[3].classList.remove('item-active')
        trackNames[0].classList.add('item-active')
        audio.play()
        playPauseButton.classList.add('pause')
    }
    console.log('playNext', playNum)
}
playNext.addEventListener('click', playNextTrack)
//-----------------------------/AUDIO PLAYER---------------------------------
//------------------------------APP TRANSLATE---------------------------------


// DOWNDROP ELEMENT

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show")
}

window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        let dropdowns = document.getElementsByClassName("dropdown-content")
        let i
        for (i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i]
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show')
            }
        }
    }
}

const languageSelector = document.querySelector('.dropbtn')
const rus = document.querySelector('.russian')
const eng = document.querySelector('.english')

rus.addEventListener('click', () => {
    for (let i = 0; i < allSettings.length; i++) {
        allSettings.forEach(a => a.textContent = 'Показать')
        allSettings.forEach(a => {
            if (a.classList.contains('is-hide')) {
                a.textContent = 'Скрыть'
            }
        })
        allSettings[i].onclick = () => {
            if (!allSettings[i].classList.contains('is-hide')) {
                allSettings[i].classList.add('is-hide')
                allSettings[i].textContent = 'Скрыть'
            } else {
                allSettings[i].classList.remove('is-hide')
                allSettings[i].textContent = 'Показать'
            }
            if (i === 1) {
                centralClock.classList.toggle('transperent-block')
            } else if (i === 2) {
                centralDate.classList.toggle('transperent-block')
            } else if (i === 3) {
                greetingContainer.classList.toggle('transperent-block')
            } else if (i === 4) {
                quoteOfTheDay.classList.toggle('transperent-block')
                changeQuotesButton.classList.toggle('transperent-block')
            } else if (i === 5) {
                weather.classList.toggle('transperent-block')
            } else if (i === 6) {
                player.classList.toggle('transperent-block')
            } else if (i === 7) {
                todoTable.style.visibility = 'visible'
                allSettings[i].textContent = 'Показать'
            } else if (i === 8) {
                languageSelector.classList.toggle('transperent-block')
            }
        }
    }
    allSettings[0].textContent = 'GitHub'
    closeToDo.textContent = 'ЗАКРЫТЬ Х'
    toDoDiv.textContent = 'СПИСОК ДЕЛ'
})

rus.onclick = () => {
    if (document.querySelector('.greeting').textContent === 'Good evening,') {
        document.querySelector('.greeting').textContent = 'Добрый вечер,'
    } else if (document.querySelector('.greeting').textContent === 'Good night,') {
        document.querySelector('.greeting').textContent = 'Доброй ночи,'
    } else if (document.querySelector('.greeting').textContent === 'Good morning,') {
        document.querySelector('.greeting').textContent = 'Доброе утро,'
    } else if (document.querySelector('.greeting').textContent === 'Good afternoon,') {
        document.querySelector('.greeting').textContent = 'Добрый день,'
    }

    city.placeholder = '[Введите город]'
    userName.placeholder = '[Введите имя]'
    city2.textContent = 'И посмотрите погоду'
    languageSelector.textContent = 'Выберите язык'
    rus.textContent = 'Русский'
    eng.textContent = 'Английский'

    async function getQuotes() {
        const quotes = 'quotes.json';
        const res = await fetch(quotes);
        const data = await res.json();

        let rand = Math.floor(Math.random() * data.length);

        quote.textContent = `"${data[rand].rustext}"`
        author.textContent = `${data[rand].rusauthor}`
    }
    getQuotes();

    changeQuotesButton.onclick = getQuotes

    async function getWeather() {
        const city = document.querySelector('.city')
        let city2 = document.querySelector('.city2')
        city.addEventListener('change', getWeather)
        const url = (`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=8448ec756fbb6beea60615c2a2cdae25&units=metric`);

        if (city.value == true) {
            city2.remove()
        }

        const res = await fetch(url)
        const data = await res.json()

        weatherIcon.className = 'weather-icon owf'
        weatherIcon.classList.add(`owf-${data.weather[0].id}`)
        temperature.textContent = `${Math.round(data.main.temp)}°C`
        weatherDescription.textContent = data.weather[0].description
        wind.textContent = `Скорость ветра: ${data.wind.speed} м/с`
        humidity.textContent = `Влажность: ${data.main.humidity}%`
    }

    getWeather()

    function getNameOfMounth() {
        let date = new Date()
        let dayNumber = date.getDay()

        if ((date.getMonth() >= 0 && date.getMonth()) <= 1 || (date.getMonth() >= 3 && date.getMonth() <= 6) || (date.getMonth() >= 8 && date.getMonth() <= 11)) {
            document.querySelector('.date').textContent = rusDays[dayNumber] + ', ' + date.getDate() + ' ' + rusMonths[date.getMonth()] + 'я'
        } else {
            document.querySelector('.date').textContent = rusDays[dayNumber] + ', ' + date.getDate() + ' ' + rusMonths[date.getMonth()] + 'а'
        }
    }

    getNameOfMounth()


    setTitle.textContent = 'Настройки'
    imgTitle.textContent = 'Выберите источник изображений:'
    visibleBlocks.textContent = 'Отображаемые блоки'
    timeBlock.textContent = 'Время:'
    dateBlock.textContent = 'Дата:'
    greetingsBlock.textContent = 'Приветствие:'
    quotesBlock.textContent = 'Фраза дня:'
    weatherBlock.textContent = 'Погода:'
    playerBlock.textContent = 'Плеер:'
    toDoBlock.textContent = 'Список дел:'
    linksBlock.textContent = 'Ссылки:'
    contactsBlock.textContent = 'Контакты:'
}

eng.addEventListener('click', () => {
    for (let i = 0; i < allSettings.length; i++) {
        allSettings.forEach(a => a.textContent = 'Show')
        allSettings.forEach(a => {
            if (a.classList.contains('is-hide')) {
                a.textContent = 'Hide'
            }
        })
        allSettings[i].onclick = () => {
            if (!allSettings[i].classList.contains('is-hide')) {
                allSettings[i].classList.add('is-hide')
                allSettings[i].textContent = 'Hide'
            } else {
                allSettings[i].classList.remove('is-hide')
                allSettings[i].textContent = 'Show'
            }
            if (i === 1) {
                centralClock.classList.toggle('transperent-block')
            } else if (i === 2) {
                centralDate.classList.toggle('transperent-block')
            } else if (i === 3) {
                greetingContainer.classList.toggle('transperent-block')
            } else if (i === 4) {
                quoteOfTheDay.classList.toggle('transperent-block')
                changeQuotesButton.classList.toggle('transperent-block')
            } else if (i === 5) {
                weather.classList.toggle('transperent-block')
            } else if (i === 6) {
                player.classList.toggle('transperent-block')
            } else if (i === 7) {
                todoTable.style.visibility = 'visible'
                allSettings[i].textContent = 'Show'
            } else if (i === 8) {
                languageSelector.classList.toggle('transperent-block')
            }
        }
    }
    allSettings[0].textContent = 'GitHub'
    closeToDo.textContent = 'CLOSE Х'
    toDoDiv.textContent = 'TO DO LIST'
})

eng.onclick = () => {
    if (document.querySelector('.greeting').textContent === 'Добрый вечер,') {
        document.querySelector('.greeting').textContent = 'Good evening,'
    } else if (document.querySelector('.greeting').textContent === 'Доброй ночи,') {
        document.querySelector('.greeting').textContent = 'Good night,'
    } else if (document.querySelector('.greeting').textContent === 'Доброе утро,') {
        document.querySelector('.greeting').textContent = 'Good morning,'
    } else if (document.querySelector('.greeting').textContent === 'Добрый день,') {
        document.querySelector('.greeting').textContent = 'Good afternoon,'
    }

    city.placeholder = '[Enter city]'
    userName.placeholder = '[Enter name]'
    city2.textContent = 'And see the forecast'
    languageSelector.textContent = 'Choose language'
    rus.textContent = 'Russian'
    eng.textContent = 'English'

    async function getQuotes() {
        const quotes = 'quotes.json'
        const res = await fetch(quotes)
        const data = await res.json()

        let rand = Math.floor(Math.random() * data.length)

        quote.textContent = `"${data[rand].text}"`
        author.textContent = `${data[rand].author}`
    }
    getQuotes();

    changeQuotesButton.onclick = getQuotes

    async function getWeather() {
        const city = document.querySelector('.city')
        let city2 = document.querySelector('.city2')
        city.addEventListener('change', getWeather)
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=8448ec756fbb6beea60615c2a2cdae25&units=metric`;

        if (city.value == true) {
            city2.remove()
        }

        const res = await fetch(url)
        const data = await res.json()

        weatherIcon.className = 'weather-icon owf'
        weatherIcon.classList.add(`owf-${data.weather[0].id}`)
        temperature.textContent = `${Math.round(data.main.temp)}°C`
        weatherDescription.textContent = data.weather[0].description
        wind.textContent = `Wind speed: ${data.wind.speed} m/s`
        humidity.textContent = `Humidity: ${data.main.humidity}%`
    }

    getWeather()

    function getNameOfMounth() {
        let date = new Date()
        let dayNumber = date.getDay()

        document.querySelector('.date').textContent = days[dayNumber] + ', ' + months[date.getMonth()] + ' ' + date.getDate()
    };

    getNameOfMounth()

    setTitle.textContent = 'Settings'
    imgTitle.textContent = 'Select images source:'
    visibleBlocks.textContent = 'Visible blocks'
    timeBlock.textContent = 'Time:'
    dateBlock.textContent = 'Date:'
    greetingsBlock.textContent = 'Greetings:'
    quotesBlock.textContent = 'Quote of the Day:'
    weatherBlock.textContent = 'Weather:'
    playerBlock.textContent = 'Player:'
    toDoBlock.textContent = 'Todo list:'
    linksBlock.textContent = 'Link list:'
    contactsBlock.textContent = 'Contact list:'
}
//-----------------------------/APP TRANSLATE---------------------------------
//------------------------------APP SETTINGS---------------------------------
const settings = document.querySelector('.settings')
const setTitle = document.querySelector('.settings_title')
const visibleBlocks = document.querySelector('.visible-blocks')

const timeBlock = document.querySelector('.b-time-tittle')
const dateBlock = document.querySelector('.b-date-tittle')
const greetingsBlock = document.querySelector('.b-hello-tittle')
const quotesBlock = document.querySelector('.b-quote-tittle')
const weatherBlock = document.querySelector('.b-weather-tittle')
const playerBlock = document.querySelector('.b-player-tittle')
const toDoBlock = document.querySelector('.b-todo-tittle')
const linksBlock = document.querySelector('.b-link-tittle')
const contactsBlock = document.querySelector('.b-contact-tittle')
const toDoSeted = document.querySelector('.b-todo-seted')

const popupBlock = document.querySelector('.blockPopup')
const blure = document.querySelector('.blure')
const tagSetted = document.querySelector('.tag-seted')
const imgSetted = document.querySelector('.img-seted')
const imgTitle = document.querySelector('.img-tittle')
const centralClock = document.querySelector('.time')

const allSettings = document.querySelectorAll('.settings-seted')
const allPageBlocks = document.querySelectorAll('.settings-title')
const centralDate = document.querySelector('.date')
const greetingContainer = document.querySelector('.greeting-container')
const quoteOfTheDay = document.querySelector('.quoteOfTheDay')
const player = document.querySelector('.player')
const todoTable = document.querySelector('.toDoList')
const toDoDiv = document.querySelector('.toDoDive')

const TODOinputs = document.querySelector('.toDoInput')



for (let i = 0; i < allSettings.length; i++) {
    allSettings[i].onclick = () => {
        if (!allSettings[i].classList.contains('is-hide')) {
            allSettings[i].classList.add('is-hide')
            allSettings[i].textContent = 'Hide'
        } else if (allSettings[i].classList.contains('is-hide')) {
            allSettings[i].classList.remove('is-hide')
            allSettings[i].textContent = 'Show'
        }
        if (i === 1) {
            centralClock.classList.toggle('transperent-block')
        } else if (i === 2) {
            centralDate.classList.toggle('transperent-block')
        } else if (i === 3) {
            greetingContainer.classList.toggle('transperent-block')
        } else if (i === 4) {
            quoteOfTheDay.classList.toggle('transperent-block')
            changeQuotesButton.classList.toggle('transperent-block')
        } else if (i === 5) {
            weather.classList.toggle('transperent-block')
        } else if (i === 6) {
            player.classList.toggle('transperent-block')
        } else if (i === 7) {
            todoTable.style.visibility = 'visible'
            allSettings[i].textContent = 'Show'
        } else if (i === 8) {
            languageSelector.classList.toggle('transperent-block')
        }
    }
}

settings.style.backgroundImage = 'url(/assets/svg/settings-778.svg)'

settings.onclick = () => {
    popupBlock.style.visibility = 'visible'
    popupBlock.classList.remove('transperent-settings')
    blure.style.visibility = 'visible'
    tagSetted.style.visibility = 'hidden'
}


blure.addEventListener('click', () => {
    popupBlock.style.visibility = 'hidden'
    blure.style.visibility = 'hidden'
    tagSetted.style.visibility = 'hidden'
    popupBlock.classList.toggle('transperent-settings')
    imgSetted.textContent = 'GitHub'
})

imgSetted.addEventListener('click', () => {
    if (popupBlock.style.visibility = 'visible') {
        tagSetted.style.visibility = 'visible'
        imgSetted.textContent = 'Unsplash API'
        tagSetted.style.background = 'transparent'
        tagSetted.style.color = 'white'
    } else {
        imgSetted.style.visibility = 'hidden'
    }
})

const closeToDo = document.querySelector('.close')

closeToDo.addEventListener('click', () => {
    todoTable.style.visibility = 'hidden'
    toDoSeted.classList.add('is-hide')
    toDoSeted.textContent = 'Hide'
})




//-----------------------------/APP SETTINGS---------------------------------
//-----------------------------AUTOCOMPLITE----------------------------------

// function autocomplete(inp, arr) {
//     let currentFocus
//     inp.addEventListener("input", function (e) {
//         let a, b, i, val = this.value;
//         closeAllLists()
//         if (!val) { return false; }
//         currentFocus = -1;
//         a = document.createElement("DIV");
//         a.setAttribute("id", this.id + "autocomplete-list")
//         a.setAttribute("class", "autocomplete-items")
//         this.parentNode.appendChild(a)
//         for (i = 0; i < arr.length; i++) {
//             if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
//                 b = document.createElement("DIV");
//                 b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
//                 b.innerHTML += arr[i].substr(val.length)
//                 b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
//                 b.addEventListener("click", function (e) {
//                     inp.value = this.getElementsByTagName("input")[0].value;
//                     closeAllLists()
//                 });
//                 a.appendChild(b)
//             }
//         }
//     })
//     inp.addEventListener("keydown", function (e) {
//         let x = document.getElementById(this.id + "autocomplete-list")
//         console.log(x)
//         if (x) x = x.getElementsByTagName("div")
//         if (e.keyCode == 40) {
//             currentFocus++
//             addActive(x);
//         } else if (e.keyCode == 38) {
//             currentFocus--
//             addActive(x)
//         } else if (e.keyCode == 13) {
//             e.preventDefault()
//             if (currentFocus > -1) {
//                 if (x) x[currentFocus].click()
//             }
//         }
//     })
//     function addActive(x) {
//         if (!x) return false
//         removeActive(x)
//         if (currentFocus >= x.length) currentFocus = 0
//         if (currentFocus < 0) currentFocus = (x.length - 1)
//         x[currentFocus].classList.add("autocomplete-active")
//     }
//     function removeActive(x) {
//         for (let i = 0; i < x.length; i++) {
//             x[i].classList.remove("autocomplete-active")
//         }
//     }
//     function closeAllLists(elmnt) {
//         var x = document.getElementsByClassName("autocomplete-items")
//         for (var i = 0; i < x.length; i++) {
//             if (elmnt != x[i] && elmnt != inp) {
//                 x[i].parentNode.removeChild(x[i])
//             }
//         }
//     }
//     document.addEventListener("click", function (e) {
//         closeAllLists(e.target)
//     })
// }

// let cities = ['Алупка', 'Амурск', 'Анадырь', 'Анапа', 'Архангельск', 'Астрахань', 'Багратионовск', 'Балтийск', 'Барнаул', 'Белгород', 'Белозерск', 'Белокуриха', 'Берёзовский', 'Болхов', 'БольшойКамень', 'Бор', 'Борзя', 'Борисоглебск', 'Боровичи', 'Боровск', 'Бородино', 'Братск', 'Бронницы', 'Брянск', 'ВеликиеЛуки', 'Великий Новгород', 'Верхнеуральск', 'Вилюйск', 'Владивосток', 'Владикавказ', 'Владимир', 'Волгоград', 'Волгодонск', 'Волгореченск', 'Волжск', 'Волжский', 'Вологда', 'Володарск', 'Волоколамск', 'Волосово', 'Волхов', 'Волчанск', 'Вольск', 'Воркута', 'Воронеж', 'Ворсма', 'Воскресенск', 'Воткинск', 'Всеволожск', 'Вуктыл', 'Выборг', 'Выкса', 'Высоковск', 'Высоцк', 'Горно-Алтайск', 'Горнозаводск', 'Грозный', 'Гудермес', 'Гурьевск', 'Гусев', 'Домодедово', 'Екатеринбург', 'Зарайск', 'Звенигород', 'Зеленоградск', 'Иваново', 'Иркутск', 'Искитим', 'Йошкар-Ола', 'Казань', 'Калининград', 'Калуга', 'Карачаевск', 'Кемерово', 'Кингисепп', 'Кисловодск', 'Краснознаменск', 'Курильск', 'Курск', 'Курчатов', 'Ладушкин', 'Ленинск-Кузнецкий', 'Лесной', 'Липецк', 'Луга', 'Луза', 'Лукоянов', 'Луховицы', 'Лысково', , 'Магадан', 'Магнитогорск', 'Мамоново', 'Махачкала', 'Междуреченск', 'Мезень', 'Москва', 'Можайск', 'Мурманск', 'Мытищи', 'Новокузнецк', 'Новороссийск', 'Новосибирск', 'Новотроицк', 'Новоульяновск', 'Новоуральск', 'Ногинск', 'Норильск', 'Одинцово', 'Озёрск', 'Петрозаводск', 'Петропавловск-Камчатский', 'Пионерский', 'Поронайск', 'Правдинск', 'Приморск', 'Ростов', 'Ростов-на-Дону', 'Рязань', 'Самара', 'Санкт-Петербург', 'Саранск', 'Светлогорск', 'Светлый', 'Светогорск', 'Севастополь', 'Северо-Курильск', 'Северодвинск', 'Североморск', 'Североуральск', 'Серпухов', 'Симферополь', 'Славск', 'Смоленск', 'Советск', 'Солнечногорск', 'Сочи', 'Тверь', 'Тихвин', 'Тихорецк', 'Тобольск', 'Тогучин', 'Тольятти', 'Томари', 'Томмот', 'Томск', 'Тула', 'Тюмень', 'Ульяновск', 'Уссурийск', 'Уфа', 'Феодосия', 'Хабаровск', 'Ханты-Мансийск', 'Химки', 'Чебоксары', 'Челябинск', 'Череповец', 'Черняховск', 'Электрогорск', 'Электросталь', 'Электроугли', 'Южно-Сахалинск', 'Южно-Сухокумск', 'Южноуральск', 'Якутск', 'Ялта', 'Ярославль']

// autocomplete(document.getElementById("myInput"), cities)

