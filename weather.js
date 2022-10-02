require('dotenv').config()
const { default: axios } = require("axios")

// Have to use named import
class Mapbox {
    constructor(sloc) {
        this.sloc = encodeURIComponent(sloc);
        console.log(this.sloc)
    }
    getLatandLong() {
        var wsloc2 = this.sloc;
        return new Promise(function (resolve, reject) {
            const mbtoken = process.env.MB_TOKEN;
            axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${wsloc2}.json?access_token=${mbtoken}`)
                .then(resp => {
                    var loc = resp.data.features[0].center
                    resolve(loc);
                })
                .catch(err => {
                    // interesting way of checking params
                    console.log(err.request?.data?.message)
                    reject(err);
                })
        });
    }
}



class Weatherstack {
    constructor(lng,lat) {
        this.lng = lng;
        this.lat = lat
        this.wsloc=`${lng},${lat}`
    }
    getWeather() {
        const wskey = process.env.WS_KEY;
        const wsloc = this.wsloc
        return new Promise(function (resolve, reject) {
            //const wsloc2 = encodeURIComponent(wsloc) // Needed to encode spaces 
            axios.get(`http://api.weatherstack.com/current?access_key=${wskey}&query=${wsloc}`)
            .then(resp=>{
                

                var ctemp = resp.data.current.temperature
                var ftemp = resp.data.current.feelslike
                
                var locationtemp={ctemp,ftemp}

                console.log(`Current temp in ${wsloc} is ${ctemp}`)
                resolve(locationtemp)
            })
            .catch(err=>{
                console.log(err.message)
                reject(err)
                // More details on axios errors 
                //https://stackabuse.com/handling-errors-with-axios/
            })
        });
    }
}

// Multiple classes and objects can be exported 
// module.exports = { MyClass1, MyClass2 }
module.exports = { Mapbox,Weatherstack }