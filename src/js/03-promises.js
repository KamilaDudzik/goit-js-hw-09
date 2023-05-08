import Notiflix from "notiflix";

const firstDelay = document.querySelector("input[name='delay']");
const delayStep = document.querySelector("input[name='step']");
const amount = document.querySelector("input[name='amount']");
const buttonSubmit = document.querySelector("button");

const createPromise = (position, delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      const promiseObject = {
        position,
        delay
      }
      if (shouldResolve) {
        resolve(promiseObject);
      } else {
        reject(promiseObject)
      }
    }, delay)
  });
};

buttonSubmit.addEventListener('click', event => {
  event.preventDefault();
  for (let i = 0; i < +amount.value; i++) {
    createPromise(i + 1, +firstDelay.value + i * +delayStep.value)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});