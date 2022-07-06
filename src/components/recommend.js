import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./header";
import Nav from './nav'

function Recommend()
{
    const [on, setOn] = useState(false);
    const [weather, setWeather] = useState();
    const [recommend, setRecommend] = useState();
    
    useEffect(()=>{
        axios.get('/api/weather')
        .then(response=>{
            return response;
        }).then(data=>{
            const item = data.data.response.body.items;
            console.log(item);
            if(item.item[6].fcstValue==="1" || item.item[6].fcstValue==="5") setWeather("비");
            else if(item.item[6].fcstValue==="2" || item.item[6].fcstValue==="6") setWeather("비/눈");
            else if(item.item[6].fcstValue==="3" || item.item[6].fcstValue==="7") setWeather("눈");
            else{
                if(item.item[18].fcstValue==="1") setWeather("맑음");
                else if(item.item[18].fcstValue==="3") setWeather("구름많음");
                else if(item.item[18].fcstValue==="4") setWeather("흐림");
            }
        })
        axios.get('/api/recommend')
        .then(response=>{
            return response;
        }).then(data=>{
            console.log(data.data);
            setRecommend(data.data);
        })
    }, [])

    setTimeout(()=>{
        setOn(true);
    }, 500);

    setTimeout(()=>{
        document.querySelector('.innerdiv').innerHTML = "";
        for(let i=0;i<recommend.length;i++){
            console.log(weather);
            console.log(recommend[i])
            if(weather==="맑음" || weather==="구름많음"){
                if(recommend[i].outside === 1){
                    document.querySelector('.innerdiv').innerHTML += 
                    `<div class = "fruit--div"><img src="${recommend[i].tourImage}" class="fruit--img"/><div class="fruit--content"><p class="tourlist--name">${recommend[i].tourName}</p><p>${recommend[i].tourExplain}</p><p>${recommend[i].rvavg}</p></div></div>`;
                }
            }
            else{
               if(recommend[i].outside === 0) {
                document.querySelector('.innerdiv').innerHTML += `<div class = "fruit--div"><img src="${recommend[i].tourImage}" class="fruit--img"/><div class="fruit--content"><p class="tourlist--name">${recommend[i].tourName}</p><p>${recommend[i].tourExplain}</p><p>${recommend[i].rvavg}</p></div></div>`;
               }
            }  
        }
    }, 600);

    return(
        <div>
            <Header/>
            <Nav/>
            {on ? 
                <div className="recommend-rootdiv">   
                    <h1>날씨별 추천</h1>
                    <div className="innerdiv"></div>
                </div> 
            : 
                <div><h1>날씨 데이터를 받아오는 중...</h1></div>
        }
        </div>
    )
}
export default Recommend;