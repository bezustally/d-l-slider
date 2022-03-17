window.addEventListener('DOMContentLoaded', function () {
  class Slider {
    constructor(gallery) {
      this.isPaused = false;
      this.btnPrev = gallery.querySelector('.gallery__button_prev');
      this.btnNext = gallery.querySelector('.gallery__button_next');
      this.btnPlayPause = gallery.querySelector('.gallery__button_play');
      this.images = gallery.querySelectorAll('.gallery__photo');
      this.i = 0;
      [this.btnPrev, this.btnNext].forEach((button) => button.addEventListener('click', (e) => this.toggleImages(e)));
      this.slider = gallery.querySelector('.gallery__photos');
      this.slider.addEventListener('mouseover', (e) => this.toggleAnimation(e));
      this.slider.addEventListener('mouseout', (e) => this.toggleAnimation(e));
      this.slider.addEventListener('click', (e) => this.toggleImages(e));

      this.btnPlayPause.addEventListener('click', (e) => this.toggleAnimation(e));
      this.btnPlayPause.style.display = 'none';
    }
    static showingClass = 'gallery__photo_showed';
    static btnNextClass = 'gallery__button_next';

    toggleAnimation = function (e) {
      switch (this.btnPlayPause.value) {
        case '||':
          this.btnPlayPause.value = '▶';
          this.isPaused = true;
          break;
        case '▶':
          this.btnPlayPause.value = '||';
          this.isPaused = false;
          break;
      }
    };

    toggleImages = function (e) {
      if (this.isPaused) {
        try {
          if (e.target.className == 'gallery__photos') {
            this.isPaused = false;
          }
        } catch {
          return;
        }
      }

      let isNext = true;

      if (e) {
        e.target.disabled = true;
        isNext = e.target.classList == Slider.btnNextClass ? true : false;
      }

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
      setTimeout(() => {
        if (e) e.target.disabled = false;
      }, duration + 50);
    };
  }

  const gallery1 = document.querySelector('#gallery1');
  const gallery2 = document.querySelector('#gallery2');

  const slider1 = new Slider(gallery1);

  class autoPlayingSlider extends Slider {
    constructor(gallery, interval = 1500) {
      super(gallery);
      this.interval = interval;
      this.btnPlayPause.style.display = 'initial';
      setInterval(() => this.toggleImages(), this.interval);
    }
  }
  const slider2 = new autoPlayingSlider(gallery2, 3000);
});
