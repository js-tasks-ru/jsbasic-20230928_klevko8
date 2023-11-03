import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.renderCarousel();
  }

  counter = 0;

  renderSlide(slide) {
    return createElement(`         
      <div class="carousel__slide" data-id="penang-shrimp">
        <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide"/>
        <div class="carousel__caption">
          <span class="carousel__price">€${slide.price.toFixed(2)}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>  
    `);
  }

  renderCarousel() {
    this.elem = createElement(`  
      <div class="carousel">    
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>        
        <div class="carousel__inner"></div>
      </div>    
    `);

    this.carouselInner = this.elem.querySelector('.carousel__inner');

    for (let i = 0; i < this.slides.length; i++) {
      const slide = this.slides[i];
      const slideElem = this.renderSlide(slide);
      this.carouselInner.appendChild(slideElem);

      const button = slideElem.querySelector('.carousel__button');
      button.setAttribute('id', slide.id);
      button.addEventListener('click', this.addProduct);
    }


    this.arrowRight = this.elem.querySelector('.carousel__arrow_right');
    this.arrowLeft = this.elem.querySelector('.carousel__arrow_left');
    this.arrowLeft.style.display = 'none';

    this.arrowRight.addEventListener('click', this.onRightClick);
    this.arrowLeft.addEventListener('click', this.onLeftClick);
  }

  onRightClick = () => {
    const sliders = this.carouselInner.querySelectorAll('.carousel__slide');
    const step = this.carouselInner.offsetWidth;

    if (this.counter <= sliders.length - 1) {
      this.counter++;
    }

    if (this.counter === sliders.length - 1) {
      this.arrowRight.style.display = 'none';
    } else {
      this.arrowLeft.style.display = '';
    }

    this.carouselInner.style.transform = 'translateX(' + `${-step * this.counter}px)`;
  };

  onLeftClick = () => {
    const step = this.carouselInner.offsetWidth;

    if (this.counter > 0) {
      this.counter--;
    }

    if (this.counter === 0) {
      this.arrowLeft.style.display = 'none';
    } else {
      this.arrowRight.style.display = '';
    }

    this.carouselInner.style.transform = 'translateX(' + `${-step * this.counter}px)`;
  };

  addProduct = (event) => {
    const id = event.target.closest('button').id;

    const addProduct = new CustomEvent("product-add", {
      detail: id,
      bubbles: true,
    });

    this.elem.dispatchEvent(addProduct);
  };
}
