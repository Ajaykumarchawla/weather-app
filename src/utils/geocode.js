const request = require('request')

const geocode = (address, callback) =>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) +".json?access_token=pk.eyJ1IjoiYWpheWNoYXdsYSIsImEiOiJja3k4aHN2N3QxYWttMm9zMXJuejZmNGg0In0.M1wUV7WYMKeGDBbUPBUW5A&limit=1"
    request({url,json:true},(error,{ body})=>{
        if(error){
            callback('Unable to connect with location services', undefined);
        }else if(body.features.length ===0){
            callback('invalid city name. try an other search.',undefined)
        }else{            
            callback(undefined,{
                'latitude' : body.features[0].center[1],
                'longitude': body.features[0].center[0],
                'location' : body.features[0].place_name
            })
        }
    });
}

module.exports = geocode;