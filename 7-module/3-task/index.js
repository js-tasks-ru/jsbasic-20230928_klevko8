import createElement from "../../assets/lib/create-element.js";


export default class StepSlider {
  constructor({steps, value = 0}) {
    this.steps = steps;
    this.value = value;
    this.createSlider();
    this.activateCategory();

  }

  createSlider = () => {
    this.elem = createElement(`
      <div class="slider">
      <div class="slider__thumb">
        <span class="slider__value">${this.value}</span>
      </div>
     
      <div class="slider__progress"></div>
      
      <div class="slider__steps"></div>
    </div>
  `);

    this.createSteps();


    this.elem.addEventListener('click', this.onClick);

  };

  createSteps = () => {

    for (let i = 0; i < this.steps; i++) {
      const stepSlider = document.createElement('span');
      const sliderSteps = this.elem.querySelector('.slider__steps');
      sliderSteps.appendChild(stepSlider);
    }
  };


  onClick = (event) => {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);
    let valuePercents = value / segments * 100;

    const sliderValue = this.elem.querySelector('.slider__value');
    sliderValue.innerHTML = `${value}`;

    const thumb = this.elem.querySelector('.slider__thumb');
    thumb.style.left = `${valuePercents}%`;

    const progress = this.elem.querySelector('.slider__progress');
    progress.style.width = `${valuePercents}%`;

    this.value = value;

    this.emitStepActivation();

    this.activateCategory();
  }

  activateCategory = () => {
    const steps = this.elem.querySelectorAll('.slider__steps span');

    steps.forEach((step, i) => {
      if (i !== this.value) {
        step.classList.remove('slider__step-active');
      } else {
        step.classList.add('slider__step-active');
      }
    });
  };

  emitStepActivation = () => {
    const customEvent = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    });
    this.elem.dispatchEvent(customEvent);
  };
}

