// Cached elements
blackBoard = document.querySelectorAll('.black-board');
const bluePeg = document.querySelectorAll('.blue-peg');
const goldPeg = document.querySelectorAll('.gold-peg');
const empty = document.querySelectorAll('.empty');

//Constants
const players = {
    empty: empty,
    bluePeg: 1,
    goldPeg: -1,
    king: false,
    
}

//Variables
let turn, winner, score, board

function init(){
    board = new Array(32).fill(null);
    // for (let i = 0; i < 12; i++) board[i] = new players(1);
    // for (let i = 19; i < 32; i++) board[i] = new players(-1);
    turn =  1
    console.log(turn)
    win = null;
}


function removeEl(){
    
    for (let i=0; i < blackBoard.length; i++){
   blackBoard[i].addEventListener('click', function(r){
       if(r.target.classList.contains("empty")){
           console.log("THIS IS THE CURRENT TURN: ", turn)
           r.target.classList.remove('empty')
           r.target.classList.add(turn === 1 ? 'blue-peg' : 'gold-peg')
           flipTurn()
        }  else if(r.target.classList.remove('blue-peg')){
            console.log('blue run')
            r.target.classList.remove('blue-peg')
            r.target.classList.add('empty')
            } else {
                r.target.classList.remove('gold-peg')
                r.target.classList.add('empty')
            }
         })     
    }
};

init()
removeEl()

function flipTurn (){
    turn *= -1;
    console.log("Turn flip")
}
