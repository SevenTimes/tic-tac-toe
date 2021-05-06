const newPlayer = (mark, name) => {
  return { mark, name };
};
let player1 = newPlayer('X', 'Player 1');
let player2 = newPlayer('O', 'Player 2');
let currentPlayer = player1;

const GameBoard = (() => {
  const cells = document.getElementsByClassName('cell');
  let gameBoard = [];
  return { cells, gameBoard };
})();

const GameLogic = (() => {
  const p1Name = document.getElementById('p1-name');
  const p2Name = document.getElementById('p2-name');
  const startBtn = document.getElementById('start');
  const resultOutput = document.getElementById('results');
  const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const endTurn = () => {
    switch (currentPlayer) {
      case player1:
        currentPlayer = player2;
        break;
      case player2:
        currentPlayer = player1;
        break;
      default:
        break;
    }
  };
  const updateBoard = () => {
    Array.from(GameBoard.cells).forEach((cell, index) => {
      switch (GameBoard.gameBoard[index]) {
        case 'X':
          cell.classList.add('player-1');
          break;
        case 'O':
          cell.classList.add('player-2');
          break;
        default:
          break;
      }
    });
  };
  const resetGame = () => {
    Array.from(GameBoard.cells).forEach((cell) => {
      cell.classList.remove('player-1', 'player-2');
    });
    GameBoard.gameBoard = [];
    currentPlayer = player1;
    resultOutput.innerText = '';
    updateBoard();
  };
  const checkWinConditions = () => {
    if (
      WIN_CONDITIONS.some((winCondition) =>
        winCondition.every((x) => GameBoard.gameBoard[x] === 'X')
      )
    ) {
      resultOutput.innerText = `${player1.name} WINS!`;
    } else if (
      WIN_CONDITIONS.some((winCondition) =>
        winCondition.every((x) => GameBoard.gameBoard[x] === 'O')
      )
    ) {
      resultOutput.innerText = `${player2.name} WINS!`;
    } else if (
      GameBoard.gameBoard.filter((el) => {
        return el != null;
      }).length === 9
    ) {
      resultOutput.innerText = 'You are tied!';
    }
    updateBoard();
  };
  startBtn.addEventListener('click', () => {
    resetGame();
    if (p1Name.value) player1.name = p1Name.value;
    if (p2Name.value) player2.name = p2Name.value;
    Array.from(GameBoard.cells).forEach((cell, index) => {
      cell.addEventListener('click', () => {
        if (GameBoard.gameBoard[index]) {
          return;
        }
        GameBoard.gameBoard[index] = currentPlayer.mark;
        endTurn();
        checkWinConditions();
      });
    });
  });

  return { updateBoard, resetGame };
})();
