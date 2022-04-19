const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

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
        
async function main() {
    const db = await connectToDb();
    const idiomsCollection = db.collection('idioms');
    
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

}

/** 
 * צריך לזכור שכיוון שב
 * NODEJS
 * async-await 
 * הם רק עטיפה לפרומיס
 * אז מה שחוזר מפונקציה שמוגדרת
 * async
 * הוא רק פרומיס
 * אז אם רוצים לצאת מהקטע הזה
 * ולעשות בשיטה כביכול סינכרונית
 * 
 * יש כמה דרכים לעשות זאת :
 * א - השיטה הטריקית - לבנות פונקציית 
 * main
 * שהיא 
 * async
 * ואז לקרוא לה 
 * זה מה שעשינו כאן
 * 
 * בדוגמאות הבאות, נעבור לעבוד עם 
 * מודולים של 
 * ES6
 * בצורה שבה עובדים איתם ב
 * NODEJS
 * וזה אפשרי באחת מ-2 צורות
 * או ששם הקובץ יהיה עם הסיומת
 * mjs
 * פירושו - 
 * module js
 * 
 * או שבהגדרת החבילה כולם, נגדיר
 * "type":"module"
 * 
 * בכל מקרה, ברגע שנשתמש באחת מ-2 הצורות האלו
 * נהיה חייבים להמיר את פקודות ה- 
 * require
 * אל פקודות 
 * import export
 * 
 */
main();