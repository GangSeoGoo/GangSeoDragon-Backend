import React, { useEffect } from "react";
import axios from 'axios';
import { useState } from "react";

export default function Weather(){
    const [weather, setWeather] = useState(null); //날씨
    const [tepmerature, setTemperature] = useState(null); //기온
    const [humidity, setHumidity] = useState(null); //습도
    const [precipitation, setPrecipitation] = useState(null); //강수량
    //axios 통신
    useEffect(() => {
        axios.get('api/weather')
            .then(function(response) {
                return response;
            }).then(data=>{
                const item = data.data.response.body.items;

                //날씨
                if(item.item[6].fcstValue==="1" || item.item[6].fcstValue==="5") setWeather("비");
                else if(item.item[6].fcstValue==="2" || item.item[6].fcstValue==="6") setWeather("비/눈");
                else if(item.item[6].fcstValue==="3" || item.item[6].fcstValue==="7") setWeather("눈");
                else{
                    if(item.item[18].fcstValue==="1") setWeather("맑음");
                    else if(item.item[18].fcstValue==="3") setWeather("구름많음");
                    else if(item.item[18].fcstValue==="4") setWeather("흐림");
                }

                //기온
                setTemperature(item.item[24].fcstValue);

                //습도
                setHumidity(item.item[30].fcstValue);

                //강수량
                item.item[12].fcstValue==="강수없음"?setPrecipitation(0):setPrecipitation(item.item[12].fcstValue);

            })
            .catch(function(error) {
                console.log(error);
            })
    }, []);
    let icon;
    if(weather === "맑음") icon = "https://cdn-icons.flaticon.com/png/128/3570/premium/3570489.png?token=exp=1654008763~hmac=260bdb7fe3544a0e697ce9ff7a555eb0";
    else if(weather === "구름많음") icon = "https://cdn-icons-png.flaticon.com/128/2932/2932445.png";
    else if(weather === "흐림") icon = "https://cdn-icons.flaticon.com/png/128/2441/premium/2441600.png?token=exp=1654009171~hmac=4588d257efb5b6d8ed844d295eab170b";
    else if(weather === "비") icon = "https://cdn-icons-png.flaticon.com/128/3313/3313888.png";
    else if(weather === "비/눈") icon = "https://cdn-icons-png.flaticon.com/512/727/727806.png";
    else if(weather === "눈") icon = "https://cdn-icons-png.flaticon.com/128/727/727809.png";
    return(
        <main>
            <h1>지금 강서구는... <img src={icon}/>{weather}</h1>
            <div>
                기온 : {tepmerature}ºC<br/>
                습도 : {humidity}%<br/>
                강수량 : {precipitation}%<br/>
            </div>
        </main>
    )
}
