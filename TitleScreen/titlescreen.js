menuMusic = document.querySelector("#menu-music")
startButtonSoundLoc = document.querySelector("#start-button")
startSound = document.querySelector("#start-sound")
menuMusicEnable = document.querySelector("#game-title")

//menu music
menuMusic.loop = true;
menuMusic.volume = .20;

startSound.volume = .20;

//sound that plays when start button is clicked
startButtonSoundLoc.addEventListener("click" , () =>{
    menuMusic.pause();
    startSound.play();
    setTimeout(startClick , 9000);
})

const startClick = () => {
    startButtonSoundLoc.style.color = "blue";
    window.open("../Battlefield/battlefield.html" , '_self');
}
menuMusicEnable.addEventListener("click" , () =>{
    menuMusic.play();
})