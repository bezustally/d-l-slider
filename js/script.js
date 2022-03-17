window.addEventListener('DOMContentLoaded', function () {
  const btnPrev = document.querySelector('.gallery__button_prev');
  const btnNext = document.querySelector('.gallery__button_next');
  const images = document.querySelectorAll('.gallery__photo');
  const showingClass = 'gallery__photo_showed';
  const btnNextClass = 'gallery__button_next';

  [btnPrev, btnNext].forEach((button) => button.addEventListener('click', (e) => toggleImages(e)));

  let i = 0;
  function toggleImages(e) {
    e.target.disabled = true;
    const isNext = e.target.classList == btnNextClass ? true : false;
    const keyframe = [
      { opacity: 1, transform: 'scale(1.0)' },
      { opacity: 0, transform: 'scale(0.3)' },
    ];
    const duration = 700;

    images[i].animate(keyframe, duration);
    images[i].classList.remove(showingClass);

    if (isNext) {
      i++;
      if (i > images.length - 1) i = 0;
    } else {
      i--;
      if (i < 0) i = images.length - 1;
    }

    images[i].classList.add(showingClass);
    images[i].animate(keyframe.reverse(), duration);
    setTimeout(() => (e.target.disabled = false), duration + 50);
  }
});
