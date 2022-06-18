const express = require('express');
const cors = require('cors');
const request = require("request").defaults({maxRedirects: 1000});
const mysql = require("mysql");
const app = express();
const router = express.Router();


//?궇?뵪 api 遺덈윭?삤湲? & ?봽濡좏듃濡? 蹂대궡湲?
app.use(cors())
//?삤?뒛 ?궇吏?
const today = new Date();
const newmonth = today.getMonth()+1>10?String(today.getMonth()+1):String("0" +(today.getMonth()+1))
const newdate = today.getDate()>10?today.getDate():String("0" + today.getDate());
const newtoday = today.getFullYear() + newmonth + newdate;

//蹂대룄?떆媛?
const newhours = today.getHours()>9?today.getHours():"0"+today.getHours();
const time = newhours-1 + '00';

let url = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=9abgPTEvn3jushxgXzWUK1%2BT6TJN%2Fny94tG5QnJ0hmlykMvQPmC3%2FaXeZUfAZF9zvX7DafAgDqO7ObzrMr0wbQ%3D%3D&numOfRows=36&pageNo=1&base_date=${newtoday}&base_time=${time}&nx=96&ny=76&dataType=JSON`;
router.get('/api/weather', (req, response) => {
    request(url, (err, res, body)=>{
        if(err) console.log(err);
        else response.send(body)
    })
});


//mysql ?뿰?룞 & ?뜲?씠?꽣 ?봽濡좏듃濡? 蹂대궡?뒗 api
const con = mysql.createConnection({
    host: 'localhost',
    user: 'gangseodragon',
    password: 'gangseodragon',
    database: 'GangSeo_Dragon'
});
con.connect(err => {
    if(err) {
        console.log(err);
        throw err;
    }
    console.log('success');
})
router.get('/api/tourlist', (req, res)=>{
    const sql = 'select * from tourlist order by tourNum';
    con.query(sql, (err, result, fields)=>{
        if(err){
            console.log(err);
            throw err;
        }
        res.send(result);
    })
})
router.post('/api/postReview', (req, res)=>{
    const data = req.body;
    const setSql = `select tourNum from tourlist where tourName = '${data.tourName}'`;
    con.query(setSql, (err, result, fields)=>{
        if(err){
            console.log(err);
            throw err;
        }
        const num = result;
        const today = new Date();
        const nowDate = `${today.getFullYear()}/${today.getMonth()+1}/${today.getDate()}/${today.getHours()}/${today.getMinutes()}/${today.getSeconds()}`;
        const inSql = `insert into review(tourNum, reviewText, reviewDate, reviewStar) values(${num[0].tourNum}, '${data.reviewText}', '${nowDate}', ${data.reviewStar})`
        con.query(inSql, (err, result, fields)=>{
            if(err){
                console.log(err);
                throw err;
            }
            res.send('success');
        })
    })
})
module.exports = router;
