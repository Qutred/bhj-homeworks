class BookReader {
  constructor() {
    this.book = document.querySelector('.book');
    this.fontSizeControls = document.querySelector('.book__control_font-size');
    this.fontSizeElements = [...document.querySelectorAll('.book__control_font-size .font-size')];

    this.colorControls = document.querySelector('.book__control_color');
    this.colorElements = [...document.querySelectorAll('.book__control_color .color')];

    this.bgColorControls = document.querySelector('.book__control_background');
    this.bgColorElements = [...document.querySelectorAll('.book__control_background .color')];

    this.fontSizeHandler = this.fontSizeHandler.bind(this);
    this.colorHandler = this.colorHandler.bind(this);
    this.bgHandler = this.bgHandler.bind(this);

    this.fontSizeControls.addEventListener('click', this.fontSizeHandler);
    this.colorControls.addEventListener('click', this.colorHandler);
    this.bgColorControls.addEventListener('click', this.bgHandler);
  }

  changeStyleHandler(e, type, elements) {
    e.preventDefault();
    let target = e.target.closest(`.${type}`);
    if (target) {
      this.getElement(elements, `${type}_active`).classList.remove(`${type}_active`);
      elements[elements.indexOf(target)].classList.add(`${type}_active`);
      let styleData = target.getAttribute(`data-${type}`);
      let classList = this.book.className.split(' ').filter(className => !className.includes(`book_${type}`));
      styleData
        ? (this.book.className = classList.join(' ') + ` book_${type}-${styleData}`)
        : (this.book.className = classList.join(' '));
    }
  }

  fontSizeHandler(e) {
    this.changeStyleHandler(e, 'font-size', this.fontSizeElements);
  }

  colorHandler(e) {
    this.changeStyleHandler(e, 'color', this.colorElements);
  }

  bgHandler(e) {
    this.changeStyleHandler(e, 'bg-color', this.bgColorElements);
  }

  getElement(elements, className) {
    return elements.find(element => element.classList.contains(className));
  }
}

new BookReader();
