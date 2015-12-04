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
window.solutionSearch = function(board, n, rows, callback, conflictChecker){
  //console.log('works at all');
  if (rows === n){
    console.log('gets to the end');
    return callback();
  }
  for(var i = 0 ; i < n; i++){
    board.togglePiece(rows,i);
    //console.log(board.rows());
    if(!board[conflictChecker]()){
      //console.log('passes conflictChecker');
      var result = solutionSearch(board, n, rows + 1, callback, conflictChecker);
      if(result){
        return result;
      }
    }
    board.togglePiece(rows,i);
  }

};


window.findNRooksSolution = function(n) {file:///Users/student/2015-11-n-queens/SpecRunner.html?grep=solvers%20countNRooksSolutions()
  var board = new Board({n:n});
  var solution = board;
  var callback = function(){
    return _.map(board.rows(), function(row){
      return row.slice();
    });
  };
  solution = solutionSearch(board, n, 0, callback, 'hasAnyRooksConflicts');


  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n:n});

  solutionSearch(board, n, 0, function(){ solutionCount++;}, 'hasAnyRooksConflicts');

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n:n});
  var solution = solutionSearch(board, n, 0, function(){
    return _.map(board.rows(), function(row){
      return row.slice();
    });
  }, 'hasAnyQueensConflicts') || board.rows();

  
  // subFunc takes a board
    // if board has conflicts then do nothing
    // for each possible queen placement
      // creat a new board 
      // if n does not equal 0
        // pass the new board, and n - 1 to subFunc

  

  console.log('Single solution for ' + n + ' queen:', JSON.stringify(solution));
  
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme
  var board = new Board({n:n});
  solutionSearch(board, n, 0, function(){solutionCount++;}, 'hasAnyQueensConflicts');

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
