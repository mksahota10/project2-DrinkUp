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


router.post('/', (req, res) => {
    console.log(req.body)
    db.drink.findOrCreate({
      where:{
        name: req.body.name 
      }, 
      defaults:{
        ingredients:req.body.ingredients,
        instructions:req.body.instructions,
        picture:req.body.picture
      }
    })
    .then(([drink, created])=>{
      console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
      drink.addUser(req.user)
      .then(relationInfo=>{
        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
        console.log(`${req.user.name} added to ${drink.name}`)
        console.log(relationInfo)
       // res.render('/favorites'{})
        //res.render('favorites', {name:drink.name, ingredients:drink.ingredients, instructions:drink.instructions, picture: drink.picture})
        res.redirect('/favorites')
      })
    }) 
    .catch((error) => {
      console.log(error)
   })
  })

  router.get('/', (req, res)=> {
    console.log("###############################################😞")
      console.log(req.session)
  db.userdrinks.findAll({
    where:{
        userId: req.session.passport.user
      },
    })
  .then(drinks=>{
    console.log(drinks)
res.render('favorites', {drinks: drinks,})
//console.log(drink)
  })
  // TODO: Get all records from the DB and render to view
  //res.send('Render a page of favorites here');
});










module.exports=router