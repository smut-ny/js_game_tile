// TEMPLATE
// [
//     [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
//     [3, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
//     [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
//     [3, 0, 0, 0, 0, 0, 0, 0, 2, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
//     [3, 0, 2, 0, 0, 0, 0, 0, 2, 1, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
//     [3, 0, 0, 0, 0, 5, 0, 0, 0, 0, 2, 1, 1, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 3],
//     [3, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
//     [3, 0, 0, 0, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
//     [3, 0, 2, 1, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 3],
//     [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 3],
//     [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
//   ];


function generateMap(numberOfEnemies) {

    function randomBarrierPlacement(r, c, rowNumber, columnNumber) {
        let seed = Math.random() * 100;
    
        if (r == 0 || r == rowNumber - 1 || c == 0 || c == columnNumber - 1) { return (tile = 3); } 
        else if (seed > 85 && c > seed / 15) { if (Math.random() * 100 > 20) { return tile = 1; } else { return tile = 3; }} //Trees 
        else { return tile = 0; }
      }

    function generateBarriers(fc){
        let rowNumber = 11;
        let columnNumber = 24;
        let map = [];
      
        for (let r = 0; r < rowNumber; r++) {
          let row = [];

          for (let c = 0; c < columnNumber; c++) {

            var tile = fc(r, c, rowNumber, columnNumber);
        
            row.push(tile);
          }
          
          map.push(row);
        }

        return map
      }

    function getGrassCoords(map){
        let grassCoords = []

        for (let c = 0; c < map.length; c++){
                for (let r = 0; r < map[0].length; r++) {

                    if (map[c][r] == 0) {

                        grassCoords.push([c, r])
                    }
                }
            }

        return grassCoords
        }

    function isTileSurrounded(rowColumnArray, spaceCoords){
        spaceCoords = JSON.stringify(spaceCoords)

        originalTileCoord = JSON.stringify(rowColumnArray)
        leftTileCoord = JSON.stringify([rowColumnArray[0] - 1, rowColumnArray[1]])
        rightTileCoord = JSON.stringify([rowColumnArray[0] + 1, rowColumnArray[1]])
        topTileCoord = JSON.stringify([rowColumnArray[0], rowColumnArray[1] - 1])
        botTileCoord = JSON.stringify([rowColumnArray[0], rowColumnArray[1] + 1])
        
        logic = (spaceCoords.includes(originalTileCoord) && spaceCoords.includes(leftTileCoord) && spaceCoords.includes(rightTileCoord) && spaceCoords.includes(topTileCoord) && spaceCoords.includes(botTileCoord))

        if (logic){
        
          return true
        }
    }

    function getUnsurroundedGrassCoords(grassCoords) {
      unsurroundedGrassCoords = []

      for (coord of grassCoords) {
        if (isTileSurrounded(coord, grassCoords)){

          unsurroundedGrassCoords.push(coord)
        }
      }

      return unsurroundedGrassCoords
    }

    function addEnemiesAndPlayer(numberOfEnemies, grassCoords, mapWithBarriers){
      randomGrassCoords = _.sampleSize(grassCoords, numberOfEnemies + 1) //Add player to count
      mapWithEnemies = mapWithBarriers

      for (let coord = 0; coord < randomGrassCoords.length; coord++){
        coordValue = randomGrassCoords[coord]
        
        if (coord == 0){

          mapWithEnemies[coordValue[0]][coordValue[1]] = 5 //Hero
        } else {

          mapWithEnemies[coordValue[0]][coordValue[1]] = 2 //Enemies
        }
      }

      return mapWithEnemies
    }




  mapWithBarriers = generateBarriers(randomBarrierPlacement)
  grassCoords = getGrassCoords(mapWithBarriers)
  unsurroundedGrassCoords = getUnsurroundedGrassCoords(grassCoords)

  mapWithEnemies = addEnemiesAndPlayer(numberOfEnemies, unsurroundedGrassCoords, mapWithBarriers)


  return mapWithEnemies
}