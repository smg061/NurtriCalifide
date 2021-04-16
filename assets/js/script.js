// API call variables

AP_ID = "8644d665";

API_KEY = "64d713a99c6d8aab9d04c626a6c6ab94";

FETCH_URL = "https://api.edamam.com/search?q=chicken&mealType=lunch&app_id=" + AP_ID + "&app_key=" + API_KEY;

selected_meals = [];

function fetchEdamamRecipe(FETCH_URL, mealTime, mealType) {
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
            var calories = data.hits[i].recipe.calories.toFixed(0)/ data.hits[i].recipe.yield;
            var img = data.hits[i].recipe.image;
            var foodCard = createFoodCard(recipeName, calories, img);
            var resultsDiv = $("<div>", { class: "card results-display"})
            resultsDiv.append(foodCard)
            $(mealTime).append(resultsDiv);

        }
    })
}


// this function constructs and returns a searchbar with a submit button
function constructSearchBar() 
{
    // construction of search bar element to search for recipes
    var searchBox = $("<div>", {class: "field has-addons"});
    var searchField = $("<div>", {class: "control"});
    var textInput = $("<input>", {class: "input", id: "breakfast-input", type: "text", placeholder:"Search for a meal"});
    var submitButtonDiv = $("<div>", {class: "control"});
    var submitButton = $("<button>", {class: "button is-primary", id: "submit-search-edamam"});
    submitButton.html("Search");
    // put all the html elements together
    searchField.append(textInput);
    submitButtonDiv.append(submitButton);
    searchBox.append(searchField);
    searchBox.append(submitButtonDiv);
    // append the searchbox to the test div on the HTML
    return searchBox; 
}


// this function extracts the text from the search box, parses an appropriate fetch URL and returns it
function getEdamamFetchURL(mealtype)
{
    var searchText = $("input").val(); // get the value of the input text
    return "https://api.edamam.com/search?" + "q=" + mealtype + "&app_id=" + AP_ID + "&app_key=" + API_KEY + "&from=0&to=3&calories=591-722&health=alcohol-free&diet=balanced"; // return appropriate URL to fetch

}

// this function creates a card element with the photo, name, and calories of a recipe
function createFoodCard(recipeName, calories, img)
{
     //containers for the food card elements
     var headerEl = $("<h5>", {class: "card-header", style:'text-align:center'})    
     var cardEl = $("<div>", {class: "card", id: "recipe-display"})
     var bodyEl = $("<div>", {class: ""})
     
     var imgEl = $("<img>", {src:img, class: "card-image", style:"width:100%"})
     var submitButtonDiv = $("<div>", {class: "control"});
     var submitButton = $("<button>", {
         class: "button is-primary", 
         id: "submit-add-recipe", 
         style: "display:flex-inline;width:100%",
         html: 'Back'
        }
    );
    // set the element attributes according to the function parameters
     headerEl.text(recipeName + "\n");
     var caloriesEl = $("<p>", {class: "card-body", id: "calories-text"});
     caloriesEl.text("calories: " +  calories + "\n");
     // put together all the elements
     bodyEl.append(headerEl);
     bodyEl.append(imgEl)
     bodyEl.append(caloriesEl);
     cardEl.append(bodyEl)
     submitButtonDiv.append(submitButton);
     //columnEl.append(cardEl);
     cardEl.append(submitButtonDiv);
     // return cardEl
     return cardEl

}

// modified version of above function that does not have a button

function createMealPlanCard(recipeName, calories, img)
{
     //containers for the food card elements
     var headerEl = $("<h5>", {class: "card-header"})    
     var cardEl = $("<div>", {class: "card", id: "recipe-display"})
     var bodyEl = $("<div>", {class: ""})
     var columnEl = $("<div>", {class:"column", id:"food-result", style: "width: 10rem;"});
     var imgEl = $("<img>", {src:img, class: "card-image"})
    // set the element attributes according to the function parameters
     headerEl.text(recipeName + "\n");
     var caloriesEl = $("<p>", {class: "card-body", id: "calories-text"});
     caloriesEl.text("calories: " +  calories + "\n");
     // put together all the elements
     bodyEl.append(imgEl)
     bodyEl.append(headerEl);
     bodyEl.append(caloriesEl);
     cardEl.append(bodyEl)
     // return the food card element
     return cardEl

}


/*
    Here starts code related to the nutritionix API call

*/

// this function fetches data from the nutritionix API. it already has the appropriate headers built into it

function fetchNutritionixFood(FETCH_URL, mealTime){
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
        var resultsDiv = $("<div>", { class: "card", id: "resultsDisplay", style: "font-size: 1rem;"})
        for (var i = 0; i < 5; i++)
        {
            var recipeName = data.branded[i].brand_name_item_name;
            var calories = data.branded[i].nf_calories.toFixed(0);
            var img = data.branded[i].photo.thumb;

            var foodCard = createFoodCard(recipeName, calories, img);
            resultsDiv.append(foodCard)
            $(mealTime).append(resultsDiv);

        }
    })
}

function getNutritionixFoodFetchURL()
{
    var searchText = $("input").val(); // get the value of the input text
    return "https://trackapi.nutritionix.com/v2/search/instant?query=" + searchText // return appropriate URL to fetch

}


var searchBar = constructSearchBar();

$("#breakfastDiv").append(searchBar);
const container = $("<div>", {id:"result-container-breakfast", class: "result-containers"});
console.log(container)
$("#breakfastDiv").append(container);


$("#submit-search-edamam").on("click", ()=> 
{
    // clear the html of the area where the food results are displayed
    $("#result-container-breakfast").html("");
    const mealType = $("#breakfast-input").val();
    var fetchURL = getEdamamFetchURL(mealType);
    fetchEdamamRecipe(fetchURL, "#result-container-breakfast");

})

$("#submit-search-edamam-lunch").on("click", ()=> 
{
    $("#result-container-lunch").html("");
    const mealType = $("#lunch-input").val();
    var fetchURL = getEdamamFetchURL(mealType);
    fetchEdamamRecipe(fetchURL, "#result-container-lunch");

})


$("#submit-search-edamam-dinner").on("click", ()=> 
{
    $("#result-container-dinner").html("");
    const mealType = $("#dinner-input").val();
    var fetchURL = getEdamamFetchURL(mealType);
    fetchEdamamRecipe(fetchURL, "#result-container-dinner");
})

$(document).on("click", "#submit-add-recipe", (event)=>
{
    event.preventDefault();
    myEvent = $(event.target)
    if (myEvent.is("button"))
    {
        var cardText = (myEvent.parent().parent().parent().children($("p")).text()); // a convoluted way of accessing the card text
        var textSplit = cardText.split("\n"); // split the card text into the different components using '\n' as a separator
        var recipeName = textSplit[0]; // recipe name is the first element
        var calorieNum = textSplit[1].split(":")[1].trim() // calories are the second element, but to get only the number we must split again with ":" as separator
        console.log(recipeName);
        console.log(calorieNum);
        selected_meals[0] = ({meal: "breakfast", dish: recipeName, calories: calorieNum, date: new Date()});
    }
    $(".card").html("");
    $(".results-display").css("padding", "0")
    window.scrollTo(0, 0);
})


$("#mealPlanBtn").on("click", ()=> 
{
    // make a specific function to make card to select 
    var mealPlanDiv = $("<div>")
    mealPlanDiv.html("");
    var mealCard = createMealPlanCard(selected_meals[0].dish, selected_meals[0].calories, "null")
    mealPlanDiv.append(mealCard)
    $("#mealPlanBtn").parent().append(mealPlanDiv);

})