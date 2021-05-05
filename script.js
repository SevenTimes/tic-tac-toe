const newPlayer = (mark) => {
  return { mark };
};
const player1 = newPlayer('X');
const player2 = newPlayer('O');
let currentPlayer = player1;

const GameBoard = (() => {
  const cells = document.getElementsByClassName('cell');
  //   let gameBoard = ['X', 'O', 'O', 'X', 'X', 'O', 'X', 'O', 'X'];
  let gameBoard = [];
  return { cells, gameBoard };
})();

const GameLogic = (() => {
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
  Array.from(GameBoard.cells).forEach((cell, index) => {
    cell.addEventListener('click', () => {
      if (GameBoard.gameBoard[index]) {
        return;
      }
      GameBoard.gameBoard[index] = currentPlayer.mark;
      endTurn();
      updateBoard();
    });
  });
  return { updateBoard };
})();

GameLogic.updateBoard();
