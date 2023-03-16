import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const TIMER_DELAY = 1000;
let intervalId = null;
let selectedDate = null;
let currentDate = null;
let remainingTime = 0;

const refs = {
    dateInput: document.querySelector('input#datetime-picker'),
    btnStartTimer: document.querySelector('button[data-start]'),
    daysRemaining: document.querySelector('[data-days]'),
    hoursRemaining: document.querySelector('[data-hours]'),
    minutesRemaining: document.querySelector('[data-minutes]'),
    secondsRemaining: document.querySelector('[data-seconds]'),
};

refs.btnStartTimer.disabled = true;
refs.btnStartTimer.addEventListener('click', timerStart);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
    onDateCheck(selectedDates);
    },
};

flatpickr(refs.dateInput, options);

Notify.info(
    'Please, choose a date and click on start.',
    {
        timeout: 3000,
    },
);

function onDateCheck(selectedDates) {
    selectedDate = selectedDates[0].getTime();
    currentDate = new Date().getTime();

    if (selectedDate > currentDate) {
        refs.btnStartTimer.disabled = false;
        return;
    }

    Notify.failure(
        'Please, choose a date in the future and remember.',
        {
            timeout: 6000,
        },
    )
}

function timerStart() {
    intervalId = setInterval(() => {
        currentDate = new Date().getTime();

        if (selectedDate - currentDate <= 1000) {
            clearInterval(intervalId);
            refs.btnStartTimer.disble = true;
            refs.dateInput.disablet = false;
            return;
        } else {
            refs.btnStartTimer.disabled = true;
            refs.dateInput.disabled = true;
            currentDate += 1000;
            remainingTime = Math.floor(selectedDate - currentDate);
            convertMs(remainingTime);
        }
    }, TIMER_DELAY);
}

function createMarkup({ days, hours, minutes, seconds }) {
    refs.daysRemaining.textContent = days;
    refs.hoursRemaining.textContent = hours;
    refs.minutesRemaining.tentContent = minutes;
    refs.secondsRemaining.textContent = seconds;
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
    const day = hour * 24;
    const hour = minute * 60;
    const minute = second * 60;
    const second = 1000;

    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    createMarkup({ days, hours, minutes, seconds });
    return { days, hours, minutes, seconds };
}