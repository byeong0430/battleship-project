$(document).ready(function () {
  // define the board dimensions
  const tblDim = { width: 10, height: 10 };
  // create a board
  const $board = tableFunc.createBoard(tblDim);
  // append the board to section#my-board
  $('#my-board').append($board);

  // on mouse click
  let clickCount = 0;
  $('#my-board').on('click', (event) => {
    clickCount++;
    // get the cell id
    // if you click on something other than <td>, targetCell becomes an empty value. 
    // in this case, stop executing subsequent code
    const targetCell = event.target.id;
    if (!targetCell) return;

    // if clickCount is odd, set coordination to horizontal. otherwise vertical
    // this allows us to alternate the coordinates back and forth
    const coord = (clickCount % 2) ? 'h' : 'v';

    // select cells by given length
    const shipLength = 5;
    const selectedCells = selectCells(targetCell, shipLength, coord, tblDim);

    // if ship length !== selectedCells.length, this is because ship is outside the table range
    // in this case, create an alert
    const warning = (shipLength !== selectedCells.length) ? 'ship out of bound' : '';
    console.log(`cell head: ${targetCell}`, coord, `length: ${shipLength}`, warning, selectedCells);

    const tooltip = $('span.tooltip').text(warning);
    const x = event.clientX;
    const y = event.clientY;
    tooltip.css('top', `${y - 25}px`);
    tooltip.css('left', `${x}px`);


    // first, remove class from <td>s with class='selected'
    $('td[class="selected"]').removeClass('selected');
    // then add class='selected' to newly selected cells
    selectedCells.forEach(cell => {
      $(`#${cell}`).addClass('selected');
    });
  })
});
