<<<<<<< HEAD
fetch('https://api.edamam.com/api/nutrition-details?app_id=c0e5457f&app_key=79e54162568a949c20d2c8c2ff8d8d34 ', 
{method: "POST",
headers: {
    'Content-Type': 'application/json'
},
}).then(res => console.log(res))
=======
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
>>>>>>> 793555b67e223d6157c9e1ccb34823f07ab4b1e4
