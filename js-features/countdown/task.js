class CountdownTimer {
  constructor(hours, minutes, seconds) {
    if (!this.isTimeCorrect(hours) || !this.isTimeCorrect(minutes) || !this.isTimeCorrect(seconds)) {
      throw new Error(`Wrong params`);
    }

    this.hours = document.getElementById('hours');
    this.minutes = document.getElementById('minutes');
    this.seconds = document.getElementById('seconds');
    this.downloadLink = document.getElementById('download-link');
    this.endTime = new Date().getTime() + hours * (60 * 60 * 1000) + minutes * (60 * 1000) + seconds * 1000;
  }

  isTimeCorrect(value) {
    return value === 0 ? true : value ? true : false;
  }

  start() {
    const interval = setInterval(() => {
      let now = new Date().getTime();
      let timeleft = this.endTime - now;
      let days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
      let hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

      this.hours.textContent = this.formatTime(hours);
      this.minutes.textContent = this.formatTime(minutes);
      this.seconds.textContent = this.formatTime(seconds);

      if (timeleft < 0) {
        clearInterval(interval);
        alert(`Поздравляем, вы выиграли!`);
        this.hours.textContent = `00`;
        this.minutes.textContent = `00`;
        this.seconds.textContent = `00`;
        this.downloadLink.click();
      }
    }, 1000);
  }

  formatTime(time) {
    return time.toString().length === 1 ? `0${time}` : time;
  }
}

const timer = new CountdownTimer(0, 0, 10);
timer.start();
