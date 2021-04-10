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