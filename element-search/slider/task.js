class SimpleSlider {
  constructor() {
    this.sliderItems = [...document.querySelectorAll('.slider__item')];
    this.prevBtn = document.querySelector('.slider__arrow_prev');
    this.nextBtn = document.querySelector('.slider__arrow_next');
    this.sliderDots = [...document.querySelectorAll('.slider__dot')];
    this.activeSlide = 0;

    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.onDotClick = this.onDotClick.bind(this);

    this.prevBtn.onclick = this.prev;
    this.nextBtn.onclick = this.next;
    this.sliderDots.forEach(item => (item.onclick = this.onDotClick));

    this.setActiveSlideDot();
  }

  next() {
    this.hideOldSlide();
    this.activeSlide += 1;
    this.correctSlide();
    this.showNewSlide();
    this.setActiveSlideDot();
  }

  prev() {
    this.hideOldSlide();
    this.activeSlide -= 1;
    this.correctSlide();
    this.showNewSlide();
    this.setActiveSlideDot();
  }

  onDotClick(e) {
    let activeDot = this.sliderDots.indexOf(e.target);
    this.hideOldSlide();
    this.activeSlide = activeDot;
    this.showNewSlide();
    this.setActiveSlideDot();
  }

  correctSlide() {
    if (this.activeSlide < 0) {
      this.activeSlide = this.sliderItems.length - 1;
    } else if (this.activeSlide > this.sliderItems.length - 1) {
      this.activeSlide = 0;
    }
  }

  hideOldSlide() {
    this.sliderItems[this.activeSlide].classList.remove('slider__item_active');
  }

  showNewSlide() {
    this.sliderItems[this.activeSlide].classList.add('slider__item_active');
  }

  setActiveSlideDot() {
    this.sliderDots.forEach(item => {
      if (item.classList.contains('slider__dot_active')) {
        item.classList.remove('slider__dot_active');
      }
    });
    this.sliderDots[this.activeSlide].classList.add('slider__dot_active');
  }
}

const simpleSlider = new SimpleSlider();
