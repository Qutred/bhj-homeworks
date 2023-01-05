const reveal = document.querySelector('.reveal');

function throttle(func, ms) {
  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {
    if (isThrottled) {
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments);

    isThrottled = true;

    setTimeout(function () {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}

const revealWatcher = e => {
  if (window.innerHeight >= reveal.getBoundingClientRect().bottom) {
    reveal.classList.add('reveal_active');
    window.removeEventListener('scroll', throttleRevealWatcher);
  }
};

let throttleRevealWatcher = throttle(revealWatcher, 200);

window.addEventListener('scroll', throttleRevealWatcher);
