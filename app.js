// Global variables
var ctx, cvs


// Main function
function setGame() {
    cvs = document.getElementById('game');
    ctx = cvs.getContext('2d');
    cvs.width  = mapSettings.tileSize * mapSettings.map[0].length;
    cvs.height = mapSettings.tileSize * mapSettings.map.length;

    return cvs, ctx, mapSettings.renderMap()
}

//Game loop
function gameDraw() {

    if (gameSettings.gameRuns) {
        
      setGame()
      requestAnimationFrame(gameDraw)
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
        [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4],
        [2,0,0,0,0,0,2,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
        [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
        [3,0,0,0,0,0,0,0,2,1,3,0,0,0,0,0,0,0,0,0,0,0,0,2],
        [3,0,2,0,0,0,0,0,2,1,1,1,3,0,0,0,0,0,0,0,0,0,0,2],
        [3,0,0,0,0,0,0,0,0,0,2,1,1,1,1,3,0,0,0,0,0,0,0,2],
        [3,0,0,0,0,0,0,0,0,2,0,0,2,3,0,0,0,0,0,0,0,0,0,3],
        [3,0,0,0,2,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
        [3,0,2,1,1,1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,1,1],
        [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,1,1,1,1],
        [4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4]
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
        this.MovableSpace = []

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

                }else if (tile == 4) {
                    color = "black";
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


let character = {
    health : 10,
    size: mapSettings.tileSize,
    locationX: 1,
    locationY: 1,
    
    draw: function(x, y) {
        return mapSettings.drawTile(x, y, this.size, this.size, "white")
    }
}


//Secondary functions

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


gameDraw()