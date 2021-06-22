// Global variables
var ctx, cvs

// Main function
function setGame() {
    cvs = document.getElementById('game');
    ctx = cvs.getContext('2d');

    return cvs, ctx, mapSettings.render()
}

//Loader
var Loader = {
    images: {}
};

Loader.loadImage = function (key, src) {
    var img = new Image();

    var d = new Promise(function (resolve, reject) {
        img.onload = function () {
            this.images[key] = img;
            resolve(img);
        }.bind(this);

        img.onerror = function () {
            reject('Could not load image: ' + src);
        };
    }.bind(this));

    img.src = src;
    return d;
};

Loader.getImage = function (key) {
    return (key in this.images) ? this.images[key] : null;
};


// Set the game
let gameSettings = {
    gameRuns: true,
    enemies: 5
}


let mapSettings = {
    map : [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [3,0,0,0,0,0,2,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
        [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
        [3,0,0,0,0,0,0,0,2,1,3,0,0,0,0,0,0,0,0,0,0,0,0,2],
        [3,0,0,0,0,0,0,0,2,1,1,1,3,0,0,0,0,0,0,0,0,0,0,2],
        [3,0,0,0,0,0,0,0,0,0,2,1,1,1,1,3,0,0,0,0,0,0,0,2],
        [3,0,0,0,0,0,0,0,0,0,0,0,2,3,0,0,0,0,0,0,0,0,0,2],
        [3,0,0,0,2,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
        [3,0,2,1,1,1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,1,1],
        [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],
    tileSize: 20,
    imageAtlas: Loader.getImage('tiles.png'),

    getMapDimensions: function() {
        let rows = this.map.length;
        let columns = this.map[0].length;
        let totalSize = this.map.length *  this.map[0].length;

        return [columns, rows, totalSize];
    },

    getTile: function(col, row) {
        return this.map[col][row]
    },

    render: function(){
        for (var c = 0; c < this.getMapDimensions()[0]; c++) {
            for (var r = 0; r < this.getMapDimensions()[1]; r++) {

              var tile = this.getTile(c, r);

              if (tile !== 0) { // 0 => empty tile
                
                ctx.drawImage(
                  this.imageAtlas, // image
                  (tile - 1) * this.tileSize, // source x
                  0, // source y
                  this.tileSize, // source width
                  this.tileSize, // source height
                  c * this.tileSize, // target x
                  r * this.tileSize, // target y
                  this.tileSize, // target width
                  this.tileSize // target height
                );
              }
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
