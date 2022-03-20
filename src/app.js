const path = require("path");
const express = require('express');
const hbs = require('hbs')
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");


const app = express()
const port = process.env.PORT || 3000
// setup handle bar paths
publicPath = path.join(__dirname,'../public')
viewPath = path.join(__dirname,"../tamplets/views")
partialsPath = path.join(__dirname,"../tamplets/partials")


app.use(express.static(publicPath));
app.set("view engine","hbs");
app.set('views',viewPath)
hbs.registerPartials(partialsPath);

app.get('',(req,res)=>{
    res.render('index',{
        title: "Weather App",
        name: "ajay"
    })
    
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: "Help",
        helpMessage:"please do not ping this page",
        name: "ajay"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About",
        name:"Ajay"
    })
})
app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error: "address must be provided"
        })
    }
    let data1;
    location = req.query.address;
    geocode(location,(error, {latitude, longitude, location} = {}) =>{
        if(error){
            return res.send({
                error: error
            })
        }
        // console.log(location)
        forecast(latitude,longitude,(error, data) => {
            if(error){
                return res.send({
                    error: error
                })
            }
            console.log(data)
            return res.send({
                forecast: data,
                location: location,
                address: req.query.address
            }
            )
        })   
    })
    // return res.send(data1)
    // res.send({
    //     forcast: 51,
    //     location: "Hyderabad",
    //     address: req.query.address
    // }
    // )
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:"Help",
        errorText: "Help Article Not Found"
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:"404",
        errorText: "Help Article Not Found"
    })
})


app.listen(port,()=>{
    console.log('node server started at localhost:3000')
});