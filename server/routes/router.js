const express = require('express');
const cors = require('cors');
const request = require("request").defaults({maxRedirects: 1000});
const mysql = require("mysql");
const app = express();
const router = express.Router();

//날씨 데이터 가져오기
app.use(cors())
const today = new Date();
const newmonth = today.getMonth()+1>10?String(today.getMonth()+1):String("0" +(today.getMonth()+1))
const newdate = today.getDate()>10?today.getDate():String("0" + today.getDate());
const newtoday = today.getFullYear() + newmonth + newdate;

const newhours = today.getHours()>9?today.getHours()-1:"0"+today.getHours()-1;
console.log(newhours)
const time = newhours + '00';

let url = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=9abgPTEvn3jushxgXzWUK1%2BT6TJN%2Fny94tG5QnJ0hmlykMvQPmC3%2FaXeZUfAZF9zvX7DafAgDqO7ObzrMr0wbQ%3D%3D&numOfRows=36&pageNo=1&base_date=${newtoday}&base_time=${time}&nx=96&ny=76&dataType=JSON`;
console.log(url);
router.get('/api/weather', (req, response) => { 
    request(url, (err, res, body)=>{
        if(err) console.log(err);
        else response.send(body)
    })
});

//mysql 연동
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
    const today = new Date(); 
    console.log(data);
    const nowDate = `${today.getFullYear()}/${today.getMonth()+1}/${today.getDate()}/${today.getHours()}/${today.getMinutes()}/${today.getSeconds()}`;
    const inSql = `insert into review(tourNum, reviewText, reviewDate, reviewStar) values(${data.tourNum}, '${data.reviewText}', '${nowDate}', ${data.reviewStar})`
    con.query(inSql, (err, result, fields)=>{
         if(err){
            console.log(err);
            throw err;
        }
        res.send('success');
    })
})
router.get('/api/recommend', (req, res)=>{
    const rsql2 = `select t.tourNum,t.tourName, avg(r.reviewStar) as 평균, t.outside from review r, tourlist t where t.tourNum = r.tourNum group by tourNum, outside order by 평균, t.tourNum`;
    con.query(rsql2, (err, result, fiedls)=>{
        if(err){
            console.log(err);
            throw err;
        }
        res.send(result);
    })
})
module.exports = router;
