import { SimpleGameApp } from "../app/app.js";

export class SimpleGameAppComponent extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'})
    this.newGame_();
    document.appComponent = this;
  }

  updateStatus() {
    this.shadowRoot.querySelector('div[id="game-status"]').innerHTML = document.app.status;
  }

  finished(stepResult, rowIndex, columnIndex) {
    let cellsIndexes;
    if (stepResult === SimpleGameApp.ROW_SUCCESS)
      cellsIndexes = SimpleGameApp.getRowIndexes(rowIndex);
    else if (stepResult === SimpleGameApp.COLUMN_SUCCESS)
      cellsIndexes = SimpleGameApp.getColumnIndexes(columnIndex);
    else if (stepResult === SimpleGameApp.RIGHT_DOWN_SUCCESS)
      cellsIndexes = SimpleGameApp.getRightDownIndexes();
    else if (stepResult === SimpleGameApp.LEFT_DOWN_SUCCESS)
      cellsIndexes = SimpleGameApp.getLeftDownIndexes();
    else throw Error('not handled stepResult = ' + stepResult);

    cellsIndexes.forEach(indexes => {
      const [rIndex, colIndex] = indexes;
      const queryString = `[row="${rIndex}"][column="${colIndex}"]`;
      const cellEl = this.shadowRoot.querySelector(queryString);
      if (cellEl === null) throw Error('not selected cell: ' + queryString);
      cellEl.classList.add('win-cell');
    });

    const allCellComponents = this.shadowRoot.querySelectorAll('cell-component');
    allCellComponents.forEach(cellEl => {
      cellEl.onclick = null;
      cellEl.classList.add('finished');
    })
  }

  newGame_() {
    this.shadowRoot.innerHTML = `
      ${this.getCss_()}
      ${this.getBaseHtml_()}
    `

    const btn = this.shadowRoot.querySelectorAll('button')[0];
    btn.onclick = () => this.newGame_() ;

    document.app = new SimpleGameApp(document.firstPlayer, document.secondPlayer);
    this.updateStatus();
    this.addCells_();
  }

  getDivIndexes_(cellsIndexes) {
    return cellsIndexes.map(row, column => row * 3 + column);
  }

  getBaseHtml_() {
    return ` 
      <div id="game-container">
        <div id="field"></div>
        <aside id="sidebar">
          <button>New game</button>
        </aside>
        <div id="game-status"></div>
      </div>
    `;
  }

  getCss_() {
    return `<style>
      #game-container {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        margin: 0 auto;
        padding: 10px;
        border: 3px solid gray;
      }

      #field {
        display: inline-grid;
        padding: 10px;
        width: 90px;
        height: 90px;
        grid-template-columns: repeat(3, 30px);
        grid-template-rows: repeat(3, 30px);
      }

      .win-cell {
        background-color: #dddddd;
      }

      .finished, .marked {
        cursor: default;
      }

      #game-status {
        font-size: 1.2em;
        font-weight: bold;
      }

      aside {
        padding: 10px;
      }
    </style>`
  }

  addCells_() {
    const appEl = this.shadowRoot.getElementById('field');
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const cellEl = document.createElement('cell-component');
        cellEl.setAttribute('row', row);
        cellEl.setAttribute('column', col);
        appEl.appendChild(cellEl);
      }
    }
  }
}
