
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

  
  
function generateMap() {

    function generateBorders(r, c){
        let seed = Math.random() * 100

        //Create borders around the map
        if(r == 0 || r == (rowNumber - 1)) {
            return tile = 3;
        } else if (c == 0 || c == (columnNumber - 1)) {
            return tile = 3;
        } else if (c == 4 && r == 3){
            tile = 2
    } else if (seed > 85 && c > seed/13) { 
            if (Math.random() * 100 > 20){tile = 1;} else {  tile= 3 }
            
            
            
        }  else {
            return tile = 0; //Moveable space
        }
    }

    function generateTrees(r, c){

    }

      let rowNumber = 11;
      let columnNumber = 24;
      
      let map = []

      for (let r = 0; r < rowNumber;  r++){
        let row = []
        for (let c = 0; c < columnNumber; c++){
            var tile

            generateBorders(r, c)
            generateTrees(r, c)
            

            //Push column into ARRAY
            row.push(tile)
        }
        map.push(row)
    }


    return map
}

