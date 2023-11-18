function getRandomInt(min,max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random()* (max - min + 1)) + min;
}


function generateSequence(){
    const sequence = ['I','J','L','O','S','T','Z'];
    while(sequence.length){
        const rand = getRandomInt(0,sequence.length - 1);
        const name = sequence.splice(rand, 1 )[0];
        tetrominoSequence.push(name);
    }
}

function getNextTetromino(){
    if(tetrominoSequence.length === 0){
        generateSequence();
    }
    const name = tetrominoSequence.pop();
    const matrix = tetrominos[name];
    const col = playfield[0].length / 2 - Math.cell(matrix[0].length / 2);
    const row = name === 'I'? - 1 : - 2;
    return{
        name: name,
        matrix: matrix,
        row: row,
        col: col
    }
}

function rotate(matrix){
    const N = matrix.length - 1;
    const result = matrix.map((row, i)=> row.map((val, j) => matrix[N - j][i]))
    return result;
}

function isValidMove(matrix, cellRow, cellCol){
    for(let row = 0; row < matrix.length; row ++){
        for(let col = 0; col < matrix[].length; col ++){
            if(matrix[row][col] && (cellCol + col < 0 || cellCol + col >= playfield[0].length || cellRow + row >= playfield.length || playfield[cellRow + row][cellCol + col])
            ){
                return false;
            }
            
        }

    }
    return true;
}

function playTetromino(){
    for(let row = 0; row < tetromino.matrix.length; row ++){
        for(let col = 0;col < tetromino.matrix[row].length; col ++){
            if(tetromino.matrix[row][col])
            {
                if(tetromino.row + row < 0){
                    return showGameOver();
                }
                playfield[tetromino.row + row][tetromino.col + col] = tetromino.name;
            }
        }
    }
    for(let row = playfield.length - 1; row >= 0){
        if(playfield[row].every(cell => !!cell)){
            for(let r = row; r >= 0; r--){
                for(let c = 0; c <playfield[r].length; c++){
                    playfield[r][c] = playfield[r - 1][c];
                }
            }
            }
            else{
                row--;
            }
        }
        tetromino = getNextTetromino();
    }
    function showGameOver(){
        cancelAnimationFrame(rAF);
        gameOver = true;
        context.fillStyle = 'black';
        context.globalAlpha = 0.75;
        context.fillRect(0, canvas.height / 2 - 30, canvas.width, 60);
        context.globalAlpha = 1;
        context.fillStyle = 'white';
        context.font = '36px monospace';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText('You are lose', canvas.width / 2, canvas.height / 2);
    }

    const canvas = document.getElementById('game');
    const context = canvas.getContext('2d');
    const grid = 32;
    const tetrominoSequence = [];
    const playfield = [];

    for(let row = - 2;row < 20; row++){
        playfield[row] = [];
        for(let col = 0;col < 10;col++){
            playfield[row][col] = 0;
        }
    }

    const tetrominos = {
        'I': [
            [0,0,0,0],
            [1,1,1,1],
            [0,0,0,0],
            [0,0,0,0],
        ],
        'J':[
            [1,0,0],
            [1,1,1],
            [0,0,0],
        ],
        'L':[
            [0,0,1],
            [1,1,1],
            [0,0,0],
        ],
        'O':[
            [1,1],
            [1,1],
        ],
        'S':[
            [0,1,1],
            [1,1,0],
            [0,0,0],
        ],
        'Z':[
            [1,1,0],
            [0,1,1],
            [0,0,0],
        ],
        'T':[
            [0,1,0],
            [1,1,1],
            [0,0,0],
        ]
    };

    const colors = {
        'I':'blue',
        'O':'orange',
        'T':'cyan',
        'S':'green',
        'Z':'yellow',
        'J':'purple',
        'L':'red'
    };

    
