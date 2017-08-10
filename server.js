const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const app = express();

// tell hbs to use partials
hbs.registerPartials(__dirname + '/views/partials');
// template engine
app.set('view engine', 'hbs');
// static files middleware
app.use( express.static( __dirname + '/public' ) );
// my middlewre: logger
app.use( (req, res, next) => {
    const now = new Date().toString();
    const log = `${now} ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log(err);
        }
    })
    next();
});


// hbs helpers
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear() );
// helper with arguments
hbs.registerHelper('screamIt', (text) => text.toUpperCase() );

// get 
app.get( '/', (req, res) => {
    res.render('index.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to SomeWebSite Home Page'
    });
} );

app.get( '/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
} );

app.get( '/bad', (req, res) => {
    res.send({
        msg:'Unable to handle the request,  this is an error message'
    })
})

app.listen( 3000, () => console.log('listening on port 3000') );