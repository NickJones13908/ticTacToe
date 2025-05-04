
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

const GameController = (function(){

    const players = [
        {name: "Player One", symbol: "X"},
        {name: "Player Two", symbol: "O"}
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => { 
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }


    const playRound = (row, col) => {
        if (!GameBoard.placeMarker(row, col, activePlayer.symbol)){
            console.log("spot already taken! Choose another.")
            return "spot already taken! Choose another.";
        }
        console.log(`${activePlayer.name} placed ${activePlayer.symbol} at (${row} , ${col})`);
        
        const winnerSymbol = GameBoard.checkWin();

        if (winnerSymbol){
            const winner = players.find(player => player.symbol === winnerSymbol);
            console.log(`${winner.name} wins!`);
            GameBoard.resetBoard();
            return `${winner.name} wins!`;
        }
        if (GameBoard.isFull()){
            console.log("It's a tie!");
            GameBoard.resetBoard();
            return "It's a tie!";
        }

        switchPlayerTurn();
        return null;

    };

    const getActivePlayer = () => activePlayer;

    return{ playRound, getActivePlayer };

})();

const DisplayController = (function(){
    const game = GameBoard;
    const playerTurnDiv = document.querySelector('.playerTurn');
    const boardDiv = document.querySelector('.board');
    const messageDiv = document.querySelector(".message");
    //console.log(game);

      

    const updateScreen = () =>{

        boardDiv.textContent = "";

        const board = game.getBoard();
        const activePlayer = GameController.getActivePlayer();

        playerTurnDiv.textContent = `${activePlayer.name} = The current active player`

        //updates the screen
        board.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");
                cellButton.dataset.row = rowIndex;
                cellButton.dataset.column = colIndex;
                cellButton.textContent = cell ? cell : "";
                boardDiv.appendChild(cellButton);
                cellButton.addEventListener("click", () => {
                    const row = parseInt(cellButton.dataset.row);
                    const col = parseInt(cellButton.dataset.column);
                    const message = GameController.playRound(row, col);
                    updateScreen();

                    if (message){
                        messageDiv.textContent = message;
                    }
                    else{
                        messageDiv.textContent = "";
                    }
                })
            });
        });

    }
    updateScreen()
})();
