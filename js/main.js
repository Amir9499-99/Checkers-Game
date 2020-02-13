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
        this.render();
        this.activePiece = null;
    }

    render() {
        let square;
        let piece;
        let turn = 1;       

        this.container.innerHTML = "";

        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                square = document.createElement('div');
                square.setAttribute('data-x', i);
                square.setAttribute('data-y', j);
                square.addEventListener('click', this.handleSquareClick.bind(this));

                if ((i + j)%2 === 0) {
                    square.classList.add('white-board');
                } else {
                    square.classList.add('black-board');
                }

                switch (this.board[i][j]) {
                    case 1: {
                        piece = document.createElement('div');
                        piece.classList.add('blue-piece');
                        piece.addEventListener('click', this.handlePieceClick.bind(this));
                        square.appendChild(piece);
                        break;
                    } 
                    case 2: {
                        piece = document.createElement('div');
                        piece.classList.add('gold-piece');
                        piece.addEventListener('click', this.handlePieceClick.bind(this));
                        square.appendChild(piece);
                        break;
                    }
                }
                
                this.container.appendChild(square);
            }
        }
    }

    handlePieceClick(event) {
        const x = event.target.parentElement.getAttribute('data-x');
        const y = event.target.parentElement.getAttribute('data-y');

        this.activePiece = {x, y};
        event.preventDefault();
        event.stopPropagation();
    }

    handleSquareClick(event) {
        const x = event.target.getAttribute('data-x');
        const y = event.target.getAttribute('data-y');
        const value = this.board[this.activePiece.x][this.activePiece.y];

        if (event.target.childNodes.length > 0) return;
        console.log('click to 0')
        switch(value) {
            case 1: {
                // First condition restricts movement upward, left, right.
                // Second condition restricts movement straight downward.
                if (x - this.activePiece.x === 1 && Math.abs(y - this.activePiece.y) === 1) {
                    this.board[x][y] = value;
                    this.board[this.activePiece.x][this.activePiece.y] = 0;
                }

                break;
            }
            case 2: {
                if (x - this.activePiece.x === -1 && Math.abs(y - this.activePiece.y) === 1) {
                    this.board[x][y] = value;
                    this.board[this.activePiece.x][this.activePiece.y] = 0;
                }

                break;
            }
        }

        event.preventDefault();
        event.stopPropagation();
        this.render();
    }
}

const game = new Game();


