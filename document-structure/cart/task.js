class Cart {
  constructor() {
    this.cartItems = [];
    this.cartProducts = document.querySelector('.cart__products');
    this.products = document.querySelector('.products');

    this.clickProductsHandle = this.clickProductsHandle.bind(this);
    this.clickCartProductsHandle = this.clickCartProductsHandle.bind(this);

    this.registerEvents();
  }

  init() {
    this.registerEvents();
    this.cartItems = this.getFromLocalStorage();
    if (this.cartItems.length) {
      this.updateCartProducts();
    }
  }

  registerEvents() {
    this.products.addEventListener('click', this.clickProductsHandle);
    this.cartProducts.addEventListener('click', this.clickCartProductsHandle);
  }

  updateProductDomQty(target, type) {
    const productControl = target.closest('.product__quantity-controls');
    const qty = productControl.querySelector('.product__quantity-value');
    let value = Number(qty.innerText);
    if (type === 'dec' && value > 1) {
      value--;
    } else if (type === 'inc' && value >= 1) {
      value++;
    }
    qty.innerText = value;
  }

  clickCartProductsHandle(e) {
    let target = e.target;
    if (target.classList.contains('cart__remove-item')) {
      this.removeProduct(target);
    }
  }

  clickProductsHandle(e) {
    let target = e.target;
    if (target.classList.contains('product__quantity-control_dec')) {
      this.updateProductDomQty(target, 'dec');
    } else if (target.classList.contains('product__quantity-control_inc')) {
      this.updateProductDomQty(target, 'inc');
    } else if (target.classList.contains('product__add')) {
      this.addToCard(target);
    }
  }

  addToCard(target) {
    const product = target.closest('.product');
    let itemInCollection;

    const productItem = {
      qty: Number(product.querySelector('.product__quantity-value').innerText),
      src: product.querySelector('.product__image').getAttribute('src'),
      id: Number(product.dataset.id),
    };
    if ((itemInCollection = this.cartItems.find(item => item.id === productItem.id))) {
      itemInCollection.qty += productItem.qty;
    } else {
      this.cartItems.push(productItem);
    }

    this.updateCartProducts();
    this.updateLocalStorage();
  }

  updateCartProducts() {
    this.cartProducts.innerHTML = this.cartItems
      .map(item => {
        return this.createProductMarkup(item);
      })
      .join('');
  }

  createProductMarkup(item) {
    return `<div class="cart__product" data-id="${item.id}">
                <button class="cart__remove-item">X</button>
                <img class="cart__product-image" src="${item.src}">
                <div class="cart__product-count">${item.qty}</div>
            </div>`;
  }

  removeProduct(target) {
    const id = Number(target.closest('.cart__product').dataset.id);
    this.cartItems = this.cartItems.filter(item => item.id !== id);
    this.updateCartProducts();
    this.updateLocalStorage();
  }

  getFromLocalStorage() {
    let products = [];
    if (window.localStorage.getItem('products')) {
      products = JSON.parse(window.localStorage.getItem('products'));
    }
    return products;
  }

  updateLocalStorage() {
    window.localStorage.setItem('products', JSON.stringify(this.cartItems));
  }
}

new Cart().init();
