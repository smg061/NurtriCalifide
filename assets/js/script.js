let nav = 0;
let clicked = null;
let events = localStorage.getItem('meal') ? JSON.parse(localStorage.getItem('meals')) : [];

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const backDrop = document.getElementById('modalBackDrop');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function openModal(date) {
    clicked = date;

    const mealForDay = events.find(e => e.date === clicked);

    if (mealForDay) {
        console.log('Event already exists')
    } else {
        newEventModal.style.display = 'block';
    }
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d7493fada539b88d55bdcab1bf3d42db4e6125d3

    backDrop.style.display = 'block';
}

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

    calendar.innerHTML = '';

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

function closeModal() {
    newEventModal.style.display = 'none';
    backDrop.style.display = 'none';
}

function initButtons() {
    document.getElementById('nextButton').addEventListener('click', () => {
        nav++;
        load();
    });

    document.getElementById('previousButton').addEventListener('click', () => {
        nav--;
        load();
    });

    document.getElementById('closeButton', closeModal)
}

initButtons();
<<<<<<< HEAD
load();
=======
    res.json()
})
.then(data => console.log(data))
.catch(error => console.log("Error"))

var searchFormEl = document.querySelector('#search-form');

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector('#search-input').value;
  var formatInputVal = document.querySelector('#format-input').value;

  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }

  var queryString = './search-results.html?q=' + searchInputVal + '&format=' + formatInputVal;

  location.assign(queryString);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);
>>>>>>> 1524bb33ad56ac82eb3daf69a0a2580412ce8dc5
=======
load();
>>>>>>> d7493fada539b88d55bdcab1bf3d42db4e6125d3
