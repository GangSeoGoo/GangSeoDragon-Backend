import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./header";
import Nav from './nav'

function Recommend()
{
    const [weather, setWeather] = useState();
    let items;
    
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
    }, [])

    useEffect(()=>{
        axios.get('/api/recommend')
        .then(response=>{
            return response;
        }).then(data=>{
            items = data.data;
        })
    }, [])

    setTimeout(()=>{
        for(let i=0;i<3;i++){
            console.log(weather);
            if(weather==='맑음' || weather==='구름많음'){
                if(items[i].outside === 1){
                    document.querySelector('.innerdiv').innerHTML += `<p>${items[i].tourName}</p>`;
                }
            }
            else{
               if(items[i].outside === 0) {
                document.querySelector('.innerdiv').innerHTML += `<p>${items[i].tourName}</p>`;
               }
            }  
        }
    }, 1000)

    return(
        <div className="recommend-rootdiv">   
            <Header/>
            <Nav/>
            <h1>ㅎㅇ</h1>
            <div className="innerdiv"></div>
        </div>
    )
}
export default Recommend;