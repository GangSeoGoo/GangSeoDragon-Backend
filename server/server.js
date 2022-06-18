const express = require('express');
const app = express();
const route = require('./routes/router')
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../build/')));
app.get('/', (req, res)=>{
    res.sendFile(__dirname, '../build/index.html');
})
app.get('/api/weather', route);
app.get('/api/tourlist', route);
app.post('/api/postReview', route);

app.listen(3000, ()=>{
    console.log(`express is running on 3000port`);
})
