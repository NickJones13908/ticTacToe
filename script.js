
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

// const createPlayer = ((name, marker) =>{
//     return { name, marker };
// })();

// const player1 = createPlayer('Steve', 'X');
// const player2 = createPlayer('john', 'O');
// console.log(player1);
