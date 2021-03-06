/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const  HEIGHT = 6;

let  currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for( let i = 0; i < HEIGHT; i++){
    const row = [];
  for(let j = 0; j < WIDTH; j++){
    row.push(null);
  }
    board.push(row);
  }
  
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.querySelector('#board');
  // TODO: add comment for this code
  //creating the top row of the table with id column -top and adding a click eventListener.
  let  top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  // creating a data cell in top row  with id = X 
  // and adding to the top row
  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  //adding top row with table data to the board.
  htmlBoard.append(top);

  // TODO: add comment for this code
  //creating the rows for the gameboard starting at y = 0(the first row).the id of each cell is y -x .adding the cell to the row and the row to the board.
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
     
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
    for(let y = HEIGHT - 1; y >= 0; y--){
      if(board[y][x] === null){
      return y;
    }
  }
  return null;
   
}
  
  


/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y,x) {
  // TODO: make a div and insert into correct table cell
const  token = document.createElement('div');
token.classList.add('piece');
currPlayer === 1 ?  token.classList.add('p1'):token.classList.add('p2')
let cell = document.getElementById (`${y}-${x}`);

cell.append(token);


}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  
alert(msg);

}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;
 

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);
  board [y][x] = currPlayer;
 

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
 
  // check if any cell is has Null,if so then the board is not full. if any cell does have null the function return false and does nothing. Otherwise it returns true and calls endgame. 
 if( board.every(row => row.every(cell=> cell)))
 {
   return endGame('This game is a tie!');
 }
  

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2:1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.
   //determines if 4 cells horizontally, vertically or diagonally have the same player number
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]]; // checks to horizontally to see if same player  occupies four consectivally
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]]; //checks vertical consecutive
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]]; // checks diagonal up
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]]; // checks diagonal down
      

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();

