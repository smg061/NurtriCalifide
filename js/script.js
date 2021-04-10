var API_KEY = "c5de6033238da0ac0e14b9584fa42144";
var AP_ID = "9ca4ed8a"
var FETCH_URL =  "https://api.edamam.com/api/nutrition-details?app_id="+AP_ID + "&app_key="+ API_KEY;

// recipe to submit to nutrition analysis API
var recipe = {
    title: "Fresh Ham Roasted With Rye Bread and Dried Fruit Stuffing",
    prep: "1. Have your butcher bone and butterfly the ham and score the fat in a diamond pattern. ...",
    yield: "About 15 servings",
    ingr: [
      "1 fresh ham, about 18 pounds, prepared by your butcher (See Step 1)",
      "7 cloves garlic, minced",
      "1 tablespoon caraway seeds, crushed",
      "4 teaspoons salt",
      "Freshly ground pepper to taste",
      "1 teaspoon olive oil",
      "1 medium onion, peeled and chopped",
      "3 cups sourdough rye bread, cut into 1/2-inch cubes",
      "1 1/4 cups coarsely chopped pitted prunes",
      "1 1/4 cups coarsely chopped dried apricots",
      "1 large tart apple, peeled, cored and cut into 1/2-inch cubes",
      "2 teaspoons chopped fresh rosemary",
      "1 egg, lightly beaten",
      "1 cup chicken broth, homemade or low-sodium canned"
    ]
  }


// function that fetches nutrition details of the recipe detailed above
fetch (FETCH_URL, 
    {
        method: "POST",
        headers: {"Content-Type": "application/json;charset=UTF-8"}, // specify the format of the recipe submission in the header
        body: JSON.stringify(recipe) // submit the recipe in stringified form in the body
    })
.then(res => {
    if(res.ok){
        console.log("SUCCESS")
    
    } else {
        console.log("not success")
    }
    // return the response
    return res.json()
})
.then (data => {
    console.log(data)
})


/* TODO: Add an search bar element to the HTML document that parses search parameters and displays the results dynamically */
// recipe fetch 

// reassinging the variables from above to reuse the parameters from the function above
var parameters = "?q=chicken";

AP_ID = "8644d665";

API_KEY = "64d713a99c6d8aab9d04c626a6c6ab94";

FETCH_URL = "https://api.edamam.com/search?q=chicken&mealType=lunch&app_id=" + AP_ID + "&app_key=" + API_KEY;


function fetchRecipe(FETCH_URL){
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
    })
}


fetchRecipe(FETCH_URL);