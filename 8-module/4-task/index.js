import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) {
      return;
    }

    for (let item of this.cartItems) {
      if (item.product === product) {
        item.count++;
        this.onProductUpdate(item);
        return;
      }
    }

    this.cartItems.push({product, count: 1});
    this.onProductUpdate(this.cartItems.at(-1));
  }

  updateProductCount(productId, amount) {
    this.cartItems.forEach((item, index) => {
      if (item.product.id === productId) {
        item.count += amount;
        if (item.count === 0) {
          this.cartItems.splice(index, 1);
        }
        this.onProductUpdate(item);
      }
    });
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    let totalCount = 0;

    for (let item of this.cartItems) {
      totalCount += item.count;
    }

    return totalCount;
  }

  getTotalPrice() {
    let totalPrice = 0;

    for (let item of this.cartItems) {
      totalPrice += (item.product.price * item.count);
    }

    return totalPrice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  createModalBody = () => {
    const modalBody = document.createElement('div');
    for (let item of this.cartItems) {
      modalBody.appendChild(this.renderProduct(item.product, item.count));
    }

    modalBody.appendChild(this.renderOrderForm());

    modalBody.addEventListener('click', event => {
      if (event.target.closest('.cart-counter__button_plus')) {
        this.updateProductCount(event.target.closest('.cart-product').dataset.productId, 1);
      }
      if (event.target.closest('.cart-counter__button_minus')) {
        this.updateProductCount(event.target.closest('.cart-product').dataset.productId, -1);
      }
    });

    let form = modalBody.querySelector('.cart-form');
    form.addEventListener('submit', event => {
      this.onSubmit(event);
    });

    return modalBody;
  };

  renderModal = () => {
    this.modal = new Modal();
    this.modal.setTitle('Your order');
    this.modal.setBody(this.createModalBody());
    this.modal.open();
  };

  onProductUpdate(cartItem) {
    if (document.body.classList.contains('is-modal-open')) {
      let productId = cartItem.product.id;
      let modalBody = document.querySelector('.modal__body');
      let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
      let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
      let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

      productCount.innerHTML = cartItem.count;
      productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;

      if (!cartItem.count) {
        modalBody.querySelector(`[data-product-id="${productId}"]`).remove();
      }

      if(this.isEmpty()){
        this.modal.close();
      }
    }

    this.cartIcon.update(this);
  }

  async onSubmit(event) {
    event.preventDefault();

    let modalBody = document.querySelector('.modal__body');
    let form = modalBody.querySelector('.cart-form');
    let submit = form.querySelector('[type="submit"]');
    let formData = new FormData(form);

    submit.classList.add('is-loading');
    let response = await fetch(
      'https://httpbin.org/post',
      {
        method: 'POST',
        body: formData,
      }
    );
    if (response.ok) {
      this.modal.setTitle('Success!');
      this.cartItems = [];
      modalBody.innerHTML =
        `<div class="modal__body-inner">
        <p>
          Order successful! Your order is being cooked :) <br>
          We’ll notify you about delivery time shortly.<br>
          <img src="/assets/images/delivery.gif">
        </p>
      </div>`;
      this.cartIcon.update(this);
    }
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

