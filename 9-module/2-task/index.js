import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    this.addCarouselComponent();
    this.addRibbonMenuComponent();
    this.addStepSliderComponent();
    this.addCartIconComponent();
    this.addCartComponent();

    let response = await fetch('products.json');
    this.products = await response.json();

    this.renderProductsGrid(this.products);
    this.filter();
    this.addListeners();
  }

  addCarouselComponent = () => {
    this.carousel = new Carousel(slides);
    document.querySelector('[data-carousel-holder]').append(this.carousel.elem);
  };

  addRibbonMenuComponent = () => {
    this.ribbonMenu = new RibbonMenu(categories);
    document.querySelector('[data-ribbon-holder]').append(this.ribbonMenu.elem);
  };

  addStepSliderComponent = () => {
    this.stepSlider = new StepSlider({steps: 5, value: 3});
    document.querySelector('[data-slider-holder]').append(this.stepSlider.elem);
  };

  addCartIconComponent = () => {
    this.cartIcon = new CartIcon();
    document.querySelector('[data-cart-icon-holder]').append(this.cartIcon.elem);
  };

  addCartComponent = () => {
    this.cart = new Cart(this.cartIcon);
  };

  renderProductsGrid = (products) => {
    this.productsGrid = new ProductsGrid(products);
    document.querySelector('[data-products-grid-holder]').append(this.productsGrid.elem);
  };

  filter = () => {
    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });
  };

  addListeners = () => {
    document.body.addEventListener('product-add', event => {
      this.cart.addProduct(this.products.find(item => item.id === event.detail));
    });

    this.stepSlider.elem.addEventListener('slider-change', event => {
      this.productsGrid.updateFilter({maxSpiciness: event.detail});
    });

    this.ribbonMenu.elem.addEventListener('ribbon-select', event => {
      this.productsGrid.updateFilter({category: event.detail});
    });

    let filterNuts = document.querySelector('#nuts-checkbox');
    let filterVegeterian = document.querySelector('#vegeterian-checkbox');

    filterNuts.onchange = () => {
      this.productsGrid.updateFilter({ noNuts: filterNuts.checked });
    };

    filterVegeterian.onchange = () => {
      this.productsGrid.updateFilter({ vegeterianOnly: filterVegeterian.checked });
    };
  };
}
