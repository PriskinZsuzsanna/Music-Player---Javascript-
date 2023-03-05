let progress = document.querySelector("#progress");
let song = document.querySelector("#song");
let ctrlIcon = document.querySelector("#ctrl-icon");
let backBtn = document.querySelector("#backwards");
let forwBtn = document.querySelector("#forwards");
let leftBtn = document.querySelector("#left");
let rightBtn = document.querySelector("#right");
const songCard = document.querySelector(".song-card");
let result;



//Events
window.onload = () => {
    getData()
}

song.onloadedmetadata =   () => {
    ProgressTracker()
};

updateProgressBar();

useProgressBar();

ctrlIcon.addEventListener("click", playPause);

backBtn.addEventListener("click", jumpToLeftTrack);

forwBtn.addEventListener("click", jumpToRightTrack);

backBtn.addEventListener("dblclick", jumpToBeginning);



//Functions
function getData () {
    fetch("data.json")
        .then(response => response.json())
        .then((data) => {
            console.log(data)

            let i = 0;
            let j = data.length

            rightBtn.addEventListener("click", () => {

                i = i + 1;
                if (i == j) {
                    i = 0;
                }

                //i = (j + i + 1) % j;
                currentCard()
                ctrlIcon.classList.add("fa-play")
                ctrlIcon.classList.remove("fa-reply")
                ctrlIcon.classList.remove("fa-pause")
            })

            leftBtn.addEventListener("click", () => {

                if (i == 0) {
                    i = j - 1;
                } else {
                    i = i - 1
                }

                //i = (j + i - 1) % j;
                currentCard()
                ctrlIcon.classList.add("fa-play")
                ctrlIcon.classList.remove("fa-reply")
                ctrlIcon.classList.remove("fa-pause")
            })

            function currentCard() {

                songCard.innerHTML = `
                <div class="img-div">
                    <img src="${data[i].img}" alt="">
                </div>
                <div class="text">
                    <h2>${data[i].title}</h2>
                    <h3>${data[i].author}</h3>
                </div>
                
            `
            song.setAttribute("src", data[i].sound)
            }

            currentCard();

        })
}


function playPause() {
    if (ctrlIcon.classList.contains("fa-pause")) {
        song.pause();
        ctrlIcon.classList.remove("fa-pause")
        ctrlIcon.classList.add("fa-play")
    } else if (ctrlIcon.classList.contains("fa-play")) {
        song.play();
        ctrlIcon.classList.add("fa-pause")
        ctrlIcon.classList.remove("fa-play")
    } else {
        progress.value = 0;
        song.play()
        ctrlIcon.classList.add("fa-pause")
        ctrlIcon.classList.remove("fa-reply")
    }
}

function jumpToLeftTrack () {
    progress.value = progress.value - 30;
    song.currentTime = progress.value;
    song.play();
    ctrlIcon.classList.add("fa-pause")
    ctrlIcon.classList.remove("fa-play")
}

function jumpToRightTrack () {
    progress.value = song.currentTime + 30;
    song.currentTime = progress.value;
    song.play();
    ctrlIcon.classList.add("fa-pause")
    ctrlIcon.classList.remove("fa-play")
}

function ProgressTracker () {
    progress.max = song.duration;
    progress.value = song.currentTime;
}

function updateProgressBar () {
    if (song.play()) {
        setInterval(() => {
            progress.value = song.currentTime;
            if (song.currentTime == song.duration) {
                ctrlIcon.classList.add("fa-reply")
                ctrlIcon.classList.remove("fa-pause")
            }
        }, 500)
    };
}

function useProgressBar () {
    progress.onchange = function () {
        song.play();
        song.currentTime = progress.value;
        ctrlIcon.classList.remove("fa-play")
        ctrlIcon.classList.add("fa-pause")
    }
}


function jumpToBeginning() {
    progress.value = 0;
    song.currentTime = progress.value;
    song.play();
    ctrlIcon.classList.add("fa-pause")
    ctrlIcon.classList.remove("fa-play")
}



