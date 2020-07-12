//Basic Imports //
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
var fs = require('fs'); 
var path = require('path'); 





//Initialising of Application //
const app = express();
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json()) 
app.set('view engine', 'ejs');
app.use(express.static("public"));








//Mongoose conection //

mongoose.connect("mongodb+srv://admin-ujjwal:Ujjwaldhiman@todolist-fxluc.mongodb.net/ujjwalblog",{useNewUrlParser:true,useUnifiedTopology: true})







//Basic Schema for database //
var carSchema = new mongoose.Schema({
    catogery : String,
    name : String,
    available : Boolean,
    img:     //since image can't be stored as a normal string file it uses bufferstream//
    { 
        data: Buffer, 
        contentType: String 
    } 
})





//Database Model //
 Car = new mongoose.model("Car" , carSchema);
var fs = require('fs'); 
var path = require('path'); 
var multer = require('multer'); //multer is used to upload images to database //
  
var storage = multer.diskStorage({  //Defined variables for storing name of file and where to store //
    destination: (req, file, cb) => { 
        cb(null, 'uploads') 
    }, 
    filename: (req, file, cb) => { 
        cb(null, file.fieldname + '-' + Date.now()) 
    } 
}); 
  
var upload = multer({ storage: storage }); 







//Dynamic Route for adding cars to database //
app.post('/addcars', upload.single('image'), (req, res, next) => { 
  
    var obj = new Car( { 
        catogery:req.body.catogery,
        name:req.body.name,
        available:req.body.available,
        img: { 
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)), 
            contentType: 'image/jpg'
        } 
    }) 
    obj.save(function(err){
        if(err){
            console.log(err)
        }
        else{
            res.redirect("/")
        }
    })
});






// Getting home route
app.get("/" , function(req,res){
    res.render("home")
})





//Adding images to database
app.get("/add" , function(req,res){
    res.render("add")
})






//Route for getting all cars in database
app.get("/allcars" , function(req,res){
    Car.find({},function(err,response){
        if(!err){
            res.render("allcars" ,{car:response})
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
            res.render("availablecars" , {car:response})
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
            res.render("suv" , {car:response})
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
            res.render("hatchback" , {car:response})
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
            res.render("sedan" , {car:response})
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
            res.render("rent" , {car:response})
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
            res.render("specificCar" ,{specificCar:response})

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
            res.render("totalPrice" , {totalprice:totalPrice , day:days , car:car});
            break;
        
        case 'Hatchback' :
                if(days<=3){
                    totalPrice = regularFee;
                    day = req.body.days;
                    car = req.body.carName;
                    res.render("totalPrice" , {totalprice:totalPrice , day:days , car:car}) ;
                }
                else if(days>3){
                    totalPrice= regularFee + (regularFee * (days-3));
                    day = req.body.days;
                    car = req.body.carName;
                    res.render("totalPrice" , {totalprice:totalPrice , day:days , car:car}) ;
                }
                break;
                
        case 'Sedan' :
            if(days<=5){
                totalPrice = regularFee;
                day = req.body.days;
                car = req.body.carName;
                res.render("totalPrice" , {totalprice:totalPrice , day:days , car:car}) ;
            }
            else if(days>3){
                totalPrice= regularFee + (regularFee * (days-5));
                day = req.body.days;
                car = req.body.carName;
                res.render("totalPrice" , {totalprice:totalPrice,day:days , car:car});
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
let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}
app.listen(port);