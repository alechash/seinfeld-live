const video = document.getElementById("video");
const fixed = document.getElementById("fixed");
const title = document.getElementById("titleText");
const scheduleT = document.getElementById("schedule");
var schedule;
var currentVideoNumberId;
var videoCount;
var scheduleHTML = `
<tr>
    <th>Title</th>
    <th>Clip Number</th>
    <th>Unique Id</th>
</tr>`

fetch('/public/file/schedule.json', {
        method: 'GET'
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (json) {
        schedule = json
        videoCount = schedule.length

        genSchedule()
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

function genSchedule() {
    for (i = 0; i < schedule.length; i++) {
        scheduleHTML = scheduleHTML + `
<tr>
    <td>${schedule[i].title}</td>
    <td>${schedule[i].numberId}</td>
    <td>${schedule[i].uniqueId}</td>
</tr>`
    }

    scheduleT.innerHTML = scheduleHTML
}