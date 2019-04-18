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
window.findNRooksSolution = function(size) {
  var solution = [];
  // check decision tree for n rooks
  // find one valid solution
  // return it
  var addRooks = function(n, board) {
    // for each free space
    // place a piece on the board.
    // repeat whole process with recursion
    if (n === 0) {
      solution.push(board);
      return;
    }
    for (let i = 0; i < Math.pow(board.attributes.n, 2); i++) {
      let row = Math.floor(i / board.attributes.n);
      let column = i % board.attributes.n;
      if (board.attributes[row][column] === 0) {
        let newBoard = new Board(board.rows());
        newBoard.togglePiece(row, column);
        addRooks(n - 1, newBoard);
      }
    }
  };

  addRooks(size, new Board({n: size}));

  console.log('Single solution for ' + size + ' rooks:', JSON.stringify(solution));
  return solution;
};

//  Adding a piece to the board

//  Base case is you placed n rooks

//  Evaluating a board

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
