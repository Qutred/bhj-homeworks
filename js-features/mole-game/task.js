class MoleCatcher {
  constructor() {
    this.dead = document.getElementById('dead');
    this.lost = document.getElementById('lost');
    this.catchedMoleQty = 0;
    this.uncatchedMoleQty = 0;
    this.loseGameQty = 5;
    this.winGameQty = 10;
    this.holeQty = document.querySelectorAll('.hole');
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  init() {
    this.holeQty.forEach(item => (item.onclick = this.onClickHandler));
  }

  onClickHandler(e) {
    if (e.target.classList.contains('hole_has-mole')) {
      this.catchedMoleQty += 1;
    } else {
      this.uncatchedMoleQty += 1;
    }

    this.updateHtml();
    this.checkWinLose();
  }

  updateHtml() {
    this.dead.textContent = this.catchedMoleQty;
    this.lost.textContent = this.uncatchedMoleQty;
  }

  checkWinLose() {
    if (this.uncatchedMoleQty === this.loseGameQty) {
      alert('Вы проиграли!');
      this.finishGame();
    } else if (this.catchedMoleQty === this.winGameQty) {
      alert('Победа');
      this.finishGame();
    }
  }

  finishGame() {
    this.catchedMoleQty = 0;
    this.uncatchedMoleQty = 0;
    this.loseGameQty = 5;
    this.winGameQty = 10;
    this.holeQty = 9;
    this.updateHtml();
  }
}

const moleCatcher = new MoleCatcher();
moleCatcher.init();
