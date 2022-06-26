import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Nav from "./nav";
import Header from "./header";
import { useNavigate } from 'react-router-dom'

function Tourlist() {
    const selEl = document.querySelector(".innerdiv");
    const [tourlist, setTourlist] = useState(null);
    const navigate = useNavigate();

    function setHTML(i){
        // selEl.innerHTML += `<p>${tourlist[i].tourNum}</p>`
        selEl.innerHTML += `<div class = "fruit--div"><img src="${tourlist[i].tourImage}" class="fruit--img"/><div class="fruit--content"><p class="tourlist--name">${tourlist[i].tourName}</p><p>${tourlist[i].tourExplain}</p></div></div>`
    }

    useEffect(()=>{
        axios.get('api/tourlist')
            .then(response => {
                return response
            }).then(data => {
                setTourlist(data.data);
            })
    }, [])
    useEffect(()=>{
        let timer = setTimeout(() => {
            sortAll();
        }, 100)
    })
    function sortAll(){
        selEl.innerHTML = "";
        for(let i=0;i<tourlist.length;i++) {
            setHTML(i);
        }
    }
    function sortOut(){
        selEl.innerHTML = "";
        for(let i=0;i<tourlist.length;i++){
            if(tourlist[i].outside === 1){
                setHTML(i);
            }
        }
    }
    function sortIn() {
        selEl.innerHTML = "";
        for(let i=0;i<tourlist.length;i++){
            if(tourlist[i].outside === 0){
                setHTML(i);
            }
        }
    }
    return (
        <div>
            <Header />
            <Nav />
            <div className="sort">
                <button onClick={sortAll} className="sort--btn">전체보기</button>
                <button onClick={sortOut} className="sort--btn">실외</button>
                <button onClick={sortIn} className="sort--btn">실내</button>
            </div>
            <div className="innerdiv"></div>
        </div>
    )
}
export default Tourlist;