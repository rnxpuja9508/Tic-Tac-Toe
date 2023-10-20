document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const message = document.getElementById("message");
    const resetButton = document.getElementById("reset-button");

    let currentPlayer = "X";
    let boardState = ["", "", "", "", "", "", "", "", ""];

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function checkWinner() {
        for (const combo of winningCombinations) {
            const [a, b, c] = combo;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                return boardState[a];
            }
        }
        if (boardState.includes("") === false) {
            return "draw";
        }
        return null;
    }

    function handleCellClick(cell, index) {
        if (boardState[index] === "" && !checkWinner()) {
            boardState[index] = currentPlayer;
            cell.textContent = currentPlayer;
            cell.classList.add(currentPlayer);

            const winner = checkWinner();
            if (winner) {
                if (winner === "draw") {
                    message.textContent = "It's a draw!";
                } else {
                    message.textContent = `Player ${winner} wins!`;
                }
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                message.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    }

    function resetGame() {
        boardState = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        board.innerHTML = "";
        message.textContent = "Player X's turn";
        initializeBoard();
    }

    function initializeBoard() {
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            cell.addEventListener("click", () => handleCellClick(cell, i));
            board.appendChild(cell);
        }
    }

    initializeBoard();
    resetButton.addEventListener("click", resetGame);
});