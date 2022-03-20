const request = require('request')
const forecast = (latitude,longitude, callback) =>{

    const url = "http://api.weatherstack.com/current?access_key=db8da336ed00a4f489b9b4cf4946e395&query=" + latitude +","+ longitude;

    request({url, json: true},(error, { body } ={ error:1}) =>{
        if(error){
            callback('Unable to connect with weather services',undefined)
        } else if(body.error){
            callback('invalid location unable to find location',undefined)
        }else{
            callback(undefined,"the current temprature is "+body.current.temperature+" degree celsius. It feels like "+ body.current.feelslike +" degree fehrenheit.")
        }
    })

}

module.exports = forecast