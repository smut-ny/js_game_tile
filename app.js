//TODO WIN MESSAGE



// Global variables
var ctx, cvs, key;

// Main setting function
function setGame() {
  //Canvas settings
  cvs = document.getElementById("game");
  ctx = cvs.getContext("2d");
  cvs.width = mapSettings.tileSize * mapSettings.map[0].length;
  cvs.height = mapSettings.tileSize * mapSettings.map.length;
  document.addEventListener("keydown", movement.controller);

  document.querySelector("#numberOfEnemies").innerText = `Number of enemies ${ mapSettings.numOfEnemies.length }`

  //Image texture load
  imageSprite = new Image();
  imageSprite.src = "sprite.png";

  return cvs, ctx, mapSettings.renderMap(), imageSprite;
}

//Game loop
function gameDraw() {
  if (gameSettings.gameRuns) {
    setGame();
    gameSettings.win();
    requestAnimationFrame(gameDraw);
  } else {
    document.querySelector("#gameOver").style.display = "block";
  }
}

// Set the game
let gameSettings = {
  gameRuns: true,
  randomWord: capitalizeFirstLetter("cat"),

  gameOver: function () {
    if (character.health <= 0) {
      gameSettings.gameRuns = false;
    }
  },

  win: function() {
    if (mapSettings.numOfEnemies.length == 0) {
      document.querySelector("#gameOver").innerText = "You WON!"
      document.querySelector("#gameOver").style.display = "block";
      
      this.gameRuns = false;
    }
  },

  fight: function (r, c) {
    getRandomWord().then(
      (data) => (this.randomWord = capitalizeFirstLetter(data[0]))
    );

    let fight = window.prompt(
      `Unscramble the word "${this.randomWord.shuffle()}" or die!`
    );

    if (fight == this.randomWord) {
      document.querySelector("p").innerText = `${this.randomWord} is correct!`;
      mapSettings.killTile(r, c);

    } else {

      document.querySelector("p").innerText = `Wrong! Correct word was ${this.randomWord}`;
      character.health = character.health - 1;

      //Easter eggs
      if (character.health == -2) {
        document.querySelector("#gameOver").innerText = "Just stop pls";
      } else if (character.health == -50) {
        document.querySelector("#gameOver").innerText =
          "Are you still doing it?";
      } else if (character.health == -100) {
        document.querySelector("#gameOver").innerText =
          "There wont be any other text anymore, just keep going...";
      } else if (character.health == -1000) {
        document.querySelector("#gameOver").innerText = "I lied :)";
      }

      document.querySelector("#health").innerText = character.health;
      gameSettings.gameOver();
    }
  },
};

// Map settings
let mapSettings = {
  map: [
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 2, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 2, 0, 0, 0, 0, 0, 2, 1, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 5, 0, 0, 0, 0, 2, 1, 1, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 2, 1, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  ],
  tileSize: 40,
  movableSpace: [],
  numOfEnemies: [],

  killTile: function (r, c) {
    this.map[r][c] = 0;
  },

  getMapDimensions: function () {
    let rows = this.map.length;
    let columns = this.map[0].length;
    let totalSize = this.map.length * this.map[0].length;

    return [columns, rows, totalSize];
  },

  getTile: function (row, col) {
    return this.map[row][col];
  },

  drawTile: function (x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  },

  drawTileImage: function (image, c, r) {
    ctx.drawImage(
      imageSprite,
      0,
      image,
      this.tileSize,
      this.tileSize,
      c,
      r,
      40,
      40
    );
  },

  getRandomTile: function () {
    let randomRow = randomInteger(0, this.map.length - 1);
    let randomColumn = randomInteger(0, this.map[0].length - 1);

    return [this.getTile(randomRow, randomColumn), [randomRow, randomColumn]];
  },

  renderMap: function () {
    //Reset coords
    this.movableSpace = [];
    this.numOfEnemies = [];
    character.location = [];

    //Function main
    let rows = this.getMapDimensions()[1];
    let columns = this.getMapDimensions()[0];

    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < columns; c++) {
        let tile = this.getTile(r, c);
        let image;
        let color = "";

        if (tile == 0) {
          color = "red";
          image = 0;

          this.movableSpace.push([r, c]);
          
        } else if (tile == 1) {
          color = "blue";
          image = 40;
        } else if (tile == 2) {
          color = "green";
          image = 80;

          this.numOfEnemies.push([r, c]);

        } else if (tile == 3) {
          color = "purple";
          image = 120;
        } else if (tile == 5) {
          color = "white";
          image = 160;
          character.location.push(r);
          character.location.push(c);
        }

        // this.drawTile (
        //     c * this.tileSize,
        //     r * this.tileSize,
        //     this.tileSize,
        //     this.tileSize,
        //     color
        // )
        this.drawTileImage(image, c * this.tileSize, r * this.tileSize);
      }
    }
  },
};

let movement = {
  nearbyTiles: {
    getTop: function () {
      return [character.location[0] - 1, character.location[1]];
    },
    getRight: function () {
      return [character.location[0], character.location[1] + 1];
    },
    getBot: function () {
      return [character.location[0] + 1, character.location[1]];
    },
    getLeft: function () {
      return [character.location[0], character.location[1] - 1];
    },
  },

  movementLogic: function (r, c) {
    if (mapSettings.getTile(r, c) == 0) {
      mapSettings.map[character.location[0]][character.location[1]] = 0;
      mapSettings.map[r][c] = 5;
    } else if (mapSettings.getTile(r, c) == 2) {
      gameSettings.fight(r, c);
    }
  },

  controller: function (e) {
    key = e.code;

    switch (e.code) {
      case "KeyW":
      case "ArrowUp":
        movement.movementLogic(
          movement.nearbyTiles.getTop()[0],
          movement.nearbyTiles.getTop()[1]
        );
        break;

      case "KeyS":
      case "ArrowDown":
        movement.movementLogic(
          movement.nearbyTiles.getBot()[0],
          movement.nearbyTiles.getBot()[1]
        );
        break;

      case "KeyD":
      case "ArrowRight":
        movement.movementLogic(
          movement.nearbyTiles.getRight()[0],
          movement.nearbyTiles.getRight()[1]
        );
        break;

      case "KeyA":
      case "ArrowLeft":
        movement.movementLogic(
          movement.nearbyTiles.getLeft()[0],
          movement.nearbyTiles.getLeft()[1]
        );
        break;
    }
  },
};

let character = {
  health: 10,
  size: mapSettings.tileSize,
  location: [],
};

//Secondary functions
//Random int

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//First letter upperCase
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

//Shuffle strings

String.prototype.shuffle = function () {
  var a = this.split(""),
    n = a.length;

  for (var i = n - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a.join("");
};

//API
async function getRandomWord() {
  let response = await fetch(
    "https://random-word-form.herokuapp.com/random/noun"
  );
  return response.json();
}

gameDraw();
