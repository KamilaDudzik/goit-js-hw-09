import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const datePicker = document.getElementById("datetime-picker")
const buttonStart = document.querySelector("button");
const valueDays = document.querySelector("span[data-days]");
const valueHours = document.querySelector("span[data-hours]");
const valueMinutes = document.querySelector("span[data-minutes]");
const valueSeconds = document.querySelector("span[data-seconds]");

let refreshTimer = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] <= Date.now()) {
      buttonStart.disabled = true;
      Notiflix.Notify.failure("Please choose a date in the future");
    } else {
      buttonStart.disabled = false;
    }
  }
};

buttonStart.disabled = true;

const convertMs = (ms) => {
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
};

flatpickr(datePicker, options);

const addLeadingZero = (value) => {
  if (value < 10) {
    return value.toString().padStart(2, "0");
  } else {
    return value;
  }
};

const startTimer = () => {
  refreshTimer = setInterval(() => {
    const dateSelected = datePicker.value;
    const dateTargeted = new Date(dateSelected).getTime();
    console.log(dateTargeted);
    const dateCurrent = new Date().getTime();
    console.log(dateCurrent);
    const valueCountdown = dateTargeted - dateCurrent;
    console.log(valueCountdown);
    const time = convertMs(valueCountdown);
    console.log(time);
    valueDays.textContent = `${addLeadingZero(time.days)}`;
    valueHours.textContent = `${addLeadingZero(time.hours)}`;
    valueMinutes.textContent = `${addLeadingZero(time.minutes)}`;
    valueSeconds.textContent = `${addLeadingZero(time.seconds)}`;
  });
};

buttonStart.addEventListener("click", startTimer);