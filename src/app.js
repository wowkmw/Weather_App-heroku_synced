const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000;

//define paths for express configuration
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebar engine and views location 
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static dir to serve
app.use(express.static(publicDir));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Jim Kuo'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jim Kuo'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Jim Kuo'
    });
});

app.get('/weather', (req, res) => { //this is the weather API handler
    if (!req.query.address) {
        res.send({
            error: "please provide an address"
        });
    } else {
        geocode(req.query.address, (error, {
            lat,
            lon, //destructuring
            location
        } = {}) => { //when destructuring remember to set its default value {}, otherwise 
            //TypeError: Cannot destructure property 'lat' of 'undefined' as it is undefined. can happen
            if (error) {
                return res.send({
                    error
                });
            }
            forecast(lat, lon, (error, {
                description,
                currentTemp,
                feelslike
            } = {}) => {
                if (error) {
                    res.send({
                        error
                    });
                }
                res.send({
                    location,
                    description,
                    currentTemp,
                    feelslike
                });
            });
        });
    }
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        //use return to stop code from executing outside of the if block
        //same as putting the rest of the codes inside an else block
        return res.send({
            error: "search term must be provided"
        });
    }
    console.log(req.query);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Help article not found',
        name: 'Jim Kuo'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Page not found',
        name: 'Jim Kuo'
    });
});

app.listen(port, () => console.log(`server is up on port ${port}...`));