// convert number to uppercase letter (0 being A)
const numToUpperLetter = number => String.fromCharCode(65 + number);

// create row title to the left of each row
const createRowTitle = rowIndex => {
  // each row begins with a legend <td> showing the row index, starting from 1
  const $legendTr = $('<td>').addClass('legendTr').append(rowIndex + 1);
  return $('<tr>').append($legendTr);
};

// create column title over the first row of <td>s
const createColTitle = width => {
  // the first row should be column legend of <td>s
  // first add an empty <td> at the top left corner
  const $emptyTd = $('<td>').addClass('legendTd');
  const $legendTr = $('<tr>').append($emptyTd);
  // then add the legend <td>s
  for (let j = 0; j < width; j++) {
    const $legendTd = $('<td>').addClass('legendTd').append(`${numToUpperLetter(j)}`);
    $legendTr.append($legendTd);
  }
  return $legendTr;
};

// create columns in a row
const createCol = (rowIndex, width) => {
  // add a row title first
  const $row = createRowTitle(rowIndex);
  // then append <td> in that row
  for (let j = 0; j < width; j++) {
    // construct each td id (A1 ~ J10)
    const id = `${numToUpperLetter(j)}${rowIndex + 1}`;
    const $cell = $('<td>').attr('id', id);
    $row.append($cell);
  }
  return $row;
};

// create a board based on given dimensions
const createBoard = dim => {
  // create a board element
  const $table = $('#my-board table');
  // append the col legend row first
  $table.append(createColTitle(dim.width));

  // repeate the column-making for x number of rows
  for (let i = 0; i < dim.height; i++) {
    // for each row, create x number of columns
    const $row = createCol(i, dim.width);
    $table.append($row);
  }
  return $table;
};

// module is undefined in the browser in client-side JS
// associate whatever gets exported to the window scope
// reference: https://www.matteoagosti.com/blog/2013/02/24/writing-javascript-modules-for-both-browser-and-node/
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = createBoard;
} else {
  window.createBoard = createBoard;
}
