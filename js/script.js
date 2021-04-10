fetch('https://api.edamam.com/api/nutrition-details?app_id=c0e5457f&app_key=79e54162568a949c20d2c8c2ff8d8d34 ', 
{method: "POST",
headers: {
    'Content-Type': 'application/json'
},
}).then(res => console.log(res))