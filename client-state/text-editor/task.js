class SimpleEditor {
  constructor() {
    this.input = document.getElementById('editor');
    this.clearBtn = document.getElementById('card-clear');

    this.handleChange = this.handleChange.bind(this);
    this.clearInputValue = this.clearInputValue.bind(this);

    this.regListeners();
    this.init();
  }

  init() {
    let inputValue = this.getData();
    if (inputValue !== null) {
      this.updateInputValue(inputValue);
    }
  }

  regListeners() {
    this.input.addEventListener('change', this.handleChange);
    this.clearBtn.addEventListener('click', this.clearInputValue);
  }

  handleChange(e) {
    let value = e.currentTarget.value.trim();

    if (value !== '') {
      this.saveData(value);
    }
  }

  updateInputValue(value) {
    this.input.value = value;
  }

  clearInputValue() {
    this.input.value = '';
  }

  getData() {
    try {
      return JSON.parse(localStorage.getItem('inputData'));
    } catch (e) {
      return null;
    }
  }

  saveData(inputValue) {
    localStorage.setItem('inputData', JSON.stringify(inputValue));
  }
}

new SimpleEditor();
