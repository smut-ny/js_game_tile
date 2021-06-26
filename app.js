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

function gameOver() {
    if (character.health <= 0){
        gameSettings.gameRuns = false
    }
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
    enemies: 5
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
            character.fight()
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

            case "Space":
                console.log(true)
                break;
        } 
    }
}

let character = {
    health : 10,
    size: mapSettings.tileSize,
    location: [],
    fight: function(){

        fight = window.prompt("Press X to defeat the enemy")

        if (fight == "test"){
            console.log("you won")
        } else {
            character.health = character.health - 1
            gameOver()
        }

    }
    
    // draw: function(x, y) {
    //     return mapSettings.drawTile(this.size * y, this.size * x, this.size, this.size, "white")
    // }
}


//Secondary functions

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;

  }
//Event key listener



gameDraw()
