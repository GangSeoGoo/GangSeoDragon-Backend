const express = require('express');
const app = express();
const route = require('./routes/router')
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, '../build/')));
app.get('/', (req, res)=>{
    res.sendFile(__dirname, '../build/index.html');
})
app.get('/api/weather', route);
app.get('/api/tourlist', route);
app.post('/api/postReview', route);
app.get('/api/recommend', route);
app.get('/api/getReview', route);

app.listen(3000, ()=>{
    console.log(`express is running on 3000port`);
})
