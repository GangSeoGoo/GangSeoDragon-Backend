const express = require('express');
const app = express();
const route = require('./routes/router')
const bodyParser = require('body-parser');
const port =process.env.PORT || 3001;


app.use(bodyParser.json());
app.use('/', route)
app.get('/api/weather', route)
app.get('/api/tourlist', route);

app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})
