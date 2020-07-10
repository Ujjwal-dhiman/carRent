const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();

mongoose.connect("mongodb://localhost:27017/carDB",{useNewUrlParser:true,useUnifiedTopology: true})

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));

const carSchema = {
    catogery : String,
    name : String,
    available : Boolean
}

const Car = mongoose.model("car" , carSchema);


app.post("/" , function(req,res){
    const newCar = new Car({
        catogery:req.body.catogery,
        name:req.body.name,
        available:req.body.available
    }) 
        newCar.save(function(err){
            if(!err){
                res.send(("added successfully"))
            }
            else{
                console.log(err);
            }
        })
})

app.get("/" , function(req,res){
    Car.find({},function(err,response){
        if(!err){
            res.render("home" ,{car:response})
        }
        else{
            console.log(err)
        }
    })
})

app.listen(3000,function(){
    console.log("server started on port 3000")
})