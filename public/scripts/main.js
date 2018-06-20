$(document).ready(function () {
  // define the board dimensions
  const dimensions = { width: 10, height: 10 };
  // create a board
  const $board = createBoard(dimensions);
  // append the board to section#my-board
  $('#my-board').append($board);

});

// A1 => horizontal 5: [A1, B1, C1, D1, E1], 
// A1 => vertical 5: [A1, A2, A3, A4, A5]