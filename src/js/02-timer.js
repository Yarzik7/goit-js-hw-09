import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // Перевіряє чи вибрана дата вже минула
    if (selectedDates[0] < Date.now()) {
      startBtnEl.disabled = true; // Залишає кнопку старт неактивною
      Notify.failure('Please choose a date in the future'); // Вимагає вибрати дату в майбутньому
      return;
    }
    startBtnEl.disabled = false; // Робити кнопку старт активною
    selectedDate = selectedDates[0]; // Зберігає обрану дату
  },
};

const selectorEl = document.querySelector('#datetime-picker');
const startBtnEl = document.querySelector('[data-start]');
const timerEl = document.querySelector('.timer');
const spanValueEl = document.querySelectorAll('.value');

const [daysEl, hoursEl, minutesEl, secondsEl] = spanValueEl; // Деструктуризація масиву елементів з класом '.value'

let selectedDate; // Змінна для зберігання вибраної дати
let intervalId = null; // Змінна для збереження ідентифікатора інтервалу

startBtnEl.disabled = true; // Кнопка старт неактивна за замовчуванням

// Мінімальне оформлення таймера
timerEl.style.cssText = `display: flex; gap: 10px; text-align: center; text-transform: uppercase;`;
spanValueEl.forEach(item => item.style.cssText = `display: block; font-size: 40px;`);

flatpickr(selectorEl, options); // Ініціалізація flatpickr

/**
 * Функція додає 0 перед числом якщо в ньому менше 2 символів
 * @param {value} Значення частини таймеру
 * @returns {string}
 */
const addLeadingZero = value => value.toString().padStart(2, 0);

/**
 * Функція оновлює значення таймеру на сторінці
 */
const onUpdateTimer = () => {
  const dateDifference = selectedDate - Date.now(); // Отримує різницю між вибраною і поточною датою
  
  //Перевіряє чи скінчився відлік таймеру
  if (dateDifference <= 0) {
    clearInterval(intervalId);
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(dateDifference); // Деструктуризація об'єкту з відформатованою датою
  
  secondsEl.textContent = addLeadingZero(seconds); // Встановлення нового значення секунд
  minutesEl.textContent = addLeadingZero(minutes);
  hoursEl.textContent = addLeadingZero(hours);
  daysEl.textContent = addLeadingZero(days);
};

/**
 * Викликає функцію для оновлення таймеру на сторінці раз на секунду
 */
const onStartClick = () => {startBtnEl.disabled = true; intervalId = setInterval(onUpdateTimer, 1000) };

startBtnEl.addEventListener('click', onStartClick);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
