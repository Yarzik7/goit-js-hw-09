const startEl = document.querySelector('[data-start]');
const stopEl = document.querySelector('[data-stop]');

stopEl.disabled = true; // Кнопка стоп неактивна за замовчуванням

let intervalId = null; // Змінна для збереження ідентифікатора інтервалу

/**
 * Функція починає чи припиняє змінювати колір фону <body> в залежності від data атрибуту кнопки
 * @param {{ currentTarget: { dataset } }} Деструктуризація об'єкту події 'click' для отримання data атрибуту
 */
const onBtnClick = ({ currentTarget: { dataset } }) => {
  const dataSetAttribute = Object.keys(dataset); // Отримання масиву з назвою data атрибуту натиснутої кнопки

  // Визначення натиснутої кнопки і виконання відповідних дій
  if (dataSetAttribute[0] === 'start') {
    stopEl.removeAttribute('disabled'); // Робить кнопку стоп активною
    startEl.disabled = true; // Робить кнопку старт неактивною

    intervalId = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor(); // Змінює колір фону <body> раз на секунду
    }, 1000);
  } else {
    stopEl.disabled = true; // Робить кнопку стоп неактивною
    startEl.removeAttribute('disabled'); // Робить кнопку старт активною
    clearInterval(intervalId); // Видаляє інтервал
  }
};


startEl.addEventListener('click', onBtnClick);
stopEl.addEventListener('click', onBtnClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}