fetch ('https://api.edamam.com/search?q=mealType')
.then(res => {
    if(res.ok){
        console.log("SUCCESS")
    } else {
        console.log("not success")
    }
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
