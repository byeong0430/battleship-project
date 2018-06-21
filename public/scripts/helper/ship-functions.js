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

// module is undefined in the browser in client-side JS
// associate whatever gets exported to the window scope
// reference: https://www.matteoagosti.com/blog/2013/02/24/writing-javascript-modules-for-both-browser-and-node/
window.selectCells = selectCells;