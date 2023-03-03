import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

console.log(form.elements);

const onCreatePromises = event => {
  event.preventDefault();

  let {
    delay: { value: delay },
    step: { value: step },
    amount: { value: amount },
  } = event.currentTarget.elements;

  delay = Number(delay);
  step = Number(step);
  amount = Number(amount);

  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) =>
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
      )
      .catch(({ position, delay }) =>
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
      );
    delay += step;
  }
};

form.addEventListener('submit', onCreatePromises);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => 
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      const promiseParameters = { position, delay };
      shouldResolve ? resolve(promiseParameters) : reject(promiseParameters);
  }, delay)
 );
}
