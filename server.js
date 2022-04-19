const express = require('express');
const app = express();


app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html');
})

app.post('/quotes',(req,res) => {
    console.log('POST request received');
})


app.listen(3000, () => {
    console.log('Server is listening on port 3000');
})