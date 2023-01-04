class SillyModal {
  constructor() {
    this.closeModalBtns = [...document.querySelectorAll('.modal__close')];
    this.modalMain = document.getElementById('modal_main');
    this.modalSuccess = document.getElementById('modal_success');
    this.showSuccessBtn = this.modalMain.querySelector('.show-success');
    this.closeModal = this.closeModal.bind(this);
    this.showSuccessModal = this.showSuccessModal.bind(this);
  }

  init() {
    this.modalMain.classList.add('modal_active');
    this.closeModalBtns.forEach(element => (element.onclick = this.closeModal));
    this.showSuccessBtn.onclick = this.showSuccessModal;
  }

  showSuccessModal(e) {
    this.closeModal(e);
    this.modalSuccess.classList.add('modal_active');
  }

  closeModal(e) {
    e.target.closest('.modal').classList.remove('modal_active');
  }
}

const sillyModal = new SillyModal();
sillyModal.init();
