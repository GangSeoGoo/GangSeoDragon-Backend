const express = require('express');
const cors = require('cors');
const request = require("request");
const app = express();
const router = express.Router();

router.get('/', (req, res)=>{
    res.sendFile('App.js');
})
app.use(cors())
//오늘 날짜
const today = new Date();
const newmonth = today.getMonth()+1>10?String(today.getMonth()+1):String("0" +(today.getMonth()+1))
const newdate = today.getDate()>10?today.getDate():String("0" + today.getDate());
const newtoday = today.getFullYear() + newmonth + newdate;

//보도시각
const newhours = today.getHours()>9?today.getHours():"0"+today.getHours();
const time = newhours-1 + '00';

let url = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=9abgPTEvn3jushxgXzWUK1%2BT6TJN%2Fny94tG5QnJ0hmlykMvQPmC3%2FaXeZUfAZF9zvX7DafAgDqO7ObzrMr0wbQ%3D%3D&numOfRows=36&pageNo=1&base_date=${newtoday}&base_time=${time}&nx=96&ny=76&dataType=JSON`;
router.get('/api/weather', (req, response) => {
    request(url, (err, res, body)=>{
        response.send(body)
    })
});
console.log(url);
module.exports = router;
