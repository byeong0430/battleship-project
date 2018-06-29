// firstCell: cell at which your shiphead will be placed
// len: length of your ship
// coord: h (horizontal), v (vertical)
// dim: table dimensions (object)
const selectCells = (firstCell, len, coord, dim) => {
  const result = [];
  // standardise col to uppercase
  const col = /\w/ig.exec(firstCell)[0].toUpperCase();
  // convert the string to number
  const row = Number(/\d+/.exec(firstCell)[0]);

  for (let i = 0; i < len; i++) {
    // standardise coord to lowercase
    if (coord.toLowerCase() === 'h') {
      // A1, horizontal, 5 => outcome: [A1, B1, C1, D1, E1]
      // procedure: 1. convert the starting col (i.e. 'A') to number
      // 2. if that number < 26 (25 = 'Z') & <= table width, add 1 & convert it back to letter
      const letterNum = tableFunc.upperLetterToNum(col) + i;
      const newCol = tableFunc.numToUpperLetter(letterNum);
      if (letterNum < dim.width & letterNum < 26) result.push(`${newCol}${row}`);
    } else if (coord.toLowerCase() === 'v') {
      // A1 => vertical 5: [A1, A2, A3, A4, A5]
      // if the last cell row doesn't exceed the table height, the add i to each row index
      if (row + i <= dim.height) result.push(`${col}${row + i}`);
    }
  }
  return result;
};

const showShipLocation = (shipSize, cellLine) => {
  const className = (shipSize !== cellLine.length) ? 'warning' : 'ok';

  // first, remove 'warning' and 'ok' from <td> class  
  $('#my-board td').removeClass('warning ok');
  // then add appropriate class name to newly selected cells
  cellLine.forEach(cell => {
    $(`#${cell}`).addClass(className);
  });
};

const getLocation = (event, numClicks, shipSize, tableDim) => {
  // get the cell id
  // if you click on something other than <td>, targetCell becomes an empty value. in this case, stop executing subsequent code
  const shipHeadCell = event.target.id;
  if (!shipHeadCell) return;

  // if numClicks is odd, set coordination to horizontal. otherwise vertical
  // this allows us to alternate the coordinates back and forth
  const coord = (numClicks % 2) ? 'h' : 'v';
  return selectCells(shipHeadCell, shipSize, coord, tableDim);

  // console.log(`cell head: ${shipHeadCell}`, coord, `length: ${shipSize}`, selectedCells);
};

const showWarning = (shipSize, cellLine) => {
  // if ship length !== selectedCells.length, this is because ship is outside the table range
  // in this case, create an alert
  const warning = (shipSize !== cellLine.length) ? 'ship out of bound' : '';

  const tooltip = $('span.tooltip').text(warning);
  const x = event.clientX;
  const y = event.clientY;
  tooltip.css('top', `${y - 650}px`);
  tooltip.css('left', `${x}px`);
};

// place ship on the table
const placeShip = (mouseE, clickNum, shipLength, tblDim) => {
  const selectedCells = getLocation(mouseE, clickNum, shipLength, tblDim);
  showShipLocation(shipLength, selectedCells);
  showWarning(shipLength, selectedCells);
};

// module is undefined in the browser in client-side JS
// associate whatever gets exported to the window scope
// reference: https://www.matteoagosti.com/blog/2013/02/24/writing-javascript-modules-for-both-browser-and-node/
window.placeShip = placeShip;