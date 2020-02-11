class Piece {
    constructor(player){
        this.player = player;
        this.isKing = false;
    }
    move(){
    }
}

// Cached elements
const sqrEls = document.querySelectorAll('.board > div.black-board');
const msgEl = document.querySelector('h3');

//EventListeners
document.querySelector('.board').addEventListener('click', handleBoardClick);

//Variables
let turn, winner, score, board, selectedPiece;

function init(){
    board = new Array(32).fill(null);
    for (let i = 0; i < 12; i++) board[i] = new Piece(1);
    for (let i = 20; i < 32; i++) board[i] = new Piece(-1);
    turn =  1
    console.log(board)
    winner = null;
    selectedPiece = null;
    render();
}
init()

function flipTurn (){
    turn *= -1;
    console.log("Turn fliped")
}

function renderBoard(){
    sqrEls.forEach(function(el, idx){
        let cls;
        if(!board[idx]){
            cls = 'empty';
        } else if(board[idx] === selectedPiece){
            cls = 'selected-peg';
        } else if(board[idx].player === 1){
            cls = 'blue-peg';
        } else if(board[idx].player === -1){
            cls = 'gold-peg';
        } 
        el.innerHTML = `<div class="${cls}"></div>`;

    });
}

function render(){
    renderBoard();
    msgEl.textContent = `It's ${turn === 1 ? "Blue's" : "Gold's"} turn`
}

function handleBoardClick(evt){
    
}