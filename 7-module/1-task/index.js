import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.renderMenu();
  }

  renderCategory(category) {
    return createElement(`
    <a href="#" class="ribbon__item" data-id=${category.id}>${category.name}</a>`
    );
  }

  renderMenu() {
    this.elem = createElement(`  
       <div class="ribbon">       
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
   
        <nav class="ribbon__inner"></nav>

        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `);

    this.ribbonInner = this.elem.querySelector('.ribbon__inner');

    for (let i = 0; i < this.categories.length; i++) {
      const category = this.categories[i];
      const categoryElem = this.renderCategory(category);
      this.ribbonInner.appendChild(categoryElem);
    }


    this.arrowRight = this.elem.querySelector('.ribbon__arrow_right');
    this.arrowLeft = this.elem.querySelector('.ribbon__arrow_left');

    this.arrowRight.addEventListener('click', this.onRightClick);
    this.arrowLeft.addEventListener('click', this.onLeftClick);

    this.activateCategory();

  }

  onRightClick = () => {
    this.ribbonInner.scrollBy(350, 0);
    const scrollWidth = this.ribbonInner.scrollWidth;
    const scrollLeft = this.ribbonInner.scrollLeft;
    const clientWidth = this.ribbonInner.clientWidth;

    let scrollRight = scrollWidth - scrollLeft - clientWidth;

    if (scrollRight < 1) {
      this.arrowRight.classList.remove('ribbon__arrow_visible');
    } else {
      this.arrowLeft.classList.add('ribbon__arrow_visible');
    }
  };

  onLeftClick = () => {
    this.ribbonInner.scrollBy(-350, 0);

    const scrollLeft = this.ribbonInner.scrollLeft;
    if (scrollLeft === 0) {
      this.arrowLeft.classList.remove('ribbon__arrow_visible');
    } else {
      this.arrowRight.classList.add('ribbon__arrow_visible');
    }
  };

  activateCategory = () => {
    const list = this.ribbonInner.querySelectorAll('.ribbon__item');
    list.forEach(item => {
      item.addEventListener('click', (e) => {
        list.forEach(el => {
          el.classList.remove('ribbon__item_active');
        });
        item.classList.add('ribbon__item_active');

        const categoryId = item.dataset.id;
        this.emitCategoryActivation(categoryId);
      });
    });
  };

  emitCategoryActivation = (id) => {
    const customEvent = new CustomEvent('ribbon-select', {
      detail: id,
      bubbles: true,
    });

    this.elem.dispatchEvent(customEvent);
  };
}
