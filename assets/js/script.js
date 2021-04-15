// API call variables

AP_ID = "8644d665";

API_KEY = "64d713a99c6d8aab9d04c626a6c6ab94";

FETCH_URL = "https://api.edamam.com/search?q=chicken&mealType=lunch&app_id=" + AP_ID + "&app_key=" + API_KEY;

function fetchEdamamRecipe(FETCH_URL) {
    fetch (FETCH_URL, 
        {
            method: "POST",
            headers: {"Content-Type": "application/json;charset=UTF-8"},
        })

    .then(res => {
        if(res.ok){
            console.log("SUCCESS")
        
        } else {
            console.log("not success")
        }
        return res.json()
    })

    .then (data => {
        console.log(data)
        for (var i = 0; i < 5; i++)
        {
            var recipeName = data.hits[i].recipe.label;
            var calories = data.hits[i].recipe.calories.toFixed(0);
            var img = data.hits[i].recipe.image;
            var foodCard = createFoodCard(recipeName, calories, img);
            $("#recipe-results").append(foodCard);

        }
    })
}



// construction of search bar element to search for recipes
var searchBox = $("<div>", {class: "field has-addons"});
var searchField = $("<div>", {class: "control"});
var textInput = $("<input>", {class: "input", type: "text"});
var submitButtonDiv = $("<div>", {class: "control"});
var submitButton = $("<button>", {class: "button is-primary", id: "submit-search-edamam"});
// put all the html elements together
searchField.append(textInput);
submitButtonDiv.append(submitButton);
searchBox.append(searchField);
searchBox.append(submitButtonDiv);
// append the searchbox to the test div on the HTML
$("#test-div").append(searchBox); 

// this function extracts the text from the search box, parses an appropriate fetch URL and returns it
function getEdamamFetchURL()
{
    var searchText = $("input").val(); // get the value of the input text
    return "https://api.edamam.com/search?" + "q=" + searchText.trim() + "&app_id=" + AP_ID + "&app_key=" + API_KEY; // return appropriate URL to fetch

}

// this function creates a card element with the photo, name, and calories of a recipe
function createFoodCard(recipeName, calories, img)
{
     //containers for the food card elements
     var headerEl = $("<h5>", {class: "card-header"})    
     var cardEl = $("<div>", {class: "card", id: "food-card"})
     var bodyEl = $("<div>", {class: ""})
     var columnEl = $("<div>", {class:"column", style: "width: 2rem;"});
     imgEl = $("<img>", {src:img, class: "card-image"})
    // set the element attributes according to the function parameters
     headerEl.text(recipeName);
     var caloriesEl = $("<p>", {class: ""});
     caloriesEl.text("calories: " +  calories);
     // put together all the elements
     bodyEl.append(headerEl);
     bodyEl.append(imgEl)
     bodyEl.append(caloriesEl);
     cardEl.append(bodyEl)
     columnEl.append(cardEl);
     // return the food card element
     return columnEl

}

$("#submit-search-edamam").on("click", ()=> 
{
    // clear the html of the area where the food results are displayed
    $("#recipe-results").html("");
    //var fetchURL = getEdamamFetchURL();
    //fetchEdamamRecipe(fetchURL);
    var fetchURL = getNutritionixFoodFetchURL();
    fetchNutritionixFood(fetchURL);

})

/*
    Here starts code related to the nutritionix API call

*/

var fetchURL = "https://trackapi.nutritionix.com/v2/search/instant?query=grilled cheese"

// this function fetches data from the nutritionix API. it already has the appropriate headers built into it

function fetchNutritionixFood(FETCH_URL){
    fetch (FETCH_URL, 
        {
            method: "GET",
            headers: {
            "x-app-id": "01a2941e" ,
            "x-app-key": "b6d5b488c725bb0cbf2ff56eb72183c5",
            "Content-Type": "application/json"
            },

        })

    .then(res => {
        if(res.ok){
            console.log("SUCCESS")
        
        } else {
            console.log("not success")
        }
        return res.json()
    })

    .then (data => {
        console.log(data)
        
        for (var i = 0; i < 5; i++)
        {
            var recipeName = data.branded[i].brand_name_item_name;
            var calories = data.branded[i].nf_calories.toFixed(0);
            var img = data.branded[i].photo.thumb;
            var foodCard = createFoodCard(recipeName, calories, img);
            $("#recipe-results").append(foodCard);

        }
        
        
  
    })
}

function getNutritionixFoodFetchURL()
{
    var searchText = $("input").val(); // get the value of the input text
    return "https://trackapi.nutritionix.com/v2/search/instant?query=" + searchText // return appropriate URL to fetch

}
