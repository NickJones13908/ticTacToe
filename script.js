
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

    let players = [
        {name: "Player One", symbol: "X"},
        {name: "Player Two", symbol: "O"}
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => { 
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const setPlayers = (name1, name2) => {
        players[0].name = name1 || "Player One";
        players[1].name = name2 || "Player Two";
    }

    const playRound = (row, col) => {
        if (!GameBoard.placeMarker(row, col, activePlayer.symbol)){
            return "spot already taken! Choose another.";
        }
        console.log(`${activePlayer.name} placed ${activePlayer.symbol} at (${row} , ${col})`);
        
        const winner = GameBoard.checkWin();
        if (winner){
            const winnerplayer = players.find(p => p.symbol === winner);
            console.log(`${winnerplayer.name} wins!`);
            return `${winnerplayer.name} wins!`;
        }
        if (GameBoard.isFull()){
            return "It's a tie!";
        }
        switchPlayerTurn();
        return null;

    };

    const getActivePlayer = () => activePlayer;
    const resetGame = () => {
        GameBoard.resetBoard();
        activePlayer = players[0];
    }

    return{ playRound, getActivePlayer, resetGame, setPlayers };

})();

const DisplayController = (function () {
    let boardDiv, messageDiv, playerTurnDiv, resetGameButton;
  
    const cacheDOM = () => {
      boardDiv = document.querySelector(".board");
      messageDiv = document.querySelector(".message");
      playerTurnDiv = document.querySelector(".playerTurn");
      resetGameButton = document.querySelector(".resetButton");
    };
  
    const bindEvents = () => {
      resetGameButton.addEventListener("click", () => {
        GameController.resetGame();
        updateScreen();
      });
    };
  
    const renderBoard = () => {
      boardDiv.textContent = "";
      const board = GameBoard.getBoard();
  
      board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          const cellButton = document.createElement("button");
          cellButton.classList.add("cell");
          cellButton.dataset.row = rowIndex;
          cellButton.dataset.column = colIndex;
          cellButton.textContent = cell || "";
          boardDiv.appendChild(cellButton);
  
          cellButton.addEventListener("click", () => {
            const message = GameController.playRound(rowIndex, colIndex);
            updateScreen();
            messageDiv.textContent = message || "";
          });
        });
      });
    };
  
    const updatePlayerTurn = () => {
      const player = GameController.getActivePlayer();
      playerTurnDiv.textContent = `${player.name} = The current active player`;
    };
  
    const updateScreen = () => {
      renderBoard();
      updatePlayerTurn();
    };
  
    const init = () => {
      cacheDOM();
      bindEvents();
      updateScreen();
    };
  
    return { init };
})();
  
  // Initialize everything
DisplayController.init();
  