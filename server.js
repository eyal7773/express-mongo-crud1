const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017', (err, db) => {
    if (err) {
        return console.error('Unable to connect to MongoDB server, Error is: ', err);
    }

    console.log('Connected to MongoDB server');
});


app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html');
})

app.post('/quotes',(req,res) => {
    console.log(req.body);
})


app.listen(3000, () => {
    console.log('Server is listening on port 3000');
})