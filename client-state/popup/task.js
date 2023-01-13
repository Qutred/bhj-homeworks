class CookiesHandler {
  static getCookie(name) {
    var matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  static setCookie(name, value, props) {
    props = props || {};

    var exp = props.expires;

    if (typeof exp == 'number' && exp) {
      var d = new Date();

      d.setTime(d.getTime() + exp * 1000);

      exp = props.expires = d;
    }

    if (exp && exp.toUTCString) {
      props.expires = exp.toUTCString();
    }

    value = encodeURIComponent(value);

    var updatedCookie = name + '=' + value;

    for (var propName in props) {
      updatedCookie += '; ' + propName;

      var propValue = props[propName];

      if (propValue !== true) {
        updatedCookie += '=' + propValue;
      }
    }

    document.cookie = updatedCookie;
  }

  static deleteCookie(name) {
    setCookie(name, null, { expires: -1 });
  }
}

class SubscribeModal {
  constructor() {
    this.subscribeModal = document.getElementById('subscribe-modal');
    this.subscribeCloseBtn = this.subscribeModal.querySelector('.modal__close');

    this.handleCloseBtn = this.handleCloseBtn.bind(this);
    this.regListeners();
    this.init();
  }

  init() {
    let lastShowDate = CookiesHandler.getCookie('lastSubsModalViewDate');
    if (lastShowDate && new Date(lastShowDate) < new Date()) return;
    this.openModal();
  }

  regListeners() {
    this.subscribeCloseBtn.addEventListener('click', this.handleCloseBtn);
  }

  handleCloseBtn() {
    this.closeModal();
    CookiesHandler.setCookie('lastSubsModalViewDate', new Date());
  }

  closeModal() {
    this.subscribeModal.classList.remove('modal_active');
  }

  openModal() {
    this.subscribeModal.classList.add('modal_active');
  }
}

new SubscribeModal();
