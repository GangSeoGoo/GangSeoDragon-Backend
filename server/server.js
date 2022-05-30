const express = require('express');
const app = express();
const route = require('./routes/router')
const bodyParser = require('body-parser');
const port =process.env.PORT || 3001;


app.use(bodyParser.json());
app.use('/', (req, res)=>{
    res.sendFile('App.js');
})
app.use('/api/weather', route)

app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})
