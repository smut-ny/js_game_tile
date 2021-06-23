// Global variables
var ctx, cvs


// Main function
function setGame() {
    cvs = document.getElementById('game');
    ctx = cvs.getContext('2d');
    cvs.width  = mapSettings.tileSize * mapSettings.map[0].length;
    cvs.height = mapSettings.tileSize * mapSettings.map.length;

    return cvs, ctx, mapSettings.render()
}

// Set the game
let gameSettings = {
    gameRuns: true,
    enemies: 5
}


let mapSettings = {
    map : [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [2,0,0,0,0,0,2,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
        [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
        [3,0,0,0,0,0,0,0,2,1,3,0,0,0,0,0,0,0,0,0,0,0,0,2],
        [3,0,0,0,0,0,0,0,2,1,1,1,3,0,0,0,0,0,0,0,0,0,0,2],
        [3,0,0,0,0,0,0,0,0,0,2,1,1,1,1,3,0,0,0,0,0,0,0,2],
        [3,0,0,0,0,0,0,0,0,0,0,0,2,3,0,0,0,0,0,0,0,0,0,3],
        [3,0,0,0,2,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
        [3,0,2,1,1,1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,1,1],
        [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,1,1,1,1],
        [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]
    ],
    tileSize: 20    ,
    imageAtlas: 'tiles.png',

    getMapDimensions: function() {
        let rows = this.map.length;
        let columns = this.map[0].length;
        let totalSize = this.map.length *  this.map[0].length;

        return [columns, rows, totalSize];
    },

    getTile: function(col, row) {
        return this.map[col][row]
    },
    drawTile: function (x, y, w, h, color) { 
        ctx.fillRect(x, y, w, h);
        ctx.fillStyle = color;

     },

    render: function(){
        for (var r = 0; r < this.getMapDimensions()[1]; r++) {
            for (var c = 0; c < this.getMapDimensions()[0]; c++) {
                
                let tile = this.getTile(r, c)
                
                let color = ""

                if (tile == 0) {
                    color = "red"
                } else if (tile == 1) {
                    color = "blue"
                } else if (tile == 2) {
                    color = "green"
                } else {
                    color = "black"
                }
                // todo c, r must start on 0
                this.drawTile(
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
    locationX: 1,
    locationY: 1
}

setGame()
