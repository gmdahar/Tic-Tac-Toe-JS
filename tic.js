
function refreshPage()
{
    location.reload(); 
}

document.addEventListener('DOMContentLoaded', () => {
    let currentPlayer = 'X';
    let gameState = Array(9).fill(null);

    var cells = document.querySelectorAll('.cell');

    var gameStatus = document.getElementById('game-status');


    // Update cursor on hover based on current player's turn
    cells.forEach(cell => {
        cell.addEventListener('mouseenter', () => {
            if (!gameState[cell.getAttribute('data-index')]) {
                cell.classList.add(currentPlayer === 'X' ? 'x-hover' : 'o-hover');
            }
        });
        cell.addEventListener('mouseleave', () => {
            cell.classList.remove('x-hover', 'o-hover');
        });
    });

// Code for Click Event 

    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            var cellIndex = cell.getAttribute('data-index');
            
            // Ensure cell is not already clicked
            if (gameState[cellIndex] || checkWin(gameState)) 
                {return;}

            gameState[cellIndex] = currentPlayer;
            cell.innerText = currentPlayer;
            cell.classList.remove('x-hover', 'o-hover');

            var winPattern = checkWin(gameState);
            if (winPattern) {
                gameStatus.textContent = `Player ${currentPlayer} Wins!`;
                drawWinningLine(winPattern);
            } else if (gameState.every(cell => cell)) 
                {
                gameStatus.textContent = 'Game Draw';
                } 
            else {
                // using the ternary operator 

                // if (currentPlayer === 'X') {
                //     currentPlayer = 'O';
                // } else {
                //     currentPlayer = 'X';
                // }

                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        });
    });



    function checkWin(state) 
        {
                    // an array of arrays, where each sub-array contains indices 
                    // of the game state that form a winning combination. 
                   
                    var winPatterns = [
                        [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
                        [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
                        [0, 4, 8], [2, 4, 6]             // diagonal
                    ];


                    return winPatterns.find(pattern => {
                                        var [a, b, c] = pattern;
                                        return state[a] && state[a] === state[b] && state[a] === state[c];
                    });
         }



    function drawWinningLine(pattern) {

        var line = document.createElement('div');
        line.classList.add('line');

        var [a, b, c] = pattern;
        var cellA = document.getElementById(`cell-${a}`);
        var cellB = document.getElementById(`cell-${b}`);
        var cellC = document.getElementById(`cell-${c}`);


        // to get the position and size of each cell element.
        var cellAOffset = cellA.getBoundingClientRect();
        var cellBOffset = cellB.getBoundingClientRect();
        var cellCOffset = cellC.getBoundingClientRect();

        //The position and size of the game container (.tic-tac-toe) is retrieved.
        var parentOffset = document.querySelector('.tic-tac-toe').getBoundingClientRect();
       
        // using Pythagorean theorem

        var lineWidth = Math.sqrt(
            Math.pow(cellCOffset.left - cellAOffset.left, 2) + Math.pow(cellCOffset.top - cellAOffset.top, 2)
        );

        line.style.width = `${lineWidth}px`;
        line.style.height = '4px';
        line.style.backgroundColor = '#333';
        line.style.position = 'absolute';
        line.style.zIndex = '1';
        line.style.transformOrigin = '0 0';

        //Math.atan2 returns the angle (in radians) between the positive x-axis and the point (x, y).
        line.style.transform = `rotate(${Math.atan2(cellCOffset.top - cellAOffset.top, cellCOffset.left - cellAOffset.left) * 180 / Math.PI}deg)`;
        line.style.left = `${cellAOffset.left - parentOffset.left + cellA.offsetWidth / 2}px`;
        line.style.top = `${cellAOffset.top - parentOffset.top + cellA.offsetHeight / 2}px`;

        document.querySelector('.tic-tac-toe').appendChild(line);
    }
});
