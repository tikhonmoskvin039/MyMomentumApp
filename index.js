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
    if (hours === 0) getTimeOfDay() && userGreetings()

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


function userGreetings() {
    let hour = new Date().getHours()
    let greeting
    if (hour >= 5 && hour < 12) {
        greeting = "Good morning"
    }
    else if (hour >= 12 && hour < 18) {
        greeting = "Good afternoon"
    }
    else if (hour >= 18 && hour < 24) {
        greeting = "Good evening"
    }
    else if (hour >= 0 && hour < 5) {
        greeting = "Good night"
    } else if (hour === 0) {
        getTimeOfDay() ///// сработает ли рекурсия?
    }


    document.querySelector('.greeting').textContent = greeting
}

userGreetings()

//-------------------------------LOCAL STORAGE---------------------------------

const userName = document.querySelector('.name');
// const cityName = document.querySelector('.city');
let city = document.querySelector('.city')


function setLocalStorage() {
    localStorage.setItem('city', city.value);
    localStorage.setItem('name', userName.value);
}
window.addEventListener('beforeunload', setLocalStorage)
function getLocalStorage() {
    if (localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');
    }
    if (localStorage.getItem('name')) {
        userName.value = localStorage.getItem('name');
    }
}
document.addEventListener("DOMContentLoaded", getLocalStorage);

//------------------------------/LOCAL STORAGE---------------------------------
//------------------------------SLIDER JS--------------------------------------


const body = document.querySelector('body')

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
    const img = new Image();
    img.src = url("../assets/img/bg.jpg")
    img.onload = () => {
        return body.style.backgroundImage = `url(https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/${getRandomNum()}.jpg`
    }
}

setTimeout(setBg, 1000)


const nextButton = document.querySelector('.slide-next')
function getSlideNext() {
    if (getRandomNum(1, 20) < 20) {
        body.style.backgroundImage = `url(https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/${getRandomNum(1, 20)}.jpg`
    }

}
setTimeout(nextButton.onclick = getSlideNext, 2000)

const prevButton = document.querySelector('.slide-prev')
function getSlidePrev() {
    if (getRandomNum(1, 20) < 20) {
        body.style.backgroundImage = `url(https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/${getRandomNum(1, 20)}.jpg`
    }
}
setTimeout(prevButton.onclick = getSlidePrev, 2000)

//------------------------------/SLIDER JS-------------------------------------
//-------------------------------WEATHER API---------------------------------

const weather = document.querySelector('.weather')

const weatherIcon = document.querySelector('.weather-icon')
const temperature = document.querySelector('.temperature')
const weatherDescription = document.querySelector('.weather-description')
const wind = document.querySelector('.wind')
const humidity = document.querySelector('.humidity')
// let city = document.querySelector('.city')
let city2 = document.querySelector('.city2')

function hiddenInfo() {
    if (city.value !== '') {
        city2.classList.add('hidden')
    } else if (city.value == '') {
        city2.classList.remove('hidden')
    }
}


city.addEventListener("input", hiddenInfo);



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
    // trackNames[i].onclick = () => {
    //     if (!isPlay) {
    //         audio.src = playList[i].src
    //         audio.play()
    //         playPauseButton.classList.add('pause')
    //         trackNames[i].classList.add('item-active')
    //     } else {
    //         trackNames[i].classList.remove('item-active')
    //     }
    //     trackNames[i].onclick = () => {
    //         audio.pause()
    //     }
    // }

    playPauseButton.onclick = () => {
        playPauseButton.classList.toggle('pause')
        if (playPauseButton.classList.contains('pause')) {
            audio.play()
            isPlay = true
        } else if (!playPauseButton.classList.contains('pause')) {
            audio.pause();
            isPlay = false
        }
    }

    playNext.onclick = () => {
        if (!isPlay && playNum < 4) {
            audio.src = playList[playNum].src
            audio.play()
            playPauseButton.classList.add('pause')
            trackNames[playNum].classList.add('item-active')
            if (playNum == 4) {
                playNum = 0
                audio.src = playList[0].src
            }
            playNum++
            trackNames[playNum - 2].classList.remove('item-active')
        }
        else if (playNum == 4) {
            playNum = 1
            audio.src = playList[0].src
            trackNames[3].classList.remove('item-active')
            trackNames[0].classList.add('item-active')
            audio.play()
        }
        console.log('playNext', playNum)
    }


    playPrev.onclick = () => {
        playPauseButton.classList.add('pause')
        if (!isPlay && playNum > 0) {
            playNum--
            audio.src = playList[playNum].src
            trackNames[playNum].classList.toggle('item-active')
            trackNames[playNum + 1].classList.remove('item-active')
            audio.play()
        } else if (!isPlay && playNum == 3) {
            playNum--
            audio.src = playList[1].src
            audio.play()
        } else if (playNum == 0) {
            playNum = 3
            trackNames[playNum].classList.toggle('item-active')
            trackNames[0].classList.remove('item-active')
            audio.src = playList[3].src
            audio.play()
        }
        console.log('playPrev', playNum)
    }
}

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

rus.onclick = () => {
    if (document.querySelector('.greeting').textContent === 'Good evening') {
        document.querySelector('.greeting').textContent = 'Добрый вечер'
    } else if (document.querySelector('.greeting').textContent === 'Good night') {
        document.querySelector('.greeting').textContent = 'Доброй ночи'
    } else if (document.querySelector('.greeting').textContent === 'Good morning') {
        document.querySelector('.greeting').textContent = 'Доброе утро'
    } else if (document.querySelector('.greeting').textContent === 'Good afternoon') {
        document.querySelector('.greeting').textContent = 'Добрый день'
    }

    city.placeholder = '[Введите город]'
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
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=8448ec756fbb6beea60615c2a2cdae25&units=metric`;

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


}
eng.onclick = () => {
    if (document.querySelector('.greeting').textContent === 'Добрый вечер') {
        document.querySelector('.greeting').textContent = 'Good evening'
    } else if (document.querySelector('.greeting').textContent === 'Доброй ночи') {
        document.querySelector('.greeting').textContent = 'Good night'
    } else if (document.querySelector('.greeting').textContent === 'Доброе утро') {
        document.querySelector('.greeting').textContent = 'Good morning'
    } else if (document.querySelector('.greeting').textContent === 'Добрый день') {
        document.querySelector('.greeting').textContent = 'Good afternoon'
    }

    city.placeholder = '[Enter city]'
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
}



//-----------------------------/APP TRANSLATE---------------------------------
//------------------------------APP SETTINGS---------------------------------

const state = {
    language: 'en',
    photoSource: 'github',
    blocks: ['time', 'date', 'greeting', 'quote', 'weather', 'audio', 'todolist']
}


  //-----------------------------/APP SETTINGS---------------------------------