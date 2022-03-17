window.addEventListener('DOMContentLoaded', function () {
  const gallery1 = document.querySelector('#gallery1');
  const gallery2 = document.querySelector('#gallery2');

  class Slider {
    constructor(gallery) {
      this.btnPrev = gallery.querySelector('.gallery__button_prev');
      this.btnNext = gallery.querySelector('.gallery__button_next');
      this.images = gallery.querySelectorAll('.gallery__photo');
      this.i = 0;
      [this.btnPrev, this.btnNext].forEach((button) => button.addEventListener('click', (e) => this.toggleImages(e)));
    }
    static showingClass = 'gallery__photo_showed';
    static btnNextClass = 'gallery__button_next';

    toggleImages = function (e) {
      e.target.disabled = true;
      const isNext = e.target.classList == Slider.btnNextClass ? true : false;
      const keyframe = [
        { opacity: 1, transform: 'scale(1.0)' },
        { opacity: 0, transform: 'scale(0.3)' },
      ];
      const duration = 700;

      this.images[this.i].animate(keyframe, duration);
      this.images[this.i].classList.remove(Slider.showingClass);

      if (isNext) {
        this.i++;
        if (this.i > this.images.length - 1) this.i = 0;
      } else {
        this.i--;
        if (this.i < 0) this.i = this.images.length - 1;
      }

      this.images[this.i].classList.add(Slider.showingClass);
      this.images[this.i].animate(keyframe.reverse(), duration);
      setTimeout(() => (e.target.disabled = false), duration + 50);
    };
  }

  const slider1 = new Slider(gallery1);
  const slider2 = new Slider(gallery2);
});

/* this.btn.addEventListener('click', () => {
  this.next()
}) */

// Сделать из базового слайдера класс Slider.

// После реализации класса мы должны уметь быстро создавать типичные слайдеры:

//  new Slider('.gallery-1');
//  new Slider('.gallery-2');

// Также должна присутствовать возможность давать слайдеру команды извне, например:

//  let slider2 = new Slider('.gallery-2');

//  setInterval(function(){
//    slider2.next();
//  }, 3000);
