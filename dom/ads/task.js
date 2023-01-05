class Rotator {
  constructor() {
    this.rotators = [...document.querySelectorAll('.rotator')];
    this.rotators.forEach(item => this.rotatorHandler(item));
  }

  rotatorHandler(rotator) {
    let rotatorItems = [...rotator.querySelectorAll('.rotator__case')];
    let activeItem = rotatorItems.indexOf(rotator.querySelector('.rotator__case.rotator__case_active')) || 0;

    const rotatorAction = activeItem => {
      let color = rotatorItems[activeItem].dataset.color;
      let speed = Number(rotatorItems[activeItem].dataset.speed);
      rotatorItems[activeItem].style.color = color;

      setTimeout(() => {
        rotatorItems[activeItem].classList.remove('rotator__case_active');
        activeItem++;
        if (activeItem > rotatorItems.length - 1) activeItem = 0;
        rotatorItems[activeItem].classList.add('rotator__case_active');
        rotatorAction(activeItem);
      }, speed);
    };

    rotatorAction(activeItem);
  }
}

new Rotator();
