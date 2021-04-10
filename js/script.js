fetch('https://api.edamam.com/api/nutrition-details?app_id=c0e5457f&app_key=79e54162568a949c20d2c8c2ff8d8d34')
.then(res => {
    if(res.ok){
        console.log("SUCCESS")
    } else {
        console.log("not success")
    }
    res.json(recipie.json)
})
.then(data => console.log(data))
.catch(error => console.log("Error"))

