function initCarousel() {
  const carousel = document.querySelector('.carousel__inner');
  const right = document.querySelector('.carousel__arrow_right');
  const left = document.querySelector('.carousel__arrow_left');
  const sliders = document.querySelectorAll('.carousel__inner .carousel__slide');

  let counter = 0;
  const step = carousel.offsetWidth;

  left.style.display = 'none';

  right.addEventListener('click', () => {
    if (counter <= sliders.length - 1) {
      counter++;
    }

    if (counter === sliders.length - 1) {
      right.style.display = 'none';
    } else {
      left.style.display = '';
    }

    carousel.style.transform = 'translateX(' + `${-step * counter}px)`;
  });

  left.addEventListener('click', () => {
    if (counter > 0) {
      counter--;
    }

    if (counter <= 0) {
      left.style.display = 'none';
    } else {
      right.style.display = '';
    }

    carousel.style.transform = 'translateX(' + `${-step * counter}px)`;
  });
}
