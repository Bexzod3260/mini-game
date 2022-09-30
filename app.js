const screens = document.querySelectorAll('.screen');
const startBtn = document.getElementById('start');
const timeList = document.getElementById('time-list');
const timeEL = document.getElementById('time');
const board = document.getElementById('board');

let time = 0
let score = 0

startBtn.addEventListener('click', (e) => {
    e.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame()
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value) {
    timeEL.innerHTML = `00:${value}`
}

function finishGame() {
    board.innerHTML = `<h1> <span class="primary"></span> счет: ${score}</h1>`
    timeEL.parentNode.classList.add('hide')
}

function createRandomCircle() {
    const circle = document.createElement('div')
    const {width, height} = board.getBoundingClientRect()
    const size = getRandomNumber(10, 60)

    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.left = `${x}px`
    circle.style.top = `${y}px`
    
    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max -min) + min)
}