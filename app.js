const playlistContainer = document.querySelector(".playlistContainer");
const audioTag = document.querySelector(".audioTag");
const currentAndTotalTimeTag = document.querySelector(".currentAndTotalTime");
const currentProgressTag = document.getElementById("currentProgress");
const palyButton = document.querySelector(".palyButton");
const pauseButton = document.querySelector(".pasueButton");
const previousButton = document.querySelector(".previousButton");
const nextButton = document.querySelector(".nextButton");
const songName  = document.querySelector(".songName")


const tracks = [
    {
        trackId:"./songs/The Weeknd - Blinding Lights.mp3", 
        title:"Blinding Lights"
    },
    {
        trackId:"./songs/The Weeknd - Call Out My Name.mp3",
        title: "Call Out My Name"
    },
    {
        trackId: "./songs/The Weeknd - I Was Never There feat. Gesaffelstein.mp3",
        title:"I Was Never There"
    },
    {
        trackId:"./songs/The Weeknd - DIE FOR YOU.mp3",
        title: "DIE FOR YOU"
    },
    {
        trackId:"./songs/The Weeknd - Nothing Is Lost (You Give Me Strength).mp3",
        title: "Nothing Is Lost"
    },
    {
        trackId:"./songs/The Weeknd - Save Your Tears.mp3",
        title: "Save Your Tears"
    }
]

for (let i = 0; i < tracks.length; i++) {
    const trackTag = document.createElement("div");

    trackTag.addEventListener("click", ()=>{
        currentPlayIndex = i;
        playSong()
    })

    trackTag.classList.add("trackItem");
    const title = (i+1).toString() + ". " + tracks[i].title
    trackTag.textContent  = title;
    playlistContainer.append(trackTag);
}

let duration = 0;
let durationText = "00:00"
audioTag.addEventListener("loadeddata",()=>{
    duration = Math.floor(audioTag.duration);
    durationText = createMinuteAndSecondText(duration)
})

audioTag.addEventListener("timeupdate",()=>{
    const currentTime = Math.floor(audioTag.currentTime);
    const currentTimeText = createMinuteAndSecondText(currentTime);

    const currentTimeTextAndDurationText = currentTimeText + " / " + durationText;
    currentAndTotalTimeTag.textContent = currentTimeTextAndDurationText
    updateCurrentProgress(currentTime)
});

const updateCurrentProgress = (currentTime) =>{
    const currentProgressWidth = (500/duration)*currentTime;
    currentProgressTag.style.width = currentProgressWidth.toString() + "px";
}

const createMinuteAndSecondText = (totalSecond) =>{
    const minutes = Math.floor(totalSecond/60);
    const seconds = totalSecond % 60;

    const minuteText = minutes < 10 ? "0" + minutes.toString() : minutes;
    const secondText = seconds < 10 ? "0" + seconds.toString() : seconds;

    return minuteText + ":" + secondText;
}

// Buttons
let currentPlayIndex = 0;
let isPlaying = false;
palyButton.addEventListener("click", () =>{
    isPlaying = true;
    updatePlayAndPauseButton(); 
    const currentTime = Math.floor(audioTag.currentTime);
    if(currentTime === 0 ){
       playSong();
    }else {
        audioTag.play();
    }
    
})

pauseButton.addEventListener("click", () =>{
    isPlaying = false;
    audioTag.pause();
    updatePlayAndPauseButton()
});

previousButton.addEventListener('click', ()=>{
    if(currentPlayIndex === 0){
        currentPlayIndex = tracks.length;

    }
    currentPlayIndex -= 1;
    playSong();
})

nextButton.addEventListener('click', ()=>{
    if(currentPlayIndex === tracks.length - 1){
        currentPlayIndex = -1
    }
    currentPlayIndex += 1;
    playSong();
});

// Functions
const updatePlayAndPauseButton = () =>{
    if(isPlaying){
        palyButton.style.display = "none"
        pauseButton.style.display = "inline-block"
    } else {
        palyButton.style.display = "inline-block"
        pauseButton.style.display = "none"
    }
}

const playSong = () => {
    const songIdToPlay = tracks[currentPlayIndex].trackId;
    audioTag.src= songIdToPlay;
    audioTag.play();
    isPlaying =true;
    updatePlayAndPauseButton()

    songName.textContent = tracks[currentPlayIndex].title;
}