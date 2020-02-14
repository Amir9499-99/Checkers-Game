class Game {
    constructor() {
        this.size = 8;
        this.board = [
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [2, 0, 2, 0, 2, 0, 2, 0],
            [0, 2, 0, 2, 0, 2, 0, 2],
            [2, 0, 2, 0, 2, 0, 2, 0],
        ];
        this.container = document.querySelector('.board');
        this.blueScoreContainer = document.querySelector('.blue-score');
        this.goldScoreContainer = document.querySelector('.gold-score');
        this.turnDisplay = document.querySelector('h3');
        this.playAgain = document.querySelector('.wrapper > .button > button');
        this.activePiece = null;
        this.winner = null;
        this.blueCount = 0;
        this.goldCount = 0;
        this.turn = 1;

        this.render();
    }

    render() {
        this.renderBoard();
        this.renderScore();
    }

    renderBoard() {
        let tile;
        let piece;    
        let click = 'clicked'
        this.container.innerHTML = ""; 
        this.turnDisplay.innerHTML = "Now is player " + this.turn + " turn"; 
        this.playAgain.addEventListener('click', this.game);  
                for (let i = 0; i < this.size; i++) {
                for (let j = 0; j < this.size; j++) {
                tile = document.createElement('div');
                tile.setAttribute('data-x', i);
                tile.setAttribute('data-y', j);
                tile.addEventListener('click', this.handleTileClick.bind(this));

                if ((i + j)%2 === 0) {
                    tile.classList.add('white-tile');
                } else {
                    tile.classList.add('black-tile');
                }

                switch (this.board[i][j]) {
                    case 1: {
                        piece = document.createElement('div');
                        piece.classList.add('blue-piece');
                        piece.addEventListener('click', this.handlePieceClick.bind(this));
                        tile.appendChild(piece);
                        break;
                    } 
                    case 2: {
                        piece = document.createElement('div');
                        piece.classList.add('gold-piece');
                        piece.addEventListener('click', this.handlePieceClick.bind(this));
                        tile.appendChild(piece);
                        break;
                    }
                }
                
                this.container.appendChild(tile);
            }
        }
    }

    renderScore() {
        this.blueScoreContainer.innerHTML = "";
        this.goldScoreContainer.innerHTML = "";
        
        this.trackWinner();
        
        this.blueScoreContainer.innerHTML = this.blueCount;
        this.goldScoreContainer.innerHTML = this.goldCount;
    }

    handlePieceClick(event) {
        const x = Number(event.target.parentElement.getAttribute('data-x'));
        const y = Number(event.target.parentElement.getAttribute('data-y'));

        // It is not your turn;
        if (this.board[x][y] !== this.turn) return;

        this.activePiece = {x, y};

        event.preventDefault();
        event.stopPropagation();
    }

    handleTileClick(event) {
        if (event.target.childNodes.length > 0) return;
        if (!this.activePiece) return;

        const x = Number(event.target.getAttribute('data-x'));
        const y = Number(event.target.getAttribute('data-y'));
        const value = this.board[this.activePiece.x][this.activePiece.y];

        switch(value) {
            case 1: {
                // Gold pieces move up only.
                this.handleMoveDown(x, y, value);
                // Gold pieces strike up only.
                this.handleStrikeDown(x, y, value);
                this.flipTurn();

                break;
            }
            case 2: {
                // Blue pieces move down only.
                this.handleMoveUp(x, y, value);
                // Blue pieces stike down only.
                this.handleStrikeUp(x, y, value);
                this.flipTurn();

                break;
            }
        }

        event.preventDefault();
        event.stopPropagation();

        this.render();
    }

    handleMoveDown(x, y, value) {
        // First condition restricts movement upward, left, right.
        // Second condition restricts movement straight downward.
        if (x - this.activePiece.x === 1
            && Math.abs(y - this.activePiece.y) === 1) {
            this.movePiece(x, y, value);
        }
    }

    handleMoveUp(x, y, value) {
        if (x - this.activePiece.x === -1
            && Math.abs(y - this.activePiece.y) === 1) {
            this.movePiece(x, y, value);
        }
    }

    handleStrikeDown(x, y, value) {
        if (x - this.activePiece.x === 2
            && Math.abs(y - this.activePiece.y) === 2) {
            this.strikePiece(x, y, value);
            this.flipTurn()
       }
       
    }
    
    handleStrikeUp(x, y, value) {
        if (x - this.activePiece.x === -2
            && Math.abs(y - this.activePiece.y) === 2) {
            this.strikePiece(x, y, value);
            this.flipTurn()
        }
       
    }
    
    movePiece(x, y, value) {
        this.board[x][y] = value;
        this.board[this.activePiece.x][this.activePiece.y] = 0;
    }

    strikePiece(x, y, value) {
        // Striked piece location.
        const strikedX = (x + this.activePiece.x) / 2;
        const strikedY = (y + this.activePiece.y) / 2;
        const strikedValue = this.board[strikedX][strikedY];

        // Also it cannot jump over empty tile.
        // Piece of one color can't strike the piece of the same color.
        if (strikedValue === 0 || strikedValue === value) return;

        this.flipTurn();
        this.board[x][y] = value;
        // The striked piece is removed from the game.
        this.board[strikedX][strikedY] = 0;
        this.board[this.activePiece.x][this.activePiece.y] = 0;
    }

    flipTurn() {
        this.turn = this.turn === 1 ? 2 : 1;
    }

    trackWinner() {
        this.blueCount = 0;
        this.goldCount = 0;

        for (const row of this.board) {
            for (const piece of row) {
                if (piece === 1) this.blueCount++;
                else if (piece === 2) this.goldCount++;
            }
        }

        if (this.blueCount === 0) alert('Gold Win!');
        else if (this.goldCount === 0) alert('Blue Win!');
        
    }
}

const game = new Game();