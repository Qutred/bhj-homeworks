class Menu {
  constructor(menu) {
    this.mainMenuLink = [...document.querySelectorAll(`.${menu} > .menu__item > .menu__link`)];
    this.subMenus = [...document.querySelectorAll(`.${menu} .menu_sub`)];

    this.onClickMenuHandler = this.onClickMenuHandler.bind(this);
    this.mainMenuLink.forEach(item => (item.onclick = this.onClickMenuHandler));
  }

  onClickMenuHandler(e) {
    let subMenu = e.target.closest('.menu__item').querySelector('.menu_sub');

    if (subMenu) {
      e.preventDefault();
      if (subMenu.classList.contains('menu_active')) {
        subMenu.classList.remove('menu_active');
      } else {
        this.closeaAll();
        subMenu.classList.add('menu_active');
      }
    }
  }

  closeaAll() {
    this.subMenus.forEach(item => item.classList.remove('menu_active'));
  }
}

const menuMain = new Menu('menu_main');
const menuSecondary = new Menu('menu_secondary');
