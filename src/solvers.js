/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n) {
  //  loop
  // Place rook on the next spot
  // Run rook test
    // if fail, undo placement
    // if pass, decrease n
  // increment

  let board = new Board({ n : n });
  for (let i = 0; i < n * n; i++) {
    let row = Math.floor(i / board.attributes.n);
    let column = i % board.attributes.n;
    board.togglePiece(row, column);
    if (board.hasAnyRooksConflicts() === true) {
      board.togglePiece(row, column);
    }
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board));
  return board.rows();
};

//  Adding a piece to the board

//  Base case is you placed n rooks

//  Evaluating a board

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  let board = new Board({n:n})
  let counter = 0;
  var skipTheseColumns = {};
  for (var k = 0; k < n; k++) {
    skipTheseColumns[k] = false;
  }
  function placePieces(moveFwd) {
    for (let i = moveFwd; i < n * n; i++) {
      let row = Math.floor(i / board.attributes.n);
      let column = i % board.attributes.n;
      if (skipTheseColumns[column] === true) {
        continue;
      }
      if (board.attributes[row][column] === 1) {
        continue;
      }
      board.togglePiece(row, column);
      counter++;
      skipTheseColumns[column] = true;
      if (counter < n) {
        placePieces((row + 1) * n);
      }
      if (counter === n) {
        solutionCount++;
        board.togglePiece(row, column);
        counter--;
        skipTheseColumns[column] = false;
      } else {
        board.togglePiece(row, column);
        counter--;
        skipTheseColumns[column] = false;
      }
    }
  }
  //  for each starting position on the first row
  if (n > 0) {
    placePieces(0);
  } else {
    solutionCount = 1;
  }

  

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  let board = new Board({n:n})
  let counter = 0;
  function placePieces(moveFwd) {
    for (let i = moveFwd; i < n * n; i++) {
      let row = Math.floor(i / board.attributes.n);
      let column = i % board.attributes.n;
      if (board.attributes[row][column] === 1) {
        continue;
      }
      board.togglePiece(row, column);
      counter++;
      if (board.hasAnyQueensConflicts()) {
        board.togglePiece(row, column);
        counter--;
      } else {
        if (counter < n) {
          placePieces((row + 1) * n);
        }
        if (counter === n) {
          return;
        } else {
          board.togglePiece(row, column);
          counter--;
        }
      }
    }
  }
  //  for each starting position on the first row
  placePieces(0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(board));
  return board.rows();
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme
  let board = new Board({n:n})
  let counter = 0;
  function placePieces(moveFwd) {
    for (let i = moveFwd; i < n * n; i++) {
      let row = Math.floor(i / board.attributes.n);
      let column = i % board.attributes.n;
      if (board.attributes[row][column] === 1) {
        continue;
      }
      board.togglePiece(row, column);
      counter++;
      if (board.hasAnyQueensConflicts()) {
        board.togglePiece(row, column);
        counter--;
      } else {
        if (counter < n) {
          placePieces((row + 1) * n);
        }
        if (counter === n) {
          solutionCount++;
          board.togglePiece(row, column);
          counter--;
        } else {
          board.togglePiece(row, column);
          counter--;
        }
      }
    }
  }
  //  for each starting position on the first row
  if (n > 0) {
    placePieces(0);
  } else {
    solutionCount = 1;
  }

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
