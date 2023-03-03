const body = document.body;
const startEl = body.querySelector('[data-start]');
const stopEl = body.querySelector('[data-stop]');

let timerId = null;

stopEl.disabled = 'disabled';

const onButtonClick = ({ target: { dataset } }) => {
  const isActionProperty =
    dataset.hasOwnProperty('start') || dataset.hasOwnProperty('stop');
  isActionProperty ? onActionControl(Object.keys(dataset)) : undefined;
};

const onActionControl = dataset => {
  if (dataset[0] === 'start') {
    stopEl.removeAttribute('disabled');
    startEl.disabled = 'disabled';
    timerId = setInterval(() => {body.style.backgroundColor = getRandomHexColor();}, 1000);
  } else {
    stopEl.disabled = 'disabled';
    startEl.removeAttribute('disabled');
    clearInterval(timerId);
  }
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

body.addEventListener('click', onButtonClick);
