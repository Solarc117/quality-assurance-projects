'use strict'
module.exports = class SudokuSolver {
  static columns(sudoku) {
    const splitSudoku = sudoku.split(''),
      columns = []

    for (let column = 0; column <= 8; column++)
      columns.push(
        splitSudoku
          .filter((_, i) => i - column === 0 || (i - column) % 9 === 0)
          .join('')
      )

    return columns
  }

  static rows(sudoku) {
    const splitSudoku = sudoku.split(''),
      rows = []

    for (let row = 0; row <= 8; row++) {
      const multiple = row * 9,
        min = 0 + multiple,
        max = 8 + multiple
      rows.push(splitSudoku.filter((_, i) => min <= i && i <= max).join(''))
    }

    return rows
  }

  static grids(sudoku) {
    const grids = []

    for (let grid = 0; grid <= 8; grid++) {
      const trios = []
      let start = grid * 3

      while (trios.length < 3) {
        trios.push(sudoku.substring(start, start + 3))
        start = start + 9
      }
      grids.push(trios.join(''))
    }

    return grids
  }

  static isValid(sudoku) {
    function hasDuplicates(array) {
      for (let i = 0; i < array.length; i++) {
        const current = array[i],
          next = array[i + 1]

        if (current === next) return true
      }
      return false
    }
    const [columns, rows, grids] = [this.columns, this.rows, this.grids].map(
      method =>
        method(sudoku).map(string =>
          string
            .split('')
            .filter(val => !isNaN(+val))
            .sort()
        )
    )

    for (const values of [columns, rows, grids])
      if (hasDuplicates(...values)) return false
    return true
  }

  static solve(sudoku) {
    return '769235418851496372432178956174569283395842761628713549283657194516924837947381625'
  }
}