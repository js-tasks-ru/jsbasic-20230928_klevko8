import createElement from "../../assets/lib/create-element.js";


export default class StepSlider {
  constructor({steps, value = 0}) {
    this.steps = steps;
    this.value = value;
    this.createSlider();
    this.activateCategory();
    this.handleDragAndDrop();

    this.setInitialPosition(value, steps);
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
    let left = event.clientX - this.elem.getBoundingClientRect().left; // расстояние от начала слайдера до клика
    let leftRelative = left / this.elem.offsetWidth; // доля ширины слайдера, на которую было тыкнуто
    let segments = this.steps - 1;
    let exactValue = leftRelative * segments; // номер слайдера, в который попали кликом, до округления
    let value = Math.round(exactValue); // ... после округления
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
  };

  handleDragAndDrop = () => {
    const slider = this.elem;
    const thumb = this.elem.querySelector('.slider__thumb');
    const steps = this.steps;


    thumb.onpointerdown = function (event) {
      event.preventDefault();

      document.addEventListener('pointermove', onMouseMove);
      document.addEventListener('pointerup', onMouseUp);

      function onMouseMove(event) {
        let left = event.clientX - slider.getBoundingClientRect().left;

        if (left < 0) {
          left = 0;
        }
        let rightEdge = slider.offsetWidth - thumb.offsetWidth;
        if (left > rightEdge) {
          left = rightEdge;
        }

        let leftRelative = left / slider.offsetWidth;
        let segments = steps - 1;
        let exactValue = leftRelative * segments;
        let value = Math.round(exactValue);
        let valuePercents = exactValue / segments * 100;

        thumb.style.left = valuePercents + '%';

        const sliderValue = slider.querySelector('.slider__value');
        sliderValue.innerHTML = `${value}`;

        const progress = slider.querySelector('.slider__progress');
        progress.style.width = `${valuePercents}%`;

        slider.classList.add('slider_dragging');
        this.value = value;
      }

      function onMouseUp() {
        document.removeEventListener('pointerup', onMouseUp);
        document.removeEventListener('pointermove', onMouseMove);
        slider.classList.remove('slider_dragging');

        const customEvent = new CustomEvent('slider-change', {
          detail: this.value,
          bubbles: true
        });
        slider.dispatchEvent(customEvent);
      }
    };

    thumb.ondragstart = function () {
      return false;
    };

    this.emitStepActivation();
  };


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

  setInitialPosition = (value, steps) => {
    const valuePercents = value / (steps - 1) * 100;

    const thumb = this.elem.querySelector('.slider__thumb');
    thumb.style.left = `${valuePercents}%`;

    const progress = this.elem.querySelector('.slider__progress');
    progress.style.width = `${valuePercents}%`;
  }
}

