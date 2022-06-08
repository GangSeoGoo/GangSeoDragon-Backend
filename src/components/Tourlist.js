import {useEffect} from "react";
import axios from "axios";

function Tourlist(){
    const selEl = document.querySelector("div");
    let tourlist = [];

    useEffect(()=>{
        axios.get('/api/tourlist')
            .then(response => {
                return response;
            }).then(data=>{
                console.log(data.data)
                for(let i=0;i<data.data.length;i++){
                    tourlist.push({
                        tourNum: data.data[i].tourNum,
                        tourName: data.data[i].tourName,
                        latitude: data.data[i].latitude,
                        longitude: data.data[i].longitude,
                        tourExplain: data.data[i].tourExplain,
                        tourImage: data.data[i].tourImage
                    });
                }
        }).catch(err => {
            console.log(err);
        })
    }, [])
    function sel(){
        console.log(tourlist)
        for(let i=0;i<tourlist.length/2;i++) {
            selEl.innerHTML += `<p>${tourlist[i].tourNum}</p>`
            selEl.innerHTML += `<p>${tourlist[i].tourName}</p>`
            selEl.innerHTML += `<p>${tourlist[i].latitude}</p>`
            selEl.innerHTML += `<p>${tourlist[i].longitude}</p>`
            selEl.innerHTML += `<p>${tourlist[i].tourExplain}</p>`
            selEl.innerHTML += `<img src="${tourlist[i].tourImage}" />`
        }
    }
    return(
        <div>
            <button onClick={sel}>클릭</button>
            <div></div>
        </div>
    )
}
export default Tourlist;
