
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

    return { getBoard }
})();

console.log(GameBoard.getBoard());

// const createPlayer = (function(name, symbol){
//     return { name, symbol };
// });

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

    const playRound = () => {
        
    }

    return{ activePlayer, }

})();