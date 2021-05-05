const newPlayer = (mark) => {
  return { mark };
};
const player1 = newPlayer('X');
const player2 = newPlayer('O');
let currentPlayer = player1;

const GameBoard = (() => {
  const cells = document.getElementsByClassName('cell');
  let gameBoard = [];
  return { cells, gameBoard };
})();

const GameLogic = (() => {
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
    GameBoard.gameBoard = [];
    currentPlayer = player1;
    Array.from(GameBoard.cells).forEach((cell) => {
      cell.classList.remove('player-1', 'player-2');
    });
    updateBoard();
  };
  const checkWinConditions = () => {
    if (
      WIN_CONDITIONS.some((winCondition) =>
        winCondition.every((x) => GameBoard.gameBoard[x] === 'X')
      )
    ) {
      console.log('Player 1 WINS!');
      resetGame();
    } else if (
      WIN_CONDITIONS.some((winCondition) =>
        winCondition.every((x) => GameBoard.gameBoard[x] === 'O')
      )
    ) {
      console.log('Player 2 WINS!');
      resetGame();
    }

    if (
      GameBoard.gameBoard.filter((el) => {
        return el != null;
      }).length === 9
    ) {
      console.log('You are tied!');
      resetGame();
    }
  };
  Array.from(GameBoard.cells).forEach((cell, index) => {
    cell.addEventListener('click', () => {
      if (GameBoard.gameBoard[index]) {
        return;
      }
      GameBoard.gameBoard[index] = currentPlayer.mark;
      updateBoard();
      checkWinConditions();
      endTurn();
    });
  });
  return { updateBoard };
})();

GameLogic.updateBoard();
