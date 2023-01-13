class SigIn {
  constructor() {
    this.signIn = document.getElementById('signin');
    this.signInBtn = document.getElementById('signin__btn');
    this.signInForm = document.getElementById('signin__form');
    this.infoMsg = document.getElementById('card__info-msg');
    this.welcome = document.getElementById('welcome');
    this.logoutBtn = document.getElementById('logout');
    this.userId = null;

    this.signInReq = this.signInReq.bind(this);
    this.init = this.init.bind(this);
    this.logOut = this.logOut.bind(this);

    this.init();
  }

  init() {
    this.signInForm.addEventListener('submit', this.signInReq);
    this.logoutBtn.addEventListener('click', this.logOut);

    if ((this.userId = this.getId())) {
      this.hideSignInForm();
      this.showLogOutBtn();
      this.updateWelcomeUserId(this.userId);
      this.showWelcome();
      this.welcome.querySelector('#user_id').innerText = this.userId;
    }
  }

  updateWelcomeUserId(userId) {
    this.welcome.querySelector('#user_id').innerText = userId;
  }

  showSignInForm() {
    this.signIn.classList.add('signin_active');
  }

  hideSignInForm() {
    this.signIn.classList.remove('signin_active');
  }

  hideLogOutBtn() {
    this.logoutBtn.classList.remove('card__logOut--active');
  }

  showLogOutBtn() {
    this.logoutBtn.classList.add('card__logOut--active');
  }

  isFormValid() {
    return this.signInForm.login.value === '' || this.signInForm.password.value === '' ? false : true;
  }

  clearForm() {
    this.signInForm.reset();
  }

  showTostMessage(txt) {
    this.infoMsg.innerText = txt;
    setTimeout(() => (this.infoMsg.innerText = ''), 2000);
  }

  signInReq(e) {
    e.preventDefault();
    if (!this.isFormValid()) {
      this.showTostMessage('Пожалуйста заполните поля');
      return;
    }
    let data = new FormData(this.signInForm);
    const url = 'https://students.netoservices.ru/nestjs-backend/auth';
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.responseType = 'json';
    xhr.addEventListener('loadend', e => {
      if (xhr.status === 201 && xhr.response.success) {
        this.saveId(xhr.response.user_id);
        this.updateWelcomeUserId(this.userId);
        this.showWelcome();
      } else if (xhr.status === 201 && !xhr.response.success) {
        this.showTostMessage('Неверний логин или пароль');
      } else {
        this.showTostMessage('Ошибка при отправке формы');
      }
      this.clearForm();
    });

    xhr.send(data);
  }

  logOut() {
    this.saveId(null);
    this.showSignInForm();
    this.hideLogOutBtn();
    this.hideWelcome();
  }

  getId() {
    try {
      return JSON.parse(localStorage.getItem('userId'));
    } catch (e) {
      return null;
    }
  }

  saveId(userId) {
    this.userId = userId;
    localStorage.setItem('userId', JSON.stringify(userId));
  }

  showWelcome() {
    this.welcome.classList.add('welcome_active');
  }

  hideWelcome() {
    this.welcome.classList.remove('welcome_active');
  }
}

new SigIn();
