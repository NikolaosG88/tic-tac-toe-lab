
/*-------------------------------- Constants --------------------------------*/
let board;
let turn;
let winner;
let tie;
let msg;
let squareIndex;

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];





/*---------------------------- Variables (state) ----------------------------*/


/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr');
// console.log(quareEls);
const messageEl = document.querySelector('#message');
// console.log(messageEl);
const resetBtnEl = document.querySelector('#reset');

/*-------------------------------- Functions --------------------------------*/
const init = () => {
board = ['', '', '', '', '', '', '', '', ''];
turn = 'x';
winner = false;
tie = false;
render();
};

const updateBoard = () => {
   board.forEach((square, index) => {
   if (square === 'x') {
    squareEls[index].textContent = 'x'
   } else if (square === 'o') {
    squareEls[index].textContent = 'o'
   } else { 
    squareEls[index].textContent = '' 
}
   })
};
    


const updateMessage = () => {
    if (winner === false && tie === false) {
    messageEl.textContent = `It is  ${turn} to play`;
    } else if (winner === false && tie === true) {
        messageEl.textContent = 'Tie game';
    } else {
        messageEl.textContent = `Player ${turn} won!`;
    }
};

const render = () => {
    updateBoard();
    updateMessage();
};


const handleClick = (event) => {
    const squareIndex = event.target.id;
    if (squareIndex === 'x' || squareIndex === 'o' || winner === true) {
         return;
    }
    placePiece(squareIndex);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
}

const placePiece = (index) => {
   board[index] = turn;
//    console.log(board);
}

const checkForWinner = () => {
    winningCombos.forEach((winnerCombo) => {
        if (board[winnerCombo[0]] !== '' && 
            board[winnerCombo[0]] === board[winnerCombo[1]] && 
            board[winnerCombo[0]] === board[winnerCombo[2]]) {
            winner = true;
            }
    })
    //  console.log(winningCombos.length);
}

const checkForTie = () => {
    if (winner === true) {
        return;
    }
    if (!board.includes('')) {
       tie = true;
    }
}

const switchPlayerTurn = () => {
    if (winner === true) {
        return;
    } 
    if(turn === 'x') {
        turn = 'o'
    } else {
        turn = 'x'
    }
}

init();  

//     /*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach((square) => {
    square.addEventListener('click', handleClick);
});

resetBtnEl.addEventListener('click', init);



