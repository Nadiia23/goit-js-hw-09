import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const text = document.querySelector('#datetime-picker');
const timerStyle = document.querySelector('.timer');
const btnStart = document.querySelector('button[data-start]');
const timerSecondsRef = document.querySelector('span[data-seconds]');
const timerMinutesRef  = document.querySelector('span[data-minutes]');
const timerHoursRef  = document.querySelector('span[data-hours]');
const timerDaysRef = document.querySelector('span[data-days]');
timerStyle.style.display = "flex";
timerStyle.style.gap = "20px";
timerStyle.style.fontSize = "40px";

btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      btnStart.disabled = true;
    } else {
      btnStart.disabled = false;
    }
  },
};

flatpickr(text, options);
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
function addZero(value) {
  return value.toString().padStart(2, '0');
}
function onChangeTime({ days, hours, minutes, seconds }) {
        timerDaysRef.textContent = days;
        timerHoursRef.textContent = hours;
        timerMinutesRef.textContent = minutes;
        timerSecondsRef.textContent = seconds;
}
btnStart.addEventListener('click', () => {
  let timer = setInterval(() => {
    let countdown = new Date(text.value) - new Date();
    btnStart.disabled = true;
    if (countdown >= 0) {
      const data = convertMs(countdown);
      onChangeTime(data)
      if (countdown <= 10000) {
      }
    } else {
      Notiflix.Notify.success('Countdown finished');
      clearInterval(timer);
    }
  }, 1000);
});