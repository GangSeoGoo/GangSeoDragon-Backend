import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Nav from "./nav";
import Header from "./header";

function Tourlist() {
    const selEl = document.querySelector(".innerdiv");
    const [tourlist, setTourlist] = useState(null);

    useEffect(() => {
        axios.get('api/tourlist')
            .then(response => {
                return response
            }).then(data => {
                setTourlist(data.data);
            })
    }, [])
    const timer = setTimeout(() => {
        for (let i = 0; i < tourlist.length; i++) {
            selEl.innerHTML += `<div class="tourlist--div" id="tourNum" data-columns="${tourlist[i].tourNum}">
                <p>${tourlist[i].tourNum}</p>
                <p>${tourlist[i].tourName}</p>
                <p>${tourlist[i].tourExplain}</p>
                <img src="${tourlist[i].tourImage}" alt="icon" />
            </div>`
        }
    }, 100)
    function sortOut() {
        selEl.innerHTML = "";
        for (let i = 0; i < tourlist.length; i++) {
            if (tourlist[i].outside === 1) {
                selEl.innerHTML += `<div class="tourlist--div" id="tourNum" data-columns="${tourlist[i].tourNum}">
                    <p>${tourlist[i].tourNum}</p>
                    <p>${tourlist[i].tourName}</p>
                    <p>${tourlist[i].tourExplain}</p>
                    <img src="${tourlist[i].tourImage}" alt="icon" />
                    <button onclick=getTourNum()>리뷰 남기기</button>
                </div>`
            }
        }
    }
    function sortIn() {
        selEl.innerHTML = "";
        for (let i = 0; i < tourlist.length; i++) {
            if (tourlist[i].outside === 0) {
                selEl.innerHTML += `<div class="tourlist--div" id="tourNum" data-columns="${tourlist[i].tourNum}">
                    <p>${tourlist[i].tourNum}</p>
                    <p>${tourlist[i].tourName}</p>
                    <p>${tourlist[i].tourExplain}</p>
                    <img src="${tourlist[i].tourImage}" alt="icon" />
                    <button onclick=getTourNum()>리뷰 남기기</button>
                </div>`
            }
        }
    }
    return (
        <div>
            <Header />
            <Nav />
            <details>
                <summary>정렬</summary>
                <ul>
                    <button onClick={sortOut}>실외</button>
                    <button onClick={sortIn}>실내</button>
                </ul>
            </details>
            <div className="innerdiv"></div>
        </div>
    )
}
export default Tourlist;
