const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;


async function connectToDb() {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017');
        console.log('Connected to MongoDB server');
    } catch (error) {
        console.error('Unable to connect to MongoDB server, Error is: ', error);
    }
}
        
connectToDb();


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