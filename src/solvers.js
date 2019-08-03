/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/
window.findNRooksSolution = function(n) {
  let board = new Board({ n : n });
  for (let i = 0; i < n * n; i++) {
    let row = Math.floor(i / board.attributes.n);
    let column = i % board.attributes.n;
    board.togglePiece(row, column);
    if (board.hasAnyRooksConflicts() === true) {
      board.togglePiece(row, column);
    }
  }

  return board.rows();
};

window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  let board = new Board({ n });
  let counter = 0;
  var skipTheseColumns = {};
  for (var k = 0; k < n; k++) {
    skipTheseColumns[k] = false;
  }
  placePieces = function(moveFwd) {
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
  };
  if (n > 0) {
    placePieces(0);
  } else {
    solutionCount = 1;
  }

  return solutionCount;
};

window.findNQueensSolution = function(n) {
  let board = new Board({ n });
  let counter = 0;
  placePieces = function(moveFwd) {
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
  };
  placePieces(0);

  return board.rows();
};

window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  let board = new Board({ n });
  let counter = 0;
  placePieces = function(moveFwd) {
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
  };
  if (n > 0) {
    placePieces(0);
  } else {
    solutionCount = 1;
  }
  return solutionCount;
};
