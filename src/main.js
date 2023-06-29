import {SimpleGameApp} from './app/app.js';
import { CellComponent } from './components/cell-component.js';
import {SimpleGameAppComponent} from './components/game-app-component.js';

function main() {
	registerComponents();
  setModalCallbacks();
  showInputForm();
}

function registerComponents() {
	customElements.define('game-app-component', SimpleGameAppComponent);
	customElements.define('cell-component', CellComponent);
}

function setModalCallbacks() {
  const modalEl = document.getElementById('get-player-names');
  const modalBtn = document.getElementById('modal-btn');

  modalBtn.onclick = () => {
    modalEl.style.display = 'none';
    document.firstPlayer = document.getElementById('first-player').value || 'firstPlayer';
    document.secondPlayer = document.getElementById('second-player').value || 'secondPlayer';
    addAppComponent();
  }

  window.onclick = (event) => {
    if (event.target === modalEl) {
      modalEl.style.display = 'none';
      document.firstPlayer = 'firstPlayer';
      document.secondPlayer = 'secondPlayer';
      addAppComponent();
    }
  }
}

function showInputForm() {
  const modalEl = document.getElementById('get-player-names');
  modalEl.style.display = 'block';

}

function addAppComponent() {
	const appComponent = document.createElement('game-app-component');
	document.querySelector('#header').after(appComponent);
}

main();
