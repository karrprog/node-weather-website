const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c5c7476174c34a1d1678bac659e6be1c&query=' + encodeURIComponent(latitude + ',' + longitude) +'&units=f'

    request({url, json: true}, (error, {body}) =>{
        if(error){
            callback('Unable to connect to weather service. Please check your connection.');
        } else if(body.error){
            callback('Unable to find location, please try another');
        } else{
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees outside. It feels like ' + body.current.feelslike + 
            ' degrees out. Current humidity is ' + body.current.humidity + '%. Wind direction: ' + body.current.wind_dir + ' @ ' + body.current.wind_speed + ' MPH');
        }
    })
}






module.exports = forecast;