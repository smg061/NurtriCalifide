// API call variables

AP_ID = "8644d665";

API_KEY = "64d713a99c6d8aab9d04c626a6c6ab94";

var selected_meals = [];
var recipes = [];

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
            var recipeLink = data.hits[i].recipe.url;
            var ingredienstList = data.hits[i].recipe.ingredientLines;
            var foodCard = createFoodCard(recipeName, calories, img, recipeLink, ingredienstList);
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
    var submitButton = $("<button>", {class: "button is-primary", id: "submit-search-"+mealtime});
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
function createFoodCard(recipeName, calories, img, recipeLink, ingredientsList)
{
     //containers for the food card elements
     var headerEl = $("<h5>", {class: "card-header"})    
     var cardEl = $("<div>", {class: "card", id: "recipe-display"})
     var bodyEl = $("<div>", {class: "card"})
     var columnEl = $("<div>", {class:"column", id:"food-result", style: "width: 10rem;"});
     var imgEl = $("<img>", {src:img, class: "card-image"})
     var recipeLinkEl = $("<p>", {id:"#ingredientsList", text: `${recipeLink} \n ${ingredientsList}`, style:"display: none"})
     var submitButtonDiv = $("<div>", {class: "control"});
     var submitButton = $("<button>", {class: "button is-primary", id: "btnAddRecipe", style: "display:flex-inline;width:100%",html: "Add recipe"});
    // set the element attributes according to the function parameters
     headerEl.text(recipeName + "\n");
     var caloriesEl = $("<p>", {class: "card-body", id: "calories-text"});
     caloriesEl.text("calories: " +  calories + "\n");
     // put together all the elements
     bodyEl.append(headerEl);
     bodyEl.append(imgEl)
     bodyEl.append(caloriesEl);
     bodyEl.append(recipeLinkEl)
     cardEl.append(bodyEl)

     submitButtonDiv.append(submitButton);
     //columnEl.append(cardEl);
     cardEl.append(submitButtonDiv);
     // return the food card element
     return cardEl

}

// modified version of above function that does not have a button

function createMealPlanCard(recipeName, calories)////img)
{
     //containers for the food card elements
     var headerEl = $("<h5>", {class: "card-header"})    
     var cardEl = $("<div>", {class: "card", id: "recipe-display"})
     var bodyEl = $("<div>", {class: ""})
     //var imgEl = $("<img>", {src:img, class: "card-image"})
    // set the element attributes according to the function parameters
     headerEl.text(recipeName + "\n");
     var caloriesEl = $("<p>", {class: "card-body", id: "calories-text"});
     caloriesEl.text("calories: " +  calories + "\n");
     // put together all the elements
     bodyEl.append(headerEl);
     //bodyEl.append(imgEl)
     bodyEl.append(caloriesEl);
     cardEl.append(bodyEl)
     // return the food card element
     return cardEl

}

// modified version of the above function that includes an <a> element for a link to the recipe
function createRecipeCard(recipeName, recipeLink)
{
     //containers for the food card elements
     var headerEl = $("<h5>", {class: "card-header", style: "font-weight: bold"})    
     var cardEl = $("<div>", {class: "card", id: "recipe-display"})
     var bodyEl = $("<div>", {class: ""})
    // set the element attributes according to the function parameters
     headerEl.text(recipeName + "\n");
     var recipeLinkEl = $("<a>", {class: "card-body", id: "link-text", href: recipeLink, text: "See recipe"});
     // put together all the elements
     bodyEl.append(headerEl);
     //bodyEl.append(imgEl)
     bodyEl.append(recipeLinkEl);
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

// get a valid url to make an API request for Nutritionix
function getNutritionixFoodFetchURL(mealType)
{
    var searchText = $(`#${mealType}`).val() // get the value of the input text
    return "https://trackapi.nutritionix.com/v2/search/instant?query=" + searchText // return appropriate URL to fetch
}

function getSelectedMealOption(dropMenuId)
{
    var selectedOption = $(`#${dropMenuId}`).find("option:selected").text()
    return selectedOption;

}

/* from here on, all the code is related to the actual execution of the app */

// stores the selected meals to local storage; this function gets called every time a meal gets added to selected_meals
function storeMeals()
{  
    if(selected_meals.length !== 0)
    {
        localStorage.setItem("meals", JSON.stringify(selected_meals));    
    } 
    if(recipes.length !== 0)
    {
        localStorage.setItem("recipes", JSON.stringify(recipes));
    }
}

// this function retrieves the meals and recipes arrays from local storage
function retrieveMeals()
{
    retrievedMeals = JSON.parse(localStorage.getItem("meals"));
    retrievedRecipes = JSON.parse(localStorage.getItem("recipes"));
    // set the local selected_meals array to the stored array only if the stored one exists
    if (retrievedMeals != undefined && retrievedMeals.length != 0)
    {
        selected_meals = retrievedMeals;
    }
    // same for recipes
    if(retrievedRecipes != undefined && retrievedRecipes.length !=0 )
    {
        recipes = retrievedRecipes;
    }
}

// this function adds and returns the total calories for the current mealplan
function getTotalCalories()
{
    totalCalories = 0; // rolling total 
    for (meal of selected_meals)
    {
        if(meal != null) // in case user hasn't selected one of the three meals
        {
            totalCalories += parseInt(meal.calories); // if parseInt() isnt used, the function thinks calories are strings and just concatenates the numbers
        }
    }
    return totalCalories;
}

// load meals if any have been stored before
retrieveMeals();
// searchbars for each section
var searchBarBreakfast = constructSearchBar("breakfast");
var searchBarLunch = constructSearchBar("lunch");
var searchBarDinner = constructSearchBar("dinner");
// append a search bar to each specific section
$("#breakfastDiv").append(searchBarBreakfast)
$("#lunchDiv").append(searchBarLunch);
$("#dinnerDiv").append(searchBarDinner);
// individual event listeners for each search bar
$("#submit-search-breakfast").on("click", ()=> 
{
    // clear the html of the area where the food results are displayed
    $("#resultsDisplay").html("");
    selectedOption = getSelectedMealOption("selectBreakfast");

    if (selectedOption == "Recipe")
    {
        var fetchURL = getEdamamFetchURL("breakfast");

        $("input").val("")
        if (fetchURL != null)
        {
            fetchEdamamRecipe(fetchURL, "#breakfastDiv");
        }
    }

    else if(selectedOption == "Cheat Meal")
    {
        var fetchURL = getNutritionixFoodFetchURL("breakfast");
        $("input").val("");
        if (fetchURL != null)
        {
            fetchNutritionixFood(fetchURL, "#breakfastDiv")
        }
    }
})

// event listener to display search results on lunch section
$("#submit-search-lunch").on("click", ()=> 
{
    // clear the html of the area where the food results are displayed
    $("#resultsDisplay").html("");
    selectedOption = getSelectedMealOption("selectLunch");

    if (selectedOption == "Recipe")
    {
        var fetchURL = getEdamamFetchURL("lunch");

        $("input").val("")
        if (fetchURL != null)
        {
            fetchEdamamRecipe(fetchURL, "#lunchDiv");
        }
    }

    else if(selectedOption == "Cheat Meal")
    {
        var fetchURL = getNutritionixFoodFetchURL("lunch");
        $("input").val("");
        if (fetchURL != null)
        {
            fetchNutritionixFood(fetchURL, "#lunchDiv")
        }
    }
})
// even listener for dinner section searchbar
$("#submit-search-dinner").on("click", ()=> 
{
    // clear the html of the area where the food results are displayed
    $("#resultsDisplay").html("");
    selectedOption = getSelectedMealOption("selectDinner");

    if (selectedOption == "Recipe")
    {
        var fetchURL = getEdamamFetchURL("dinner");

        $("input").val("")
        if (fetchURL != null)
        {
            fetchEdamamRecipe(fetchURL, "#dinnerDiv");
        }
    }

    else if(selectedOption == "Cheat Meal")
    {
        var fetchURL = getNutritionixFoodFetchURL("dinner");
        $("input").val("");
        if (fetchURL != null)
        {
            fetchNutritionixFood(fetchURL, "#dinnerDiv")
        }
    }
})

// add event listener to dynamically added buttons from the search results
$("div").on("click", "#btnAddRecipe", (event)=>
{
    event.preventDefault();
    myEvent = $(event.target)
    if (myEvent.is("button"))
    {
        var cardText = myEvent.parent().parent().parent().children($("p")).text(); // a convoluted way of accessing the card text
        var textSplit = cardText.split("\n"); // split the card text into the different components using '\n' as a separator
        var recipeName = textSplit[0]; // recipe name is the first element
        var calorieNum = textSplit[1].split(":")[1].trim() // calories are the second element, but to get only the number we must split again with ":" as separator
        var mealTime = $("#btnAddRecipe").parent().parent().parent().parent().text().trim().split("\n")[0] // convoluted way of getting the section name (ie breakfast lunch or dinner) because traversing DOM with dynamic elements is hard, as I've found out
        var image = (myEvent.parent().parent().closest("img"));
        // get the recipe link and ingredients list
        var recipeLink = myEvent.parent().parent().children($("#ingredientsList")).text().split("\n");
        console.log(recipeLink);
        // flag variable to help with linear search PS: i'd wrap this mess in different functions if time was not a severe constraint
        var notInlist = true;
        // loop through all recipes
        for (var recipe of recipes) 
        {
            // if the current recipeName is already in the recipes array, set alreadyInList to true
            if (recipeName == recipe[0])
            {
                notInlist = false; // if any instance of the recipe turns out in the recipes array, set the flag to false
            }
        }
        // only push new recipe if it's not in the array already
        if (notInlist)
        {
            recipes.push(recipeLink);
        }
        // store the meals in the appropriate index
        if (mealTime == "Breakfast") 
        {
            selected_meals[0] = ({meal: mealTime, dish: recipeName, calories: calorieNum, date: new Date(), img: ""}) 
        }
        else if (mealTime == "Lunch")
        {
            selected_meals[1] = ({meal: mealTime, dish: recipeName, calories: calorieNum, date: new Date(), img: ""}) 

        }
        else if (mealTime == "Dinner")
        {
            selected_meals[2] = ({meal: mealTime, dish: recipeName, calories: calorieNum, date: new Date(), img: ""}) 
        }
    }
    $(".card").html("");
    $("#mealPlanDiv").html("");
    storeMeals();

})
// event listener that shows the user's currently selected meals
$("#mealPlanBtn").on("click", ()=> 
{
    // make a specific function to make card to select 
    $("#mealPlanDiv").html("");
    $("#mealTitle").html("");
    $("#mealPlanDiv").text("");
    var mealPlanDiv = $("<div>", {id: "mealPlanDiv", class: "column is-full"})
    for (let meal of selected_meals)
    {
        if(meal != null) // in case the user hasn't selected on of the meals 
        {
            var headerTypeOfMeal = $("<h5>", {text: meal.meal, style: "color: black; font-weight:bold;", id: "mealTitle"});
            var mealCard = createMealPlanCard(meal.dish, meal.calories, "null");
            mealPlanDiv.append(headerTypeOfMeal);
            mealPlanDiv.append(mealCard);
            $("#mealPlanBtn").parent().append(mealPlanDiv);
        }
    }
})

$("#recipesBtn").on("click", ()=>
{
    var recipePlanDiv = $("<div>", {id: "recipePlanDiv", class: "column is-full"})
    $("#recipePlanDiv").html("");
    for (let recipe of recipes)
    {
        var recipeName = recipe[0];
        var recipeLink = recipe[2];
        var recipeCard = createRecipeCard(recipeName, recipeLink, "null");
        recipePlanDiv.append(recipeCard);
        $("#recipesBtn").parent().append(recipePlanDiv);

    }
})

$("#goalReviewBtn").on("click", ()=> 
{
    var totalCalories = getTotalCalories();
    console.log(totalCalories)
    
    var goalEL = $("<div>", {class: "card"});
    var cardEl = $("<div>", {class: "card"});
    var caloriesEl = $("<h5>", { class: "card-text", text: `Your meal plan calories: ${totalCalories}`, style: "color: black"});
    cardEl.append(caloriesEl);
    goalEL.append(cardEl);
    console.log(cardEl);
    $("#goalReviewBtn").parent().append(goalEL);

})
