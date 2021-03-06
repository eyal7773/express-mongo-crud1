import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient }  from 'mongodb';

// Based on: https://stackoverflow.com/a/62892482/1598814
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(bodyParser.json());

async function connectToDb() {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017');
        console.log('Connected to MongoDB server');
        let db = await client.db('quotes')
        console.log('Connected to `quotes` database');
        return db;
    } catch (error) {
        console.error('Unable to connect to MongoDB server, Error is: ', error);
        return null;
    }
}
        
    const db = await connectToDb();
    const idiomsCollection = db.collection('idioms');
    
    app.use(bodyParser.urlencoded({ extended: true }));


    app.get('/', async (req,res) => {
        const idioms = await idiomsCollection.find().toArray();
        // console.log('idioms', idioms);
        // res.sendFile(__dirname + '/index.html');
        res.render('index',{quotes: idioms});
    })

    app.post('/quotes',async (req,res) => {
        console.log(req.body);
        await idiomsCollection.insertOne(req.body);
        res.redirect('/');
    })

    app.put('/quotes', async (req,res) => {
        await idiomsCollection.findOneAndUpdate(
                {name: 'הרצל'},
                {$set: {    name: req.body.name,
                            quote: req.body.quote
                       }
                },
                {upsert: true});
        // אנחנו שלחנו גסון
        // צריך להחזיר תשובה בגסון.
        res.json('success');
    });

    app.delete('/quotes', async (req,res) => {
        const result = await idiomsCollection.deleteOne({name: req.body.name});
        if (result.deletedCount !== 1) {
            return res.json('These is no such quote');
        }
        res.json('success');
    });

    app.listen(3000, () => {
        console.log('Server is listening on port 3000');
    })


