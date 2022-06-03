import {useEffect, useState} from "react";
import axios from "axios";

function Tourlist(){
    const [tourList, setTourList] = useState({
        tourName: "",
        latitude: 0,
        longitude: 0,
        explain: ""
    });

    useEffect(()=>{
        axios.get('/api/tourlist')
            .then(response => {
                return response;
            }).then(data=>{
                console.log(data.data);
                for(let i=0;i<data.data.length;i++){
                    setTourList({
                        ...tourList,
                        tourName: data.data[i].tourName,
                        latitude: data.data[i].latitude,
                        longitude: data.data[i].longitude,
                        explain: data.data[i].tourExpain
                    })
                }
        }).catch(err => {
            console.log(err);
        })
    })
    return(
        <div>
            <h1>{tourList.tourName}</h1>
            <h1>{tourList.latitude}</h1>
            <h1>{tourList.longitude}</h1>
            <h1>{tourList.explain}</h1>
        </div>
    )
}
export default Tourlist;
