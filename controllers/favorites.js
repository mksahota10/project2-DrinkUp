const express = require('express')
const router = express.Router()
const db =require('../models')
const passport = require('../config/ppConfig.js')
const axios = require('axios');


// router.get('/favorites', function(req, res) {
//     db.drink.findAll()
//     .then(drink=>{
//   res.render('index', {drink: drink, showButton: false})
//     })
// })














module.exports=router