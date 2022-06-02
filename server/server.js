const express = require('express');
const app = express();
const route = require('./routes/router')
const bodyParser = require('body-parser');
const mysql = require('mysql');
const port =process.env.PORT || 3001;

const con = mysql.createConnection({
    host: 'localhost',
    user: 'boardgame',
    password: 'boardgame',
    database: 'GangSeo_Dragon'
});
con.connect(err => {
    if(err) console.log(err)
    else console.log('success')
    const sql = 'select * from tourlist';
    con.query(sql, (err, result, fields)=>{
        if(err) console.log(err)
        else console.log(result)
    })
})

app.use(bodyParser.json());
app.use('/', route)
app.get('/api/weather', route)

app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})
