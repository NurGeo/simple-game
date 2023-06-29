export class SimpleGameApp {
  static WIDTH_SIZE = 30;
  static HEIGHT_SIZE = 30;
  static ROW_COUNT = 3;
  static COLUMN_COUNT = 3;

  static FIRST_PLAYER_ICON = 'X';
  static SECOND_PLAYER_ICON = 'Y';
  static UNKNOWN_ICON = '';

  static ROW_SUCCESS = 'row is success';
  static COLUMN_SUCCESS = 'column is success';
  static RIGHT_DOWN_SUCCESS = 'to right and down success';
  static LEFT_DOWN_SUCCESS = 'to left and down success';
  static ALL_CELLS_OPENED = 'finish, all cells opened';
  static NOT_SUCCESS = 'not success';

  static getRightDownIndexes = () => [[0,0], [1,1], [2,2]];
  static getLeftDownIndexes = () => [[0,2], [1,1], [2,0]];
  static getRowIndexes = (row) => [[row, 0], [row, 1], [row, 2]];
  static getColumnIndexes = (col) => [[0, col], [1, col], [2, col]];

  constructor (firstPlayer, secondPlayer) {
    this.firstPlayer = firstPlayer;
    this.secondPlayer = secondPlayer;
    this.currentPlayer = firstPlayer;
    this.status = firstPlayer + ' step';
    const row = [SimpleGameApp.UNKNOWN_ICON, SimpleGameApp.UNKNOWN_ICON, SimpleGameApp.UNKNOWN_ICON];
    this.field = [[...row], [...row], [...row]];
    this.closedCellsCount = 9;
  }

  open(rowIndex, columnIndex) {
    const result = {};
    result.stepResult = this.step_(rowIndex, columnIndex);
    result.playerIcon = this.getPlayerIcon_();

    if (result.stepResult === SimpleGameApp.NOT_SUCCESS) {
      this.currentPlayer = this.currentPlayer === this.firstPlayer
        ? this.secondPlayer
        : this.firstPlayer;
      this.status = `${this.currentPlayer} step`;
      return result;
    }

    if (result.stepResult === SimpleGameApp.ALL_CELLS_OPENED) {
      this.status = 'the game ended in a draw';
      return result;
    }

    this.status = `${this.currentPlayer} winned`
    return result;
  }

  getPlayerIcon_() {
    return this.currentPlayer === this.firstPlayer
      ? SimpleGameApp.FIRST_PLAYER_ICON
      : SimpleGameApp.SECOND_PLAYER_ICON;
  }

  step_(rowIndex, columnIndex) {
    if (this.field[rowIndex][columnIndex] === SimpleGameApp.UNKNOWN_ICON) {
      this.field[rowIndex][columnIndex] = this.getPlayerIcon_();
      this.closedCellsCount -= 1;
    } else {
      throw Error(`open not valid cell, row: ${rowIndex}, column: ${columnIndex}`);
    }

    if (this.rowIsSuccess_(rowIndex)) return SimpleGameApp.ROW_SUCCESS;
    if (this.columnIsSuccess_(columnIndex)) return SimpleGameApp.COLUMN_SUCCESS;
    if (this.rightDownIsSuccess_()) return SimpleGameApp.RIGHT_DOWN_SUCCESS;
    if (this.leftDownIsSuccess_()) return SimpleGameApp.LEFT_DOWN_SUCCESS;
    if (this.closedCellsCount === 0) return SimpleGameApp.ALL_CELLS_OPENED;
    return SimpleGameApp.NOT_SUCCESS;
  }

  rowIsSuccess_(rowIndex) {
    return this.cellsIsSuccess_(SimpleGameApp.getRowIndexes(rowIndex));
  }

  columnIsSuccess_(columnIndex) {
    return this.cellsIsSuccess_(SimpleGameApp.getColumnIndexes(columnIndex));
  }

  rightDownIsSuccess_() {
    return this.cellsIsSuccess_(SimpleGameApp.getRightDownIndexes());
  }

  leftDownIsSuccess_() {
    return this.cellsIsSuccess_(SimpleGameApp.getLeftDownIndexes());
  }

  cellsIsSuccess_(cellsIndexes) {
    const cellsValues = cellsIndexes.map(indexes => this.field[indexes[0]][indexes[1]]);
    return cellsValues.every( value => value === this.getPlayerIcon_())
  }

  get fieldWidth () {
    return SimpleGameApp.ROW_COUNT * SimpleGameApp.WIDTH_SIZE;
  }

  get fieldHeight () {
    return SimpleGameApp.COLUMN_COUNT * SimpleGameApp.HEIGHT_SIZE;
  }
}
