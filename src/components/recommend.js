import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./header";
import Nav from './nav'
import Modal from './modal';
import '../styleComponents/recommned.css';

function Recommend()
{
    const [on, setOn] = useState(false);
    const [modal, setModal] = useState(false);
    const [weather, setWeather] = useState();
    const [recommend, setRecommend] = useState();
    const [review, setReview] = useState();
    const [outside, setOutside] = useState();

    const getReview = (node) =>{
        const data = node.dataset.columns;
        axios.get(`/api/getReview?num=${data}`)
        .then(response => {
            return response
        }).then(data=>{
            setReview(data.data)
            setModal(true);
        })
    }

    let icon;
    if(weather === "맑음") icon = "https://cdn-icons-png.flaticon.com/128/1842/1842863.png";
    else if(weather === "구름많음") icon = "https://cdn-icons-png.flaticon.com/128/2932/2932445.png";
    else if(weather === "흐림") icon = "https://cdn-icons-png.flaticon.com/128/2930/2930014.png";
    else if(weather === "비") icon = "https://cdn-icons-png.flaticon.com/128/3313/3313888.png";
    else if(weather === "비/눈") icon = "https://cdn-icons-png.flaticon.com/512/727/727806.png";
    else if(weather === "눈") icon = "https://cdn-icons-png.flaticon.com/128/727/727809.png";

    useEffect(()=>{
        axios.get('/api/weather')
        .then(response=>{
            return response;
        }).then(data=>{
            const item = data.data.response.body.items;
            if(item.item[6].fcstValue==="1" || item.item[6].fcstValue==="5") { setWeather("비"); setOutside(0); }
            else if(item.item[6].fcstValue==="2" || item.item[6].fcstValue==="6") { setWeather("비/눈"); setOutside(0); }
            else if(item.item[6].fcstValue==="3" || item.item[6].fcstValue==="7") { setWeather("눈"); setOutside(0); }
            else{
                if(item.item[18].fcstValue==="1") { setWeather("맑음"); setOutside(1); }
                else if(item.item[18].fcstValue==="3") { setWeather("구름많음"); setOutside(1); }
                else if(item.item[18].fcstValue==="4") { setWeather("흐림"); setOutside(0); }
            }
        })
    }, [])

    useEffect(()=>{
        axios.get(`/api/recommend?out=${outside}`)
        .then(response=>{
            return response;
        }).then(data=>{
            setRecommend(data.data);
            setOn(true);
        })
    }, [outside]);

    useEffect(()=>{
        console.log(outside);
        
    }, [outside]);

    setTimeout(()=>{
        document.querySelector('.innerdiv').innerHTML = "";
        for(let i=0;i<recommend.length;i++){
            let star = '★'.repeat(recommend[i].rvavg);
            star += '☆'.repeat(5-recommend[i].rvavg);
            document.querySelector('.innerdiv').innerHTML += 
            `<div class="fruit--div" data-columns="${recommend[i].tourNum}">
                    <img src="${recommend[i].tourImage}" class="fruit--img"/>
                    <div class="fruit--content">
                    <p class="tourlist--name">${recommend[i].tourName}</p>
                    <p>${recommend[i].tourExplain}</p>
                    <p><span>${star}</span> ${recommend[i].rvavg}</p>
                    <button class="review--btn">리뷰 보기</button>
                </div>
            </div>`;
        }
        const reviewBtn = document.querySelectorAll(".review--btn");
        const el = document.querySelectorAll('.fruit--div');
        for(let i=0;i<el.length;i++){
            reviewBtn[i].addEventListener('click', function(){getReview(el[i])});
        }
    }, 600);

    const closeModal = () => {
        setModal(false);
      };

    return(
        <div>
            <Header/>
            <Nav/>
            {on ? 
                <div className="recommend-rootdiv">   
                    <div className="reco-wea">
                        <span className="reco-title">날씨별 추천</span>
                        <div className="reco-wea--div">
                            <img src={icon} alt="icon"></img>
                            <p>{weather}</p>
                        </div>
                    </div>
                    <div className="innerdiv"></div>
                    {modal ? <Modal review={review} close={closeModal}/> : <></>}
                </div> 
            : 
                <div className="reco-wea"><span className="reco-loading">날씨 데이터를 받아오는 중...</span></div>
        }
        </div>
    )
}
export default Recommend;