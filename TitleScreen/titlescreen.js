menuMusic = document.querySelector("#menu-music")
startButtonSoundLoc = document.querySelector("#start-button")
startSound = document.querySelector("#start-sound")

//menu music
menuMusic.loop = true;
menuMusic.volume = .20;
menuMusic.play();

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