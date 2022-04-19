const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

async function connectToDb() {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017');
        console.log('Connected to MongoDB server');
        let db = client.db('quotes')
        console.log('Connected to `quotes` database');
        return db;
    } catch (error) {
        console.error('Unable to connect to MongoDB server, Error is: ', error);
        return null;
    }
}
        
const db = connectToDb();
console.log('db', db);
// הדרך הפשוטה לעשות זאת היא לאחסן את כל הקריאות בתוך הקולבייק של יצירת החיבור למונגו
// הבעיה היא שזה יוצר מה שנקרא 
// callback hell
// ולכן עדיף להחזיר את החיבור מתוך פונקציה או מחלקה
// כמו שאנחנו עשינו
// צריך לדעת שפעמים רבות, בעולם הגאווהסקריפט, אנחנו נראה עדין שימוש רב בקולבייקים



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