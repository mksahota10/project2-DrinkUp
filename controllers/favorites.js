const express = require('express')
const router = express.Router()
const db =require('../models')
const passport = require('../config/ppConfig.js')
const axios = require('axios');






app.post('/', (req, res)=>{
    console.log("Form data:", req.body)
    db.favorites.create(req.body)
    .then(createdFavorties =>{  
        res.redirect('/favorites')

    })
})










module.exports=router