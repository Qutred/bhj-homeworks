class ExchangeRate {
  constructor() {
    this.items = document.getElementById('items');
    this.loader = document.getElementById('loader');
    this.getExchangeRates = this.getExchangeRates.bind(this);

    let storageRates = this.getRatesFromStorage();
    if (storageRates && new Date() < new Date(storageRates.Date)) {
      this.renderRates(storageRates.Valute);
    } else {
      this.getExchangeRates();
    }
  }

  saveRatesInStorage(rates) {
    window.localStorage.setItem('rates', JSON.stringify(rates));
  }

  getRatesFromStorage() {
    return JSON.parse(window.localStorage.getItem('rates'));
  }

  getExchangeRates() {
    const url = 'https://students.netoservices.ru/nestjs-backend/slow-get-courses';
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.addEventListener('loadstart', () => this.showLoader());
    xhr.addEventListener('loadend', e => {
      this.hideLoader();
      if (xhr.status === 200) {
        this.renderRates(xhr.response.response.Valute);
        this.saveRatesInStorage(xhr.response.response);
      } else {
        this.items.innerText = 'Ошибка при отправке запроса на сервер...';
      }
    });

    xhr.send();
  }

  renderRates(rates) {
    this.items.innerHTML = Array.from(Object.values(rates))
      .map(
        item => `<div class="item">
                    <div class="item__code">
                      ${item.CharCode}
                    </div>
                    <div class="item__value">
                      ${item.Value}
                    </div>
                    <div class="item__currency">
                      руб.
                  </div>
                </div>`
      )
      .join('');
  }

  showLoader() {
    this.loader.classList.add('loader_active');
  }

  hideLoader() {
    this.loader.classList.remove('loader_active');
  }
}

new ExchangeRate();
