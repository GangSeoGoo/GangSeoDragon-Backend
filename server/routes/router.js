const express = require('express');
const cors = require('cors');
const request = require("request");
const app = express();
const router = express.Router();

router.get('/api/weather', (req, res) => {
    //오늘 날짜
    let respon;
    const today = new Date();
    const newtoday = today.getMonth()+1>10?
    String(today.getFullYear()) + (today.getMonth()+1) + today.getDate():
    String(today.getFullYear()) + 0 +(today.getMonth()+1) + today.getDate();

    //보도시각
    const time = today.getHours()-1 + '00';

    //강서구 오늘 날씨 api
    let url = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=9abgPTEvn3jushxgXzWUK1%2BT6TJN%2Fny94tG5QnJ0hmlykMvQPmC3%2FaXeZUfAZF9zvX7DafAgDqO7ObzrMr0wbQ%3D%3D&numOfRows=50&pageNo=1&base_date=${newtoday}&base_time=${time}&nx=96&ny=76&dataType=JSON`;
    const corsOption={
        origin: url
    }
    app.use(cors(corsOption));
    request(url, (err, res, body)=>{
        console.log(body);
        respon = body;
    });
    res.send(respon);
})

module.exports = router;
