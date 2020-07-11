//Basic Imports //
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

//Initialising of Application //
const app = express();


//Mongoose conection //
mongoose.connect("mongodb://localhost:27017/carDB",{useNewUrlParser:true,useUnifiedTopology: true})


app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));


//Basic Schema for database //
const carSchema = {
    catogery : String,
    name : String,
    available : Boolean
}


//Database Model //
const Car = mongoose.model("car" , carSchema);



//Dynamic Route for adding cars to database //
app.post("/addcars" , function(req,res){
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

 //Home route//
// app.get("/" , function(req,res){
//     res.render("home")
// })

//Route for getting all cars in database
app.get("/allcars" , function(req,res){
    Car.find({},function(err,response){
        if(!err){
            res.send(response)
        }
        else{
            console.log(err)
        }
    })
})



//Route to get all available cars only
app.get("/availablecars" , function(req,res){
    Car.find({available:"true"},function(err,response){
        if(!err){
            res.send(response)
        }
        else{
            console.log(err)
        }
    })
})



//Route for getting cars on basis of catogery
app.get("/SUV" , function(req,res){
    Car.find({catogery:"SUV"},function(err,response){
        if(!err){
            res.send(response)
        }
        else{
            console.log(err)
        }
    })
})



//Route for getting cars on basis of catogery
app.get("/hatchback" , function(req,res){
    Car.find({catogery:"Hatchback"},function(err,response){
        if(!err){
            res.send(response)
        }
        else{
            console.log(err)
        }
    })
})



//Route for getting cars on basis of catogery
app.get("/sedan" , function(req,res){
    Car.find({catogery:"Sedan"},function(err,response){
        if(!err){
            res.send(response)
        }
        else{
            console.log(err)
        }
    })
})



//Route for getting rent in basis of different cars
app.get("/rent" , function(req,res){
    Car.find({available:"true"},function(err,response){
        if(!err){
            res.send(response)
        }
        else{
            console.log(err)
        }
    })
})



//Route for getting different cars
app.get("/car/:carID" , function(req,res){
    const carID = req.params.carID;
    Car.find({_id:carID} ,function(err,response){
        if(!err){
            res.send(response)

        }
        else{
            console.log(err)
        }
    })
})



//Route for calculation of price with respect to different catogeries
app.post("/specificCar",function(req,res){
    const days = req.body.days;
    const category = req.body.category;
    const premiumFee = 1000;
    const regularFee = 500;
    let totalPrice;
    
    switch (category) {

        case 'SUV' :
             totalPrice = days * premiumFee;
             day = req.body.days;
             car = req.body.carName;
            res.send(totalPrice,day,car)
            break;
        
        case 'Hatchback' :
                if(days<=3){
                    totalPrice = regularFee;
                    day = req.body.days;
                    car = req.body.carName;
                    res.send(totalPrice,day,car)
                }
                else if(days>3){
                    totalPrice= regularFee + (regularFee * (days-3));
                    day = req.body.days;
                    car = req.body.carName;
                    res.send(totalPrice,day,car)
                }
                break;
                
        case 'Sedan' :
            if(days<=5){
                totalPrice = regularFee;
                day = req.body.days;
                car = req.body.carName;
                res.send(totalPrice,day,car)
            }
            else if(days>3){
                totalPrice= regularFee + (regularFee * (days-5));
                day = req.body.days;
                car = req.body.carName;
                res.send(totalPrice,day,car)
            }
                break;    
    } 
})




//Route for updating the booked car
app.post("/totalprice" , function(req,res){
    let carName = req.body.car;
    let price = req.body.price;
    let days = req.body.days; 
    var query = {name : carName};
    Car.findOneAndUpdate(query, { available: false }, function(err,result){
        if(err){
            console.log(err)
        }
        else{
            res.send("Thank you for booking with us" +" " + carName + " " + "for" + " " + 
            days + " " + "days" + " " + "at price" + " " + price + " " + "is booked");
        }
    })
        
})



//Listening to port 5000
app.listen(5000,function(){
    console.log("server started on port 5000")
})