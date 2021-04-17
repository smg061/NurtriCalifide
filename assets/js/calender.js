let nav = 0;
let clicked = null;
let events = localStorage.getItem('meal') ? JSON.parse(localStorage.getItem('meals')) : [];

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const backDrop = document.getElementById('modalBackDrop');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const eventTitleMeals = document.getElementById('eventTitleMeals');
retrievedMeals = JSON.parse(localStorage.getItem("meals"));

// function that listens for a click on a day to open a window to display meal information
function openModal(date) {
    clicked = date;

    const mealForDay = events.find(e => e.date === clicked);
    console.log(date);
    console.log(clicked);
    console.log(retrievedMeals);

    if (mealForDay) {
        console.log(mealTime);
    } else {
        newEventModal.style.display = 'block';
    }

    backDrop.style.display = 'block';
}

// function that loads the calendar and uses the localedate string US to pull correct calendar date information to display
function load() {
    const dt = new Date();

    if (nav !== 0) {
        dt.setMonth(new Date().getMonth() + nav);
    }

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    });
    
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

    document.getElementById('monthDisplay').innerText = `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

    // empty calendar string that will be filled by the daySquare const to display correct day information
    calendar.innerHTML = '';

    // add the padding and blank spaces for day that do not appear on the calendar yet after running the date string
    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');

        if (i > paddingDays) {
            daySquare.innerText = i - paddingDays;
            daySquare.addEventListener('click', () => openModal(`${month + 1}/${i - paddingDays}/${year}`));
        } else {
            daySquare.classList.add('padding');
        }

        calendar.appendChild(daySquare);
    }
}

// Call function that closes the Modal or window that appears when you click on a day
function closeModal() {
    newEventModal.style.display = 'none'; // add meal information here 
    backDrop.style.display = 'none';
    eventTitleMeals.value = '';
    clicked = null;
    load();
}

function initButtons() {
    document.getElementById('nextClick').addEventListener('click', () => {
        nav++;
        load();
    });

    document.getElementById('previousClick').addEventListener('click', () => {
        nav--;
        load();
    });

    // Button that close the popup window that displays after you click a day
    document.getElementById('closeButton').addEventListener('click', closeModal);
}

initButtons();
load();