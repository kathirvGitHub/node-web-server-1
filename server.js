const express = require('express');
const axios = require('axios');
const hbs = require('hbs');

const port = process.env.PORT || 3000;

//var jdeLoginURL = 'http://172.19.2.24:9082/jderest/tokenrequest';
var jdeLoginURL = 'http://aisdv910.forza-solutions.com:9082/jderest/tokenrequest';
var jdeLoginData = {
    "username": "KPANDURANG",
    "password": "Dec2015!",
    "deviceName": "karthikMachine",
    "environment": "JDV910",
    "role": "*ALL"
};

var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    if(req.url === '/' || req.url === '/testJSON'){
        next();
    }
    else
    {
        res.render('error.hbs');
    }
})

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})

// app.get('/', (req, res) => {
//     res.send('<h1>Karthik is back !.</h1> <hr> To get your JDE token click <a href = /testJSON>here</a>');
// });

app.get('/', (req, res) => {
    res.render('home.hbs', {
        userName : 'Karthikeyan'
    });
})

app.get('/testJSON', (req, res) => {
    axios.post(jdeLoginURL, jdeLoginData).then((response) => {
        console.log("Token :", response.data.userInfo.token);    
        res.send(response.data);    
    })
    // res.send(response.data);
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle : 'About Page',
        userName : 'Karthikeyan'
    });
})

app.listen(port, () => {
    console.log (`Server is running on port ${port}`)
});