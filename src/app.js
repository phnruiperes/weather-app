const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const weather = require('./utils/weather.js')
//creating web server
const app = express()

//define paths
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup static directory 
app.use(express.static(publicDirectoryPath))

//setup view engine (handlebards) for dynamic pages
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Pedro H'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Pedro H'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Pedro H',
        helptext: 'Help text'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: 'You must provide an address term'
        })
    } else {
        geocode(req.query.address, (error, { lat, lon, place } = {}) => {
            if (error) {
                return res.send({ error })
            }

            weather(lat, lon, (error, weatherFinal ) => {
                if (error) {
                    return res.send({ error })
                }

                res.send({ weatherFinal,place })
            })
        })
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'You must provide a search term'
        })
        return null
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Pedro H',
        errorMsg: 'Help page not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Pedro H',
        errorMsg: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})