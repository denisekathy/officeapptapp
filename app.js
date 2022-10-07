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

//Doctors 

const doctorSchema ={
    id: String,
    firstName: String,
    lastName: String
}

const Doctor = mongoose.model("Doctor", doctorSchema);


//Display all the doctors
app.route("/doctors")
.get(function(req, res){
    Doctor.find(function(err, foundDoctors){
        if(!err){
            res.send(foundDoctors)
        } else {
            res.send(err);
        }

    })
});


//Appointments

const apptSchema ={
    id: String,
    ptfirstName: String,
    ptlastName: String,
    date: Number,
    timeSlot: String,
    Kind: String,
    doctorId: String,
}

const Appt = mongoose.model("Appt", apptSchema);

//Get all appointments for one doctor 
app.route("/appointments/:doctorId")

.get(function(req, res){
    Appt.find(function(err, foundAppts){
            if(!err){
                res.send(foundAppts)
            } else {
                res.send(err);
            }
    })

  
})

// Delete an Appointment
.delete(function(req, res){
    Appt.deleteOne(function(err){
        if(!err){
            res.send("Successfully deleted this appointment");
        } else{
            res.send(err);
        }
    })
});

//Add a new appt to a doctors calendar 
// 1. Find doctor by ID
// 2. Find Availability
// 3. Display Availability
// 4. Select Available TimeSlot 
// 5. Post to Appointment key based on Doctor 

app.listen(3000, function(){
    console.log("Server started on port 3000");
})