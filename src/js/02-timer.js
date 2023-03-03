import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < new Date().getTime()) {
      startBtnEl.disabled = 'disabled';
      Notify.failure('Please choose a date in the future');
      return;
    }
    startBtnEl.disabled = '';
    selectedDate = selectedDates[0].getTime();
  },
};

const selector = document.querySelector('#datetime-picker');
const startBtnEl = document.querySelector('[data-start]');

const [daysEl, hoursEl, minutesEl, secondsEl] =
  document.querySelectorAll('.value');

let selectedDate = '';
let timerId = null;

startBtnEl.disabled = 'disabled';

flatpickr(selector, options);

const addLeadingZero = value => value.toString().padStart(2, 0);

const onStartTimer = () => {
  const date = new Date().getTime();
  const dateDifference = selectedDate - date;
  const { days, hours, minutes, seconds } = convertMs(dateDifference);

  secondsEl.textContent = addLeadingZero(seconds);
  minutesEl.textContent = addLeadingZero(minutes);
  hoursEl.textContent = addLeadingZero(hours);
  daysEl.textContent = addLeadingZero(days);

  if (!(days || hours || minutes || seconds)) {
    clearInterval(timerId);
    return;
  }
};

const onStartClick = () => (timerId = setInterval(onStartTimer, 1000));

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
