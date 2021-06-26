// Global variables
var ctx, cvs, key


// Main function
function setGame() {
    cvs = document.getElementById('game');
    ctx = cvs.getContext('2d');
    cvs.width  = mapSettings.tileSize * mapSettings.map[0].length;
    cvs.height = mapSettings.tileSize * mapSettings.map.length;
    document.addEventListener('keydown', movement.controller);


    return cvs, ctx, mapSettings.renderMap()
}




//Game loop
function gameDraw() {

    if (gameSettings.gameRuns) {
        
      setGame()
      requestAnimationFrame(gameDraw)

    } else {
        console.log("GAME OVER")
    }
} 

// Set the game
let gameSettings = {
    gameRuns: true,
    enemies: 5,
    randomWord: "cat",

    gameOver: function () {
        if (character.health <= 0) {
            gameSettings.gameRuns = false
        }
    },

    fight: function(r, c){

        getRandomWord()
            .then(data => this.randomWord = data[0])
        
        let fight = window.prompt(`Unscramble the word "${this.randomWord.shuffle()}" or die!`)

        if (fight == this.randomWord){
            console.log("Correcto!")
            mapSettings.killTile(r, c)

        } else {
            console.log(`Wrong! Correct word was ${this.randomWord}`)

            character.health = character.health - 1
            gameSettings.gameOver()

        }

    }
}

// Map settings
let mapSettings = {
    map : [
        [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
        [3,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
        [3,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
        [3,0,0,0,0,0,0,0,2,1,3,0,0,0,0,0,0,0,0,0,0,0,0,3],
        [3,0,2,0,0,0,0,0,2,1,1,1,3,0,0,0,0,0,0,0,0,0,0,3],
        [3,0,0,0,0,0,0,0,0,0,2,1,1,1,1,3,0,0,0,0,0,0,0,3],
        [3,0,0,0,0,0,0,0,0,2,0,0,2,2,0,0,0,0,0,0,0,0,0,3],
        [3,0,0,0,2,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
        [3,0,2,1,1,1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,1,3],
        [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,1,1,1,3],
        [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]
    ],
    tileSize: 40,
    imageAtlas: 'tiles.png',
    MovableSpace: [],

    killTile: function(r, c){
        this.map[r][c] = 0
    },

    getMapDimensions: function() {
        let rows = this.map.length;
        let columns = this.map[0].length;
        let totalSize = this.map.length *  this.map[0].length;

        return [columns, rows, totalSize];
    },

    getTile: function(row, col) {
        return this.map[row][col]
    },

    drawTile: function (x, y, w, h, color) { 
        ctx.fillStyle = color;
        ctx.fillRect(x, y, w, h);
        
     },

    getRandomTile: function () {
        let randomRow = randomInteger(0, (this.map.length - 1))
        let randomColumn = randomInteger(0, (this.map[0].length - 1))

        return [this.getTile(randomRow, randomColumn), [randomRow, randomColumn]]
    },

    renderMap: function(){

        //Reset coords
        this.MovableSpace = []
        character.location = []

        //Function main
       let rows = this.getMapDimensions()[1]
       let columns = this.getMapDimensions()[0]

        for (var r = 0; r < rows; r++) {
            for (var c = 0; c < columns; c++) {
                
                let tile = this.getTile(r, c)
                let color = ""

                if (tile == 0) {
                    color = "red";

                    this.MovableSpace.push([r, c])

                } else if (tile == 1) {
                    color = "blue";

                } else if (tile == 2) {
                    color = "green";

                } else if (tile == 3) {
                    color = "purple";

                } else if (tile == 4) {
                    color = "black";
                } else if (tile == 5) {
                    color = "white"
                    character.location.push(r)
                    character.location.push(c)
                }
                
                this.drawTile (
                    c * this.tileSize,
                    r * this.tileSize,
                    this.tileSize,
                    this.tileSize,
                    color
                )
            }
        }
    }
}


let movement = {

    nearbyTiles: {
        getTop: function(){ return [character.location[0] - 1, character.location[1]] },
        getRight: function(){ return [character.location[0], character.location[1] + 1] },
        getBot: function(){ return [character.location[0] + 1, character.location[1]] },
        getLeft: function(){ return [character.location[0], character.location[1] - 1] }
    },

    movementLogic: function(r, c){
        if (mapSettings.getTile(r, c) == 0) {

            mapSettings.map[character.location[0]][character.location[1]] = 0
            mapSettings.map[r][c] = 5

        } else if (mapSettings.getTile(r, c) == 2) {
            gameSettings.fight(r, c)
        }

    },

    controller: function (e) {

        key = e.code

        switch (e.code) {

            
            case "KeyW":
            case "ArrowUp":
                movement.movementLogic(movement.nearbyTiles.getTop()[0], movement.nearbyTiles.getTop()[1])
                break;

            case "KeyS":
            case "ArrowDown":
                movement.movementLogic(movement.nearbyTiles.getBot()[0], movement.nearbyTiles.getBot()[1])
                break;

            case "KeyD":
            case "ArrowRight":
                movement.movementLogic(movement.nearbyTiles.getRight()[0], movement.nearbyTiles.getRight()[1])
                break;

            case "KeyA":
            case "ArrowLeft":
                movement.movementLogic(movement.nearbyTiles.getLeft()[0], movement.nearbyTiles.getLeft()[1])
                break;
        } 
    }
}

let character = {
    health : 10,
    size: mapSettings.tileSize,
    location: []
}


//Secondary functions
//Random int

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Shuffle strings

String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}

//API
async function getRandomWord(){
    let response = await fetch("https://random-word-form.herokuapp.com/random/noun")
    return response.json()
}






gameDraw()
