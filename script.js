gameboard = [1,2,3,4,5,6,7,8,9];

const GameBoard = (function(){
    const rows = 3;
    const columns = 3; 
    const board = [];

    for (let i = 0; i< rows; i++){
        board[i]= [];
        console.log(board)
        for(let j = 0; j < columns; j++){
            board[i] = [];
        }
    }

    const getBoard = () => board;


})();
