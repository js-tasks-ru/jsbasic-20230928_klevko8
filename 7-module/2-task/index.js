import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.createModal();
  }

  open() {
    document.body.classList.add('is-modal-open');
  }

  createModal = () => {
    const modal = createElement(`
    <div class="modal">
   
    <div class="modal__overlay"></div>

    <div class="modal__inner">
      <div class="modal__header">
        
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>

        <h3 class="modal__title"></h3>
      </div>

      <div class="modal__body"></div>
    </div>

  </div>`);

    document.body.appendChild(modal);

    const closeButton = document.body.querySelector('.modal__close');
    closeButton.addEventListener('click', this.close);
    document.addEventListener('keydown', this.closeEsc);
  };

  setTitle = (title) => {
    const modalTitle = document.body.querySelector('.modal__title');
    if (modalTitle) {
      modalTitle.innerHTML = title;
    }
  };

  setBody = (bodyElem) => {
    const modalBody = document.body.querySelector('.modal__body');
    modalBody.appendChild(bodyElem);
  };

  close = () => {

    document.body.classList.remove('is-modal-open');

    const modal = document.body.querySelector('.modal');

    if (modal) {
      modal.remove();
    }
  };

  closeEsc = (event) => {
    const modal = document.body.querySelector('.modal');

    if (event.code === 'Escape') {
      this.close();
    }
  };
}
