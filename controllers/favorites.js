const express = require("express");
const router = express.Router();
const db = require("../models");
const passport = require("../config/ppConfig.js");
const axios = require("axios");
const isLoggedIn = require('../middleware/isLoggedIn')

// route to post data to favorites page
router.post("/", isLoggedIn, (req, res) => {
  console.log(req.body);
  db.drink.findOrCreate({
      where: {name: req.body.name, ingredients: req.body.ingredients, instructions: req.body.instructions, picture: req.body.picture,
      },
      include: [db.user],
    })
    .then(([foundOrCreatedDrink, created]) => {
      foundOrCreatedDrink.addUser(req.user)
      .then(createdRelation=>{
        res.redirect('/favorites')
      })
    })
  })
    //   drink.addUser(req.user).then((relationInfo) => {
    //     console.log(relationInfo);
    //     // res.render('/favorites'{})
    //     //res.render('favorites', {name:drink.name, ingredients:drink.ingredients, instructions:drink.instructions, picture: drink.picture})
    //     res.redirect("/favorites");
    //   });
    // })
    // .catch((error) => {
    //   console.log(error);
    // });

//route to find drink associated with user
router.get("/",isLoggedIn, (req, res) => {
  
  console.log(req.session);
  db.user
    .findOne({
      where: { id: req.user.id },
      include: [db.drink],
    })
    .then((foundUser) => {
      

      res.render("favorites", { faveDrinks: foundUser.drinks });
      console.log(foundUser.drinks);
      //console.log(drink)
    });
});

//Delete a drink from my Drink (favorites)
router.delete("/:id", isLoggedIn, (req, res) => {
  console.log(req.params.id)
  //db.userdrink
   db.drink
    .destroy({
      where: { id: req.params.id }
    })
    .then((numRowsDeleted) => {
      console.log(numRowsDeleted);
      res.redirect("/favorites");
    })
    .catch((err) => {
      res.send(err);
    });
});

//route to post comments
router.put("/:id", isLoggedIn, (req, res) => {
  console.log("😭😭", req.params);
  console.log("😭😭", req.user.id);
  db.userdrinks
    .update(
      { comment: req.body.comment },
      { where: { userId: req.user.id, drinkId: req.params.id } }
    )
    .then((newComment) => {
      console.log("This is my comment", newComment);
      // newComment.
      res.redirect(`/comments/${req.params.id}`);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;