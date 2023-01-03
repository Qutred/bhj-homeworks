class CookieClicker {
  constructor() {
    this.cookie = document.getElementById('cookie');
    this.clickerCount = document.getElementById('clicker__counter');
    this.clickerSpeed = document.getElementById('clicker__speed');
    this.cookie.onclick = this.onCookieClick.bind(this);
    this.isSizeIncrease = false;
    this.clicksCount = 0;
    this.increaseSizeBy = 1.3;
    this.prevDateOfClick = null;
  }

  onCookieClick({ target }) {
    this.clicksCount++;
    this.updateSpeedTimer();

    if (!this.isSizeIncrease) {
      target.width = target.width * this.increaseSizeBy;
      target.height = target.height * this.increaseSizeBy;
    } else {
      target.width = target.width / this.increaseSizeBy;
      target.height = target.height / this.increaseSizeBy;
    }
    this.isSizeIncrease = !this.isSizeIncrease;
  }

  updateSpeedTimer() {
    if (!this.prevDateOfClick) this.prevDateOfClick = new Date();
    let currentDateOfClick = new Date();
    let deltaDateOfClick = (currentDateOfClick - this.prevDateOfClick) / 1000;
    let speedOfClick = 1 / deltaDateOfClick;
    if (isFinite(speedOfClick)) this.clickerSpeed.textContent = speedOfClick.toFixed(2);
    this.prevDateOfClick = currentDateOfClick;
    this.clickerCount.textContent = this.clicksCount;
  }
}

const cookie = new CookieClicker();
