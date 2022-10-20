// fills in remaining cells with zeros
function fill(){
    var table = document.getElementById('grid');
    for (i = 0; i < 9; i++){
        var cells = table.rows[i].cells;
        for(var j = 0; j < 9; j++){
            if (cells[j].getElementsByTagName("input")[0].value.length < 1){
                cells[j].getElementsByTagName("input")[0].value = 0;
            }
        }
    }
}

// finds next empty cell in board, returns [-1,-1] if there are no empty spaces
function nextEmpty(board) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] === 0) 
                return [i, j];
        }
    }
    return [-1, -1];
}

// checks if num is valid at a given index
function valid(board, row, column, value) {
    // checks row
    for(var i = 0; i < board[row].length; i++) {
        if(board[row][i] === value) {
            return false;
        }
    }
    
    // checks column
    for(var i = 0; i < board.length; i++) {
        if(board[i][column] === value) {
            return false;
        }
    }
    
    // starting row and column of square
    boxRow = Math.floor(row / 3) * 3;
    boxCol = Math.floor(column / 3) * 3;
    
    // checks square
    for (var r = 0; r < 3; r++){
        for (var c = 0; c < 3; c++){
            if (board[boxRow + r][boxCol + c] === value)
                return false;
        }
    }
    return true; 
}

// solves sudoku using backtracking
function solveSudoku(board) {  
    let next = nextEmpty(board);
    let row = next[0];
    let col = next[1];

    if (row === -1){
        return board;
    }

    for(let num = 1; num<=9; num++){
        if (valid(board, row, col, num)){
            board[row][col] = num;
            solveSudoku(board);
        }
    }

    if (nextEmpty(board)[0] !== -1)
        board[row][col] = 0;
        
    return board;
}

// creates a board of given values, then uses solveSudoku to solve the sudoku and updates the table
function solve(){
    // creates a board of given values
    var table = document.getElementById('grid');
    var board = [];

    for (i = 0; i < 9; i++){
        var cells = table.rows[i].cells;
        var row = [];
        for (j=0; j<9; j++){
            row.push(parseInt(cells[j].getElementsByTagName("input")[0].value));
        }
        board.push(row);
    }

    solution = solveSudoku(board);

    // updates table with solution
    var table = document.getElementById('grid');
    
    for (i = 0; i < 9; i++){
        var cells = table.rows[i].cells;
        for(var j = 0; j < 9; j++){
            cells[j].getElementsByTagName("input")[0].value = solution[i][j];
        }
    }
}