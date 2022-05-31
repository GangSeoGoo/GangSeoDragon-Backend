import React, { useEffect } from "react";
import axios from 'axios';
import { useState } from "react";

export default function Weather(){
    const [weather, setWeather] = useState(null);
    //axios 통신
    useEffect(() => {
        axios.get('api/weather')
            .then(function(response) {
                return response;
            }).then(data=>{
                const item = data.data.response.body.items.item[24];
                setWeather(item.fcstValue);
        })
            .catch(function(error) {
                console.log(error);
            })
    }, []);
    return(
        <h1>{weather}ºC</h1>
    )
}
