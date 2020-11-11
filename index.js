const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const session = require('express-session')
const passport = require('./config/ppConfig.js')
const flash = require('connect-flash')
const isLoggedIn = require('./middleware/isLoggedIn')
const axios = require('axios')
const db = require ('./models')
const methodOverride = require('method-override')



//setup ejs and ejs layouts
app.set('view engine', 'ejs')
app.use(ejsLayouts) 
app.use(methodOverride('_method'))

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
app.use('/favorites', require('./controllers/favorites.js'))


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
    res.redirect('drinks')
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
// app.get('/', (req, res)=>{
//     res.render('home page')
// })


// app.post('/favorites', (req, res)=>{
//     console.log(req.body.name)
//     db.drink.findOrCreate({
        
//       where: {name: req.body.name},
      
      
//     })
//     .then(([createddrink, wasCreated ]) =>{
//       res.redirect('/favorites')
//     })
//     .catch(err =>{
//         console.log(err)
//     //res.send(req.body)
//   })
// })
  


// app.get('/favorites', (req, res)=> {
//     db.drink.findAll()
//     .then(drink=>{
//   res.render('favorites', {drink: drink,})
//     })
//     // TODO: Get all records from the DB and render to view
//     //res.send('Render a page of favorites here');
//   });


//   app.get('/favorites', function(req, res) {
//     // TODO: Get all records from the DB and render to view
//     db.drink.findAll()
//     .then(favorites =>{
//       // favorites.forEach(favoriteChar=>{
//       //    console.log(favoriteChar.image)  
//       //      console.log(favoriteChar.name)
//       // })
//       console.log(favorites)
//         res.render('favorites', {favorites: favorites})
//     //   res.render('faves')
//       // res.send('Render a page of favorites here');
//     })
//     .catch((error) => {
//       console.log(error)
//     }) 
//   })




app.listen(8000, ()=>{
    console.log('youre now in port 8000')
})








