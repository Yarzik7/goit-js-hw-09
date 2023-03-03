import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

/**
 * Створює вказану кількість промісів
 * @param {event} Об'єкт події 'submit'
 */
const onCreatePromises = event => {
  event.preventDefault();

  let {
    delay: { value: delay },
    step: { value: step },
    amount: { value: amount },
  } = event.currentTarget.elements; // Отримання значень з полів сторінки

  // Перетворення отриманих значень в число
  delay = Number(delay);
  step = Number(step);
  amount = Number(amount);

  // Створення вказаної в amount кількості промісів
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) =>
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`) // Обробка успішного виконання промісу
      )
      .catch(({ position, delay }) =>
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`) // Обробка невдалого виконання промісу
      );
    delay += step;
  }
  form.reset();
};

form.addEventListener('submit', onCreatePromises);

/**
 * 
 * @param {*} position Номер промісу, що створюється
 * @param {*} delay Затримка
 * @returns {object} Проміс
 */
function createPromise(position, delay) {
  return new Promise((resolve, reject) => 
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3; // Генерація успішності дії
      const promiseParameters = { position, delay }; // Параметри промісу

      shouldResolve ? resolve(promiseParameters) : reject(promiseParameters); // Виклик відповідного методу в залежності від успіху дії
  }, delay) // Затримка зміни стану проміса
 );
}
