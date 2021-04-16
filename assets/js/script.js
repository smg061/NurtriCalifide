// API call variables

AP_ID = "8644d665";

API_KEY = "64d713a99c6d8aab9d04c626a6c6ab94";

selected_meals = [];

function fetchEdamamRecipe(FETCH_URL, mealTime) {
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
            var calories = (data.hits[i].recipe.calories/ data.hits[i].recipe.yield).toFixed(0);
            var img = data.hits[i].recipe.image;
            var foodCard = createFoodCard(recipeName, calories, img);
            var resultsDiv = $("<div>", { class: "card", id: "results-display", style: "font-size: 1rem; width: 10rem"})
            resultsDiv.append(foodCard)
            $(mealTime).append(resultsDiv);

        }
    })
}


// this function constructs and returns a searchbar with a submit button
function constructSearchBar(mealtime) 
{
    // construction of search bar element to search for recipes
    var searchBox = $("<div>", {class: "field has-addons"});
    var searchField = $("<div>", {class: "control"});
    var textInput = $("<input>", {class: "input", type: "text", placeholder:"Search for a meal", id:mealtime});
    var submitButtonDiv = $("<div>", {class: "control"});
    var submitButton = $("<button>", {class: "button is-primary", id: "submit-search-edamam-"+mealtime});
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
    var searchText = $(`#${mealtype}`).val(); // get the value of the input text
    if (searchText == "" ) 
    {
        return null;
    }
    return "https://api.edamam.com/search?" + "q=" + searchText.trim() + "&app_id=" + AP_ID + "&app_key=" + API_KEY + `&${mealtype}` + "&health=alcohol-free&diet=balanced"; // return appropriate URL to fetch
    
}

// this function creates a card element with the photo, name, and calories of a recipe
function createFoodCard(recipeName, calories, img)
{
     //containers for the food card elements
     var headerEl = $("<h5>", {class: "card-header"})    
     var cardEl = $("<div>", {class: "card", id: "recipe-display"})
     var bodyEl = $("<div>", {class: ""})
     var columnEl = $("<div>", {class:"column", id:"food-result", style: "width: 10rem;"});
     var imgEl = $("<img>", {src:img, class: "card-image"})
     var submitButtonDiv = $("<div>", {class: "control"});
     var submitButton = $("<button>", {class: "button is-primary", id: "btnAddRecipe", style: "display:flex-inline"});
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
     // return the food card element
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
     bodyEl.append(headerEl);
     bodyEl.append(imgEl)
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
            // API-specific headers 
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

//
function getNutritionixFoodFetchURL()
{
    var searchText = $("input").val(); // get the value of the input text
    return "https://trackapi.nutritionix.com/v2/search/instant?query=" + searchText // return appropriate URL to fetch

}

// searchbars for each section
var searchBarBreakfast = constructSearchBar("breakfast");
var searchBarLunch = constructSearchBar("lunch");
var searchBarDinner = constructSearchBar("dinner");
// append a search bar to each specific section
$("#breakfastDiv").append(searchBarBreakfast)
$("#lunchDiv").append(searchBarLunch);
$("#dinnerDiv").append(searchBarDinner);

// individual event listeners for each search bar
$("#submit-search-edamam-breakfast").on("click", ()=> 
{
    // clear the html of the area where the food results are displayed
    $("#resultsDisplay").html("");
    var fetchURL = getEdamamFetchURL("breakfast");
    $("input").val("")
    if (fetchURL != null)
    {
        fetchEdamamRecipe(fetchURL, "#breakfastDiv");

    }
})

$("#submit-search-edamam-lunch").on("click", ()=> 
{
    // clear the html of the area where the food results are displayed
    $("#resultsDisplay").html("");
    var fetchURL = getEdamamFetchURL("lunch");
    $("input").val("")
    fetchEdamamRecipe(fetchURL, "#lunchDiv");

})

$("#submit-search-edamam-dinner").on("click", ()=> 
{
    // clear the html of the area where the food results are displayed
    $("#resultsDisplay").html("");
    var fetchURL = getEdamamFetchURL("dinner");
    $("input").val("")
    fetchEdamamRecipe(fetchURL, "#dinnerDiv");
    $("#mealPlanDiv").html("");

})


$(document).on("click", "#btnAddRecipe", (event)=>
{
    event.preventDefault();
    myEvent = $(event.target)
    if (myEvent.is("button"))
    {
        var cardText = (myEvent.parent().parent().parent().children($("p")).text()); // a convoluted way of accessing the card text
        var textSplit = cardText.split("\n"); // split the card text into the different components using '\n' as a separator
        var recipeName = textSplit[0]; // recipe name is the first element
        var calorieNum = textSplit[1].split(":")[1].trim() // calories are the second element, but to get only the number we must split again with ":" as separator
        var mealTime = $("#btnAddRecipe").parent().parent().parent().parent().text().trim().split("\n")[0]
        console.log(recipeName);
        console.log(calorieNum);
        selected_meals.push({meal: mealTime, dish: recipeName, calories: calorieNum, date: new Date()});
    }
    $(".card").html("");
    $("#mealPlanDiv").html("");


})



$("#mealPlanBtn").on("click", ()=> 
{
    // make a specific function to make card to select 
    
    $("#mealPlanDiv").html("");
    $("#mealPlanDiv").text("");
    var mealPlanDiv = $("<div>", {id: "mealPlanDiv", class: "column is-full"})
    for (let meal of selected_meals)
    {
        
        var headerTypeOfMeal = $("<h5>", {text: meal.meal, style: "color: black;"});
        //headerTypeOfMeal.text(meal.meal);
        var mealCard = createMealPlanCard(meal.dish, meal.calories, "null");
        mealPlanDiv.append(headerTypeOfMeal);
        mealPlanDiv.append(mealCard);
        $("#mealPlanBtn").parent().append(mealPlanDiv);
    }

    $("#mealPlanDiv").html("");
    
})
