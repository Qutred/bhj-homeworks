class IndeterminedCheckbox {
  constructor(wrapper) {
    this.wrapper = wrapper;
    this.checkboxes = [...this.wrapper.querySelectorAll('input[type="checkbox"]')];
    this.onChange = this.onChange.bind(this);
    this.registerEvents();
  }

  registerEvents() {
    this.checkboxes.forEach(chekbox => chekbox.addEventListener('click', this.onChange));
  }

  onChange({ target, target: { checked } }) {
    this.checkUncheckItems(target, checked);
    this.checkUncheckIndeterminate(target);
  }

  checkUncheckIndeterminate(target) {
    let li = target.closest('li'),
      controller = null,
      ul = null;

    while (li) {
      ul = li.querySelector('ul');
      if (ul) {
        let boxes = [...ul.querySelectorAll('input[type="checkbox"]')];
        let every = boxes.every(box => box.checked);
        let some = boxes.some(box => box.checked);

        controller = li.firstElementChild.querySelector('input[type="checkbox"]');
        controller.checked = every;
        controller.indeterminate = !every && some;
      }
      li = li.parentElement.closest('li');
    }
  }

  checkUncheckItems(target, isChecked) {
    let childUl = target.closest('li').querySelector('ul');
    if (childUl) {
      let inputs = [...childUl.querySelectorAll('input')];
      inputs.length > 0 && inputs.forEach(checkbox => (checkbox.checked = isChecked));
    }
  }
}

new IndeterminedCheckbox(document.querySelector('.interests.interests_main > ul'));
