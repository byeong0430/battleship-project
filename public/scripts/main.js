$(() => {
  const { createBoard } = tableFunc;

  // define the board dimensions
  const tblDim = { width: 10, height: 10 };
  // create a board
  const $board = createBoard(tblDim);
  // append the board to section#my-board
  $('#my-board').append($board);


  let clickCount = 0;
  const shipLength = 5;
  // on double-click, change ship orientation
  $('#my-board').on('dblclick', e => {
    clickCount++;
    placeShip(e, clickCount, shipLength, tblDim);
  })

  // on click, show ship location
  $('#my-board').on('click', e => {
    placeShip(e, clickCount, shipLength, tblDim);
  })
});
