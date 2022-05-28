const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const hbs = require('hbs');
const compression = require('compression');
const main = require('./utils/main');

const app = express();
const port = process.env.PORT || 3000; //process.env.PORT so that the app works on heroku

// '__dirname' points to the current path of this app.js file
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebar engine and views location 
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Ssetup static dir to serve such as our images and css js scripts
app.use(express.static(publicDir));
//Use bodyparser middleware to handle post requests
app.use(bodyParser.json());
//Use gzip compression
app.use(compression());

// Routes
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

app.all('/weather', async (req, res) => {
    if (req.method == 'GET') {
        await main.weatherQueryAsync(res, req.query.location);
    } else if (req.method == 'POST') {
        await main.weatherQueryAsync(res, req.body.location);
    } else {
        res.status(400).send();
    }
});

app.get('/help/*', (req, res) => {
    res.status(404).render('404', {
        title: '404',
        errorMsg: 'Help article not found',
        name: 'Jim Kuo'
    });
});

app.get('/about/*', (req, res) => {
    res.status(404).render('404', {
        title: '404',
        errorMsg: 'Nothing to show here...',
        name: 'Jim Kuo'
    });
});

app.get('*', (req, res) => {
    res.status(404).render('404', {
        title: '404',
        errorMsg: 'Page not found',
        name: 'Jim Kuo'
    });
});

app.listen(port, () => console.log(`server is up on port ${port}...`));