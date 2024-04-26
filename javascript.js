document.addEventListener('DOMContentLoaded', function() {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const resetBtn = document.getElementById('resetBtn');
    let currentPlayer = 'X';
    let gameActive = true;

    function checkWinner() {
        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (cells[a].innerHTML && cells[a].innerHTML === cells[b].innerHTML && cells[a].innerHTML === cells[c].innerHTML) {
                cells[a].classList.add('winner');
                cells[b].classList.add('winner');
                cells[c].classList.add('winner');
                gameActive = false;
                return true;
            }
        }

        return false;
    }

    function checkDraw() {
        return [...cells].every(cell => cell.innerHTML);
    }

    function handleClick(e) {
        const cell = e.target;
        const cellIndex = parseInt(cell.id);

        if (!gameActive || cell.innerHTML) return;

        cell.innerHTML = currentPlayer;

        if (checkWinner()) {
            alert(`Player ${currentPlayer} wins!`);
            gameActive = false;
            return;
        }

        if (checkDraw()) {
            alert("It's a draw!");
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function resetGame() {
        cells.forEach(cell => {
            cell.innerHTML = '';
            cell.classList.remove('winner');
        });
        currentPlayer = 'X';
        gameActive = true;
    }

    cells.forEach(cell => cell.addEventListener('click', handleClick));
    resetBtn.addEventListener('click', resetGame);
});
