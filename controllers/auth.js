const express = require('express')
const router = express.Router()
const db =require('../models')
const passport = require('../config/ppConfig.js')
const axios = require('axios');

router.get('/signup', (req, res)=> {
    res.render('auth/signup')
})

router.post('/signup', (req, res)=> {
    //res.send('post to signup')
    console.log('signup form user input:',req.body )

// check if the user already exists 
//if it does, throw an error message 
//otherwise create a new user and store them 
db.user.findOrCreate({ //check if that email already exists
    where: {email: req.body.email},
    defaults: {
        name: req.body.name, 
        password: req.body.password
    }
}) //create new user if email was not already found
.then(([createdUser, wasCreated])=>{
     
if(wasCreated){
    console.log(`just created the following user:`, createdUser)
    //log the new user in 
    passport.authenticate ('local', {
        successRedirect: '/',
        successFlash: "Account created and logged in!" // flash message 
    })(req, res) //IIFE = immediate invoked function
}
else{
    req.flash('error', 'email already exists, try loggin in')
    res.redirect('/auth/login')// redirect to login page 
    // console.log('An account associated with that email address already exists! Try logginf in')
}


    //redirect to login page 
    // res.redirect('/auth/login')
})

.catch(err=>{
    req.flash('error', err.message)
    res.redirect('/auth/signup') // redirect to signup page so they can try again 
})
})



router.get('/login', (req, res)=> {
    res.render('auth/login')
})

router.post('/login', (req, res)=> {
    //res.send('post to auth/login')
    console.log('Trying to log in')
    //redirect to home route 
    res.redirect('/')
})

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/auth/login', 
    successRedirect: '/',
    failureFlash: 'Invalid email or password!', //flash comment 
    successFlash: 'You are now logged in!'
}))

router.get('/logout', (req, res)=>{
    req.logout()
    req.flash('success', 'Successfully logged out!') //flash comment 
    res.redirect('/')
})






module.exports=router