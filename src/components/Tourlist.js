import {useEffect, useState} from "react";
import axios from "axios";
import Nav from "./nav";
import Header from "./header";

function Tourlist(){
    const selEl = document.querySelector("p");
    const [tourlist, setTourlist] = useState(null);

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
            selEl.innerHTML = "";
            for(let i=0;i<tourlist.length;i++) {
                selEl.innerHTML += `<p>${tourlist[i].tourNum}</p>`
                selEl.innerHTML += `<p>${tourlist[i].tourName}</p>`
                selEl.innerHTML += `<p>${tourlist[i].tourExplain}</p>`
                selEl.innerHTML += `<img src="${tourlist[i].tourImage}" />`
            }
        }, 100)
    })
    function sortOut(){
        selEl.innerHTML = "";
        for(let i=0;i<tourlist.length;i++){
            if(tourlist[i].outside === 1){
                selEl.innerHTML += `<p>${tourlist[i].tourNum}</p>`
                selEl.innerHTML += `<p>${tourlist[i].tourName}</p>`
                selEl.innerHTML += `<p>${tourlist[i].tourExplain}</p>`
                selEl.innerHTML += `<img src="${tourlist[i].tourImage}" />`
            }
        }
    }
    function sortIn(){
        selEl.innerHTML = "";
        for(let i=0;i<tourlist.length;i++){
            if(tourlist[i].outside === 0){
                selEl.innerHTML += `<p>${tourlist[i].tourNum}</p>`
                selEl.innerHTML += `<p>${tourlist[i].tourName}</p>`
                selEl.innerHTML += `<p>${tourlist[i].tourExplain}</p>`
                selEl.innerHTML += `<img src="${tourlist[i].tourImage}" />`
            }
        }
    }
    return(
        <div>
            <Header/>
            <Nav />
            <details>
                <summary>정렬</summary>
                <ul>
                    <button onClick={sortOut}>실외</button>
                    <button onClick={sortIn}>실내</button>
                </ul>
            </details>
            <p></p>
        </div>
    )
}
export default Tourlist;
