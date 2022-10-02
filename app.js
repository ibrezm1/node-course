require('dotenv').config()

const express = require('express');
const path = require('path');

const app = express();

const publicDirPath = path.join(__dirname,'./public')
console.log(publicDirPath);
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.send('Hello Express!!')
})

// Named vs default export vs modules in node
// https://stackoverflow.com/questions/38296667/getting-unexpected-token-export
// https://stackoverflow.com/questions/58211880/uncaught-syntaxerror-cannot-use-import-statement-outside-a-module-when-import

const { Mapbox, Weatherstack } = require('./weather');


console.log('Hey test ' + 'my line')

// debugger 
// chrome://inspect/
// node inspect app.js
// chrome console window -> ESC

setTimeout(() => {
    console.log('setTimeout called')
}, 2000)

app.get('/getweather', (req, res) => {

    //var sloc = 'Columbus Ohio'
    var sloc = req.query.q;
    console.log(sloc)
    let mb = new Mapbox(sloc);
    mb.getLatandLong().then(loc => {
        console.log(loc)
        var [lat, lng] = loc

        let ws = new Weatherstack(lng, lat);
        ws.getWeather().then(locationtemp => {

            //object destructing  and renaming ctemp to temp
            // default to 5 is no property
            const { ctemp: temp, ftemp, rating = 5 } = locationtemp
            console.log(`Got the temperature : ${temp}`)
            res.send(`Got the temperature : ${temp}`)
        })
    })
})
app.listen(3000, () => {
    console.log('Listening')
})