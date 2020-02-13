class Piece {
    constructor(player) {
        this.player = player;
        this.isKing = false;
    }
    move() {}
}

// Cached elements
const sqrEls = document.querySelectorAll('.board > div.black-board');
const msgEl = document.querySelector('h3');

//EventListeners
sqrEls.forEach((square, idx) => square.addEventListener('click', (e) => handleBoardClick(e, idx)));

//Variables
let winner, score, board, selectedPiece;
let turn = 0;

function init() {
    displayTurn()
    board = new Array(32).fill(null);
    for (let i = 0; i < 12; i++) board[i] = new Piece(0);
    for (let i = 20; i < 32; i++) board[i] = new Piece(1);
    // console.log(board)
    winner = null;
    selectedPiece = null;
    render();
}
init()

function renderBoard() {
    sqrEls.forEach(function(el, idx) {
        let cls;
        if (!board[idx]) {
            cls = 'empty';
        } else if (board[idx] === selectedPiece) {
            cls = 'selected-peg';
        } else if (board[idx].player === 0) {
            cls = 'blue-peg';
        } else if (board[idx].player === 1) {
            cls = 'gold-peg';
        }
        el.innerHTML = `<div class="${cls}"></div>`;

    });
}

function render() {
    renderBoard();


}

function handleBoardClick(evt, idx) {

    console.log(evt.target.className)

    if (evt.target.className !== 'black-board') {
        if (evt.target.className === 'blue-peg' && turn % 2 === 0) {
            evt.target.classList.remove('blue-peg');
            evt.target.classList.add('empty');
        } else if (evt.target.className === 'gold-peg' && turn % 2 === 1) {
            evt.target.classList.remove('gold-peg')
            evt.target.classList.add('selected-peg-gold')
        } else if (evt.target.className === 'empty' && turn % 2 === 0) {
            evt.target.classList.remove('empty')
            evt.target.classList.add('blue-peg');
            flipTurn()
            displayTurn()
        } else {
            evt.target.classList.remove('empty')
            evt.target.classList.add('gold-peg');
            flipTurn()
            displayTurn()
        }
    }
}

function flipTurn() {
    turn++;
}

function displayTurn() {
    msgEl.textContent = `It's ${(turn % 2 === 0) ? "Blue's" : "Gold's"} turn`
}