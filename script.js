
const GameBoard = (function(){
    const rows = 3;
    const columns = 3; 
    const board = [];

    for (let i = 0; i< rows; i++){
        board[i]= [];
        for(let j = 0; j < columns; j++){
            board[i].push(null);
        }
    }

    const getBoard = () => board;

    const placeMarker = (row, col, symbol) => {
        if (board[row][col] === null){
            board[row][col] = symbol;
            return true;
        }
        return false; 
    };
    const checkWin = () => {
        for(let i = 0; i < rows; i++){
            if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]){
                return board[i][0];
            }
        }
        for(let j = 0; j < columns; j++){
            if (board[0][j] && board[0][j] === board[1][j] && board[1][j] === board[2][j]){
                return board[0][j];
            }
        }
        if(board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]){
            return board[0][0];
        }
        if(board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]){
            return board[0][2];
        }
        return null;
    }

    const isFull = () => board.every(row => row.every(cell => cell !== null));

    const resetBoard = () => {
        for(let i = 0; i < rows; i++){
            for (let j = 0; j < columns; j++){
                board[i][j] = null;
            }
        }
    }
    
    return { getBoard, placeMarker, checkWin, isFull, resetBoard }
})();

console.log(GameBoard.getBoard());

const GameController = (function(
playerOneName = "Player One",
playerTwoName = "Player two"){
    const board  = GameBoard.getBoard();

    const players = [
        {
        name: playerOneName,
        symbol: "X"
        },
        {   
        name: playerTwoName,
        symbol: "O"
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => { 
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }


    // play round by
    // firstly check to see if the game is in a winning state 
    // let player one choose a spot on the grid to place a symbol
    //  append symbol to the index on the grid created

    const playRound = (row, col) => {
        if (!GameBoard.placeMarker(row, col, activePlayer.symbol)){
            console.log("spot already taken! Choose another.")
            return;
        }
        console.log(`${activePlayer.name} placed ${activePlayer.symbol} at (${row} , ${col})`);
        
        const winnerSymbol = GameBoard.checkWin();

        if (winnerSymbol){
            const winner = players.find(player => player.symbol === winnerSymbol);
            console.log(`${winner.name} wins!`);
            GameBoard.resetBoard();
            return;
        }
        if (GameBoard.isFull()){
            console.log("It's a tie!");
            GameBoard.resetBoard();
            return;
        }

        switchPlayerTurn();

    };

    const getActivePlayer = () => activePlayer;

    return{ playRound, getActivePlayer };

})();