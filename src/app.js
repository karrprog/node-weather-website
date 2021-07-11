const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000

//Define paths for Express Config ***************************
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const paritalsPath= path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location **************
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(paritalsPath);

//Setup static directory to serve
app.use(express.static(path.join(publicPath)));

//********************************************************************************************** */
//Routes 
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Nathaniel Karr'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Nathaniel Karr'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Nathaniel Karr',
        message: 'How may we help you?'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'A location must be provided'
        })
    }

    const location = req.query.address

    geocode(req.query.address,(error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error});
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error});
            }
            return res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
            
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }

    req.query.search
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'ERROR 404',
        name: 'Nathaniel Karr',
        message: 'Help article not found'
    })
})

// Default page for all other pages
app.get('*', (req, res) => {
    res.render('404', {
        title: 'ERROR 404',
        message: 'Page not found',
        name: 'Nathaniel Karr'
    })
});

//************************************************************************************************************* */
app.listen(port, () => {
    console.log('Server is up on port ' + port);
});