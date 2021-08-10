//battle music
battleMusic = document.querySelector("#battle-music")
battleMusic.loop = true
battleMusic.volume = .35
battleMusic.play();

//menu select sound
menuSelect = document.querySelector("#menu-select")
menuSelect.volume = .50

//hit sound
hitSound = document.querySelector("#hit")
hitSound.volume = .30

//enemy hit sound
enemyHit = document.querySelector("#enemy-hit")
enemyHit.volume = .30

//victory music
victorySong = document.querySelector("#victory")
victorySong.volume = .25

//moves and items bar location
moveLoc = document.querySelector("#bottom-bar")

//attack button
attack = document.createElement("button")
attack.setAttribute("class" , "bottom-bar-buttons")
attack.setAttribute("id" , "attack")
attack.innerHTML = "Attack"
moveLoc.appendChild(attack)

//health potion
hpPotion = document.createElement("button")
hpPotion.setAttribute("class" , "bottom-bar-buttons")
hpPotion.setAttribute("id" , "health-potion")
hpPotion.innerHTML = "HP Potion"
moveLoc.appendChild(hpPotion)

//monsters
monsterContainer = document.querySelector("#monster-container")
monsterLimit = 4
monsterAmount = Math.floor(Math.random() * monsterLimit + 1)
monsters = []
monsterLoc = []

//arrowSelector = document.createElement("")
for(let i = 0 ; i < monsterAmount ; i++){
    //creates monster sprite div
    monsters.push(document.createElement("div"))
    monsters[i].setAttribute("class" , "monster-sprite")
    monsterContainer.appendChild(monsters[i])   
    
    //creates the progress tag inside of the monster sprite div
    monsters[i] = document.createElement("progress")
    // monsters[i].setAttribute("id" , `monster-healthbar${i}`)
    monsters[i].setAttribute("id" , `monster-healthbar`)
    monsters[i].setAttribute("value" , "100")
    monsters[i].setAttribute("max" , "100")
    document.querySelectorAll(".monster-sprite")[i].appendChild(monsters[i])

    //creates the img tag inside of the monster sprite div
    monsters[i] = document.createElement("img")
    monsters[i].setAttribute("class" , "monster-selector")
    monsters[i].setAttribute("src" , "../Sprites/monster.png")
    monsters[i].setAttribute("alt" , "Sorry")
    document.querySelectorAll(".monster-sprite")[i].appendChild(monsters[i])

    monsterLoc.push(document.querySelectorAll(".monster-selector")[i])
    //sets the array to null in order to access said array later
    monsters[i] = null
}
//console.log(monsterLoc)
//hero healthbar
heroHealthbar = document.querySelector("#hero-healthbar")

//monster healthbar
monsterHealthbar = document.querySelectorAll("#monster-healthbar")

//win modal
winModal = document.querySelector("#win-modal")

//next level
nextLvl = document.querySelector("#next-lvl");

repeatClick = false;

player = {
    strength: 10,
    health: 100,
}

enemy = {
    health: 100,
    strength: 5,
    isHealer: false,
    alive: true,
}
//sets the monsters array's value to the "enemy" object
for(let i = 0 ; i < monsters.length ; i++){
    monsters[i] = {
        health: 100,
        strength: 5,
        isHealer: false,
        alive: true,
    }
    monsterLoc[i].addEventListener("click" , monsterSelect)
}

function monsterSelect(e){
    menuSelect.play();
    monsterLoc.forEach(element => {
        element.clicked = false
        console.log(element)
        element.style.backgroundColor = "transparent";
    });
    e.target.style.backgroundColor = "blue";
    e.target.clicked = true
}

function hitEnemy(){
    event.preventDefault();
    
    if(repeatClick == false){
        hitSound.play();    
        //takes health away from the currently selected monster
        for(let i = 0 ; i < monsters.length ; i++){
            if(monsterLoc[i].clicked == true){
                monsters[i].health -= player.strength;
                monsterHealthbar[i].value = monsters[i].health;
            }
        }

        // checks to see if enemy(s) dead
        if(monsters.every((status) => status.health <= 0)){
            battleMusic.pause();
            victorySong.play();
            // enemy.alive = false;
            // monsterHealthbar.remove()      
            //open modaL
            // winModal.style.transition = "all 20s"; //fade in (not working)
            winModal.style.display = "block";
            hpPotion.removeEventListener("click" , heal);
            attack.removeEventListener("click")
            return;            
        }      
        
        setTimeout(hitPlayer , 1000)
    }
    repeatClick = true;
}
function heal(){
    event.preventDefault();
    
    if(repeatClick == false){
        menuSelect.play();
        player.health += 10;
        if(player.health > 100)
            player.health = 100
        heroHealthbar.value = player.health;
        console.log(`Hero health: ${player.health}`)
        setTimeout(hitPlayer , 1000)    
    }

    repeatClick = true;
}
function hitPlayer(){
    enemyHit.play();
    player.health -= enemy.strength;
    heroHealthbar.value = player.health;
    console.log(`Hero health: ${player.health}`)
    repeatClick = false;
}
hpPotion.addEventListener("click" , heal)
attack.addEventListener("click" , hitEnemy)
// for(let i = 0 ; i < monsterLoc.length ; i++){
//     monsterLoc[i].addEventListener("mouseover" , () => {
//         console.log("gi")
//         monsterLoc[i].style.opacity = "10";
//     })    
// }
monsterLoc.forEach((e) =>{
    e.addEventListener("mouseover" , () => {
        console.log("gi")
        e.style.opacity = ".60";
        e.style.backgroundColor = "white"
    })
    e.addEventListener("mouseout" , () => {
        console.log("gi")
        e.style.opacity = "1";
        e.style.backgroundColor = "transparent"
    })
})
