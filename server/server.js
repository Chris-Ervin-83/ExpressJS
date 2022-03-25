const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs')
let app = express();


let dataPath = path.join(__dirname, 'form-submissions.json');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('/', (req, res, next) => {
    console.log(req.url)
    next();
})

app.post('/formsubmissions', (req, res, next) => {
    // console.log(req.body.name)
    // console.log(req.body.email)

    let credentials = { email: req.body.email, password: req.body.name };
    let data = JSON.stringify(credentials)

    fs.writeFile("./credentials.json", data, (err) => {
        if (err) throw err;
        console.log('successful')
    });
    
    res.send('Thank you for submitting!')
})

app.use(express.static(path.join(__dirname, '../public')))


app.listen(3000)