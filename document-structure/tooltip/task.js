class Tooltip {
  constructor() {
    this.toolTipes = document.querySelectorAll('.has-tooltip');
    this.toolTip = null;
    this.prevTarget = null;
    this.toolTipHandle = this.toolTipHandle.bind(this);
    this.regListeners();
  }

  regListeners() {
    this.toolTipes.forEach(tooltip => tooltip.addEventListener('click', this.toolTipHandle));
  }

  toolTipHandle(e) {
    e.preventDefault();
    let target = e.target;

    this.toolTip === null && this.createToolTip();

    if (this.prevTarget === target && this.toolTip.classList.contains('tooltip_active')) {
      this.hideToolTip();
    } else {
      this.showToolTip(target);
    }
  }

  hideToolTip() {
    this.toolTip.classList.remove('tooltip_active');
  }

  showToolTip(target) {
    let title = target.getAttribute('title');
    let position = target.getAttribute('data-position');
    let margin = 5;
    let dimensions = target.getBoundingClientRect();

    if (title === '') throw new Error('Empty title attribute');

    this.toolTip.textContent = title;
    this.toolTip.classList.add('tooltip_active');
    this.toolTip.style = '';

    switch (position) {
      case 'left':
        this.toolTip.style.top = `${dimensions.top - margin}px`;
        this.toolTip.style.left = `${dimensions.left - this.toolTip.offsetWidth - margin}px`;
        break;
      case 'top':
        this.toolTip.style.top = `${dimensions.top - this.toolTip.offsetHeight - margin}px`;
        this.toolTip.style.left = `${dimensions.left}px`;
        break;
      case 'right':
        this.toolTip.style.top = `${dimensions.top - margin}px`;
        this.toolTip.style.left = `${dimensions.right + margin}px`;
        break;
      case 'bottom':
        this.toolTip.style.top = `${dimensions.top + this.toolTip.offsetHeight - margin}px`;
        this.toolTip.style.left = `${dimensions.left}px`;
        break;
      default:
        this.toolTip.style.top = dimensions.top + 'px';
        this.toolTip.style.left = `${dimensions.left - this.toolTip.offsetWidth - margin}px`;
        break;
    }
    this.prevTarget = target;
  }

  createToolTip() {
    this.toolTip = document.createElement('div');
    this.toolTip.className = 'tooltip';
    document.body.append(this.toolTip);
  }
}

new Tooltip();
