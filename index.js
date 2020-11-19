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
app.use(express.static(__dirname + '/public'));

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
app.use('/comments', require('./controllers/comments.js'))


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




app.listen(process.env.PORT || 8080, ()=>{
    console.log('youre now in port 8000')
})








