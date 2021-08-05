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

//hero healthbar
heroHealthbar = document.querySelector("#hero-healthbar")

//monster healthbar
monsterHealthbar = document.querySelector("#monster-healthbar")

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
    alive: true
}

function hitEnemy(){
    event.preventDefault();
    
    if(repeatClick == false){
        hitSound.play();    
        enemy.health -= player.strength;
        monsterHealthbar.value = enemy.health

        //checks to see if enemy(s) dead
        if(enemy.health <= 0){
            battleMusic.pause();
            victorySong.play();
            enemy.alive = false;
            monsterHealthbar.remove()      
            //open modaL
            // winModal.style.transition = "all 20s"; //fade in (not working)
            winModal.style.display = "block";
            hpPotion.removeEventListener("click" , heal);
            attack.removeEventListener("click")
            return;
        }
        console.log(`Enemy health: ${enemy.health}`);
        setTimeout(hitPlayer , 100)
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

