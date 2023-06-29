import { SimpleGameApp } from "../app/app.js";

export class CellComponent extends HTMLElement {

  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      ${this.getCss_()}
      <div></div>
    `;
    this.onclick = this.open;
  }

  open() {
    const div = this.shadowRoot.querySelector('div')

    const rowIndex = Number(this.getAttribute('row'));
    const columnIndex = Number(this.getAttribute('column'));

    const result = document.app.open(rowIndex, columnIndex);
    div.textContent = result.playerIcon;
    document.appComponent.updateStatus();
    this.classList.add('marked');
    this.onclick = null;

    if (result.stepResult !== SimpleGameApp.NOT_SUCCESS && result.stepResult !== SimpleGameApp.ALL_CELLS_OPENED)
      document.appComponent.finished(result.stepResult, rowIndex, columnIndex);
  }

  getCss_() {
    return `<style>
      :host {
        outline: 1px solid gray;
        font-weight: bold;
        font-size: 16px;
        color: #000000;
        cursor: pointer;
      }
      :host > div {
        text-align: center;
        transform: translateY(50%);
      }
    </style>`
  }
}
