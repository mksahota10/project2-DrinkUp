const express = require('express')
const router = express.Router()
const db =require('../models')
const passport = require('../config/ppConfig.js')
const axios = require('axios');


router.get('/:drinkId', (req, res)=>{
    db.userdrinks.findOne({
      where:{userId: req.user.id, 
        drinkId: req.params.drinkId},
    })
    .then(foundComment=>{
      console.log('my comment', foundComment)
      res.render('comments', {newComments: foundComment.dataValues})
    })
  })


  module.exports=router