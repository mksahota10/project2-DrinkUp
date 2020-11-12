const express = require('express')
const router = express.Router()
const db =require('../models')
const passport = require('../config/ppConfig.js')
const axios = require('axios');




//drinks results from the search page
router.get('/', (req, res)=>{
    let drinkTitle = req.query.drinkTitle
    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkTitle}`)
    .then (response=>{
        // console.log(response.data)
       //res.send(response.data.drinks)
       //iterate over response data then spec. map this response data( map. will return another array )
       let results = response.data.drinks
       const deets =  results.map(result =>{
           //make an array hold the ingredient strings
           let ingredientStrs = []
        //iterate over the object keys //returns a array of the keys for what the params is inside
        let keys = Object.keys(result)
        keys.forEach(key=>{
            //inside of that internation, check if the key string contains the word ingredients
            // and check if the value is not null
            if (key.includes('Ingredient') && result[key]){
                console.log(`${key} is ${result[key]}`)
                //if both the case, then add that string to array 
                ingredientStrs.push(result[key]) 
            }
        })
        console.log('🤯')
        console.log(ingredientStrs)

    
        return {
             strDrink: result.strDrink,
             strInstructions: result.strInstructions,
             strGlass: result.strGlass, 
             strDrinkThumb: result.strDrinkThumb,
             strIngredients: ingredientStrs.join(', ')
        }
       })
    res.render('drinks', {drinks: deets})
})
})


module.exports=router