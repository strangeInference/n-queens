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
  var solution = new Board({n:n}); //fixme
  for (var i = 0; i < n; i++){
    for (var j = 0; j < n; j++) {
      solution.togglePiece(i, j);
      if (solution.hasAnyRooksConflicts()){
        solution.togglePiece(i, j);
      }
    }

  }
  //var subFunc = function(board){

  

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution.rows()));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solution = n;
  for(var i = n-1 ; i > 0; i--){
    solution *= i
  } //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solution);
  return solution;
};

window.copier = function(board){
    var copy = new Board({n:board.attributes.n});
    for (var i = 0; i < board.attributes.n; i++){
      copy.attributes[i] = board.attributes[i].slice();
    }
    return copy;
  };
// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board({n:n}).rows();
  var finished = false;
  
  var subFunc = function(board, n){
    if (n === 0){
      solution = board.rows();
      finished = true;
    } else {
      if(!finished){
        for (var i = 0; i < board.attributes.n; i++){
          for (var j = 0; j < board.attributes.n; j++) {
            if (board.get(i)[j] === 0){
              var newBoard = copier(board);
              newBoard.togglePiece(i, j);
              if (!newBoard.hasAnyQueenConflictsOn(i,j)){
                subFunc(newBoard, n - 1);
              } //else if (n === 0 && )
            }
          }
        }
      } 
    }       
      
  };
  subFunc(new Board({n:n}), n);
  
  // subFunc takes a board
    // if board has conflicts then do nothing
    // for each possible queen placement
      // creat a new board 
      // if n does not equal 0
        // pass the new board, and n - 1 to subFunc

  //var first = subFunc(solution, n);
  

  console.log('Single solution for ' + n + ' queen:', JSON.stringify(solution));
  
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme
    var subFunc = function(board, n, row, col){
    if (n === 0){
      solutionCount++
    } else {
      if(col >= board.attributes.n){
        col=0;
        row++;
      }
      if(row >= board.attributes.n){
        return;
      }
        for (var i = row; i < board.attributes.n; i++){
          for (var j = col; j < board.attributes.n; j++) {
            if (board.get(i)[j] === 0){
              var newBoard = copier(board);
              newBoard.togglePiece(i, j);
              if (!newBoard.hasAnyQueenConflictsOn(i,j)){
                subFunc(newBoard, n - 1, row, col+1);
              } //else if (n === 0 && )
            }
          }
        }
       
    }       
      
  };
  subFunc(new Board({n:n}), n, 0, 0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
