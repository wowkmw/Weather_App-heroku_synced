const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000; //process.env.PORT so that the app works on heroku server, which can have any port as it assigns

//define paths for express configuration, '__dirname' points to the current path of this app.js file
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebar engine and views location 
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static dir to serve such as our images and css js scripts
app.use(express.static(publicDir));
app.use(bodyParser.json());

//setup routing for our webserver, currently only get requests
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

const weatherQuery = (req, res, query) => {
    if (!query) {
        res.send({
            error: "Please provide an address"
        });
    } else {
        geocode(query, (error, {
            lat,
            lon,
            location
        } = {}) => {
            if (error) {
                return res.send({
                    error
                });
            }
            forecast(lat, lon, (error, {
                description,
                currentTemp,
                feelslike,
                uvindex,
                humidity
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
                    feelslike,
                    uvindex,
                    humidity
                });
            });
        });
    }
};

app.route('/weather').post((req, res) => {
    const query = req.body.location;
    weatherQuery(req, res, query);
}).get((req, res) => {
    const query = req.query.location;
    weatherQuery(req, res, query);
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Help article not found',
        name: 'Jim Kuo'
    });
});

app.get('/about/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Nothing to show here...',
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