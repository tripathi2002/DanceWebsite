const express = require('express');
const path = require("path");
const app = express();
var mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost:27017/contactDance');
const port = 100;

// , {usernewUrlParser: true})
/* npm install body-parser */

// var db = mongoose.connection;

// // Mongoose Schema
// const contactSchema = new mongoose.Schema({
//     name: String
//   });

// const Contact = mongoose.model('Contact', 'contactSchema');

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    adress: String,
    desc: String
  });

const details = mongoose.model('vibhu', contactSchema);


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS


app.post('/contact', (req, res)=>{
        var myData = new details(req.body);

            myData.save().then(()=>{
                res.send("this item has ben submited successfully ")
            }).catch(()=>{
                res.status(400).send("Item was not saved")
            })

        // res.status(200).render('contact.pug');
});


app.get('/', (req, res)=>{
    // const params = { }
    res.status(200).render('index.pug');
});

app.get('/home', (req, res)=>{
    res.status(200).render('home.pug');
});

app.get('/about', (req, res)=>{
    res.status(200).render('about.pug');
});

app.get('/services', (req, res)=>{
    res.status(200).render('services.pug');
});

app.get('/class', (req, res)=>{
    res.status(200).render('class.pug');
});

app.get('/contact', (req, res)=>{
    res.status(200).render('contact.pug');
});


// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});