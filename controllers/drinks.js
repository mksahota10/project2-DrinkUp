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
        console.log(response.data)
       // res.send(response.data.drinks)
    res.render('drinks', {drinks: response.data.drinks })
})
})


module.exports=router