class SimpleDropDown {
  constructor() {
    this.dropDowns = [...document.querySelectorAll('.dropdown')];

    this.dropDowns.forEach(item => item.addEventListener('click', this.initEvents));
  }

  initEvents(e) {
    const dropDownList = e.currentTarget.querySelector('.dropdown__list');
    const dropDownValue = e.currentTarget.querySelector('.dropdown__value');

    if (e.target.classList.contains('dropdown__value')) {
      dropDownList.classList.toggle('dropdown__list_active');
    } else if (e.target.classList.contains('dropdown__link')) {
      e.preventDefault();
      dropDownValue.textContent = e.target.textContent;
      dropDownList.classList.toggle('dropdown__list_active');
    }
  }
}

const dropdown = new SimpleDropDown();
