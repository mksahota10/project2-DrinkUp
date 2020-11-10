const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const session = require('express-session')
const passport = require('./config/ppConfig.js')
const flash = require('connect-flash')
const isLoggedIn = require('./middleware/isLoggedIn')
const axios = require('axios')
const db = require ('./models')


//setup ejs and ejs layouts
app.set('view engine', 'ejs')
app.use(ejsLayouts) 


//body parser midleware  (this makes req.body work)
app.use(express.urlencoded({extended:false}))
// app.use('/drinks', drinks)

//session middleware 
app.use(session({
    secret: 'keyboard cat', //
    resave: false, 
    saveUninitialized: true
}))

//middleware for passport
app.use(passport.initialize())
app.use(passport.session())

//passport middleare
app.use(flash())

//custom middleware

app.use((req, res, next)=>{
    //before every route, attach the flash messages and current user to res.locals 
    //this will give us acess to these values in all our ejs pages 
    res.locals.alerts = req.flash()
    res.locals.currentUser = req.user
    next() //move on to the next piece 
})

//controllers midware. This is what allows us to use the controllers routes
app.use('/auth', require('./controllers/auth.js'))
app.use('/drinks', require('./controllers/drinks.js'))
//app.use('/drinks', require('./controllers/drinks.js'))


app.get('/', (req, res)=>{
    res.render('home')
    // if(req.user){
    //     res.send(`current user: ${req.user.name}`)
    // } else{
    //     res.send('No user currently logged in!')
    //}
})
app.get('/profile', isLoggedIn, (req, res)=>{
    res.render('profile')
})

// app.get('/drinks', (req, res)=>{
//     let drinksName = req.query.drinksName
//     //res.send("I'm working")
//     axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinksName}`)
//     .then (response=>{
//         res.render('drinks', {drinks: response.data})
//         //res.send(response.data) //shows the raw data
//     })
//     .catch(err =>{
//         console.log(err)
// })
// })

// app.get('/drinks/:drinkId', (req, res)=>{
//     res.send(`showing info about movie ${req.params.drinkId}`)
// })

// app.get('/', (req,res)=>{
//     // res.send("I'm working")
//     axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`)
//     .then (response=>{
//         res.send(response.data)
//     })
// })

//home route -> form to input drink 
app.get('/', (req, res)=>{
    res.render('home page')
})

// //drinks results from the search page
// app.get('/drinks', (req, res)=>{
//     let drinkTitle = req.query.drinkTitle
//     axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkTitle}`)
//     .then (response=>{
//         console.log(response.data)
//         //res.send(response.data.drinks)
//     res.render('drinks', {drinks: response.data.drinks})
// })

// //show info about one particular drink
// app.get('/drinks/:drinkId', (req, res)=>{
//     res.render('show', {drinkId: req.params.drinkId})
// })





app.listen(8003, ()=>{
    console.log('youre now in port 8003')
})








