const startEl = document.querySelector('[data-start]');
const stopEl = document.querySelector('[data-stop]');

stopEl.disabled = true; // Кнопка стоп неактивна за замовчуванням

let intervalId = null; // Змінна для збереження ідентифікатора інтервалу

/**
 * Функція починає змінювати колір фону <body>
 */
const onStart = () => {
  stopEl.removeAttribute('disabled'); // Робить кнопку стоп активною
  startEl.disabled = true; // Робить кнопку старт неактивною

  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor(); // Змінює колір фону <body> раз на секунду
  }, 1000);
};

/**
 * Функція припиняє змінювати колір фону <body>
 */
const onStop = () => {
  stopEl.disabled = true; // Робить кнопку стоп неактивною
  startEl.removeAttribute('disabled'); // Робить кнопку старт активною
  clearInterval(intervalId); // Видаляє інтервал
};

startEl.addEventListener('click', onStart);
stopEl.addEventListener('click', onStop);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
