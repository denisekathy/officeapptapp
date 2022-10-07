const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/officeDB", {useNewUrlParser: true});

const doctorSchema ={
    id: String,
    firstName: String,
    lastName: String
}

const Doctor = mongoose.model("Doctor", doctorSchema);

//Display all the doctors
app.get("/doctors", function(req, res){
    Doctor.find(function(err, foundDoctors){
        if(!err){
            res.send(foundDoctors)
        } else {
            res.send(err);
        }

    })
});



app.listen(3000, function(){
    console.log("Server started on port 3000");
})