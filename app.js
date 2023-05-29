const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

// Here contact dance is the name of the database in which collections has been saved
mongoose.connect('mongodb://127.0.0.1/contactDance',{useNewUrlParser:true});
const port = 80;

//Define mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    number: Number,
    email: String,
    move: String
});

// here contact is the collection in which data has been stored in the form of array
var Contact = mongoose.model('contact',contactSchema);


// Express specific stuff { This is use for using pug with express in short merging the pug with express}
app.use('/static',express.static('static'))
app.use(express.urlencoded())

// Pug specific stuff {This is use to set the pug directory}
app.set('view engine','pug')  // Set the template engine as pug
app.set('views',path.join(__dirname,'views')) // Set the views directory


// Endpoints (get and post request has been written on this area)
app.get('/',(req,res)=>{
    const params = { }
    res.status(200).render('home.pug',params);
})

app.get('/contact',(req,res)=>{
    const params = { }
    res.status(200).render('contact.pug',params);

})

app.post('/contact',(req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item is succesfully save to the database ")
    }).catch(()=>{
        res.status(400).send("The item was not saved to the database ")
    }); 
    // res.status(200).render('contact.pug');
})

 


// Start the server (This is use to start the server)
app.listen(port,()=>{
    console.log(`The application started at port ${port}`);
}) 