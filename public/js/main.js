const video = document.getElementById("video");
const fixed = document.getElementById("fixed");
const title = document.getElementById("title");
var schedule;
var currentVideoNumberId;
var videoCount;
fetch('/public/file/schedule.json', {
        method: 'GET'
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (json) {
        schedule = json
        videoCount = schedule.length

        begin()
    });

var videoStart;

if (localStorage.getItem('current')) {
    videoStart = localStorage.getItem('current')
} else {
    localStorage.setItem('current', '1')
    videoStart = localStorage.getItem('current')
}

function begin() {
    currentVideoNumberId = videoStart

    title.innerText = schedule[currentVideoNumberId - 1].title

    video.innerHTML = `<source src="/public/video/${videoStart}.mp4" type="video/mp4" id="source">`

    currentVideoNumberId = localStorage.getItem('current')

    const player = new Plyr('#video', {
        title: 'Kramerrrr',
        controls: ['play-large', 'play', 'progress']
    });

    player.muted = false
    player.play()

    setInterval(function () {
        if (player.ended) {
            next()
        }
        if (player.paused) {
            fixed.style.display = 'block'
        } else {
            fixed.style.display = 'none'
        }
    }, 1000)
}

function next() {
    if (currentVideoNumberId == videoCount) {
        currentVideoNumberId = localStorage.getItem('current')
        title.innerText = schedule[0].title
        video.innerHTML = `<source src="/public/video/1.mp4" type="video/mp4" id="source">`
        video.play()
        localStorage.setItem('current', 1)
    } else {
        currentVideoNumberId = localStorage.getItem('current')
        localStorage.setItem('current', Number(currentVideoNumberId) + 1)
        currentVideoNumberId = localStorage.getItem('current')
        title.innerText = schedule[currentVideoNumberId - 1].title
        video.innerHTML = `<source src="/public/video/${Number(currentVideoNumberId)}.mp4" type="video/mp4" id="source">`
        video.play()
    }

    currentVideoNumberId = localStorage.getItem('current')
}