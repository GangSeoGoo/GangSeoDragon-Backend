import React, { useEffect } from "react";
import axios from 'axios';
import { useState } from "react";

export default function Weather(){
    const [weather, setWeather] = useState([]);

    //axois 통신
    useEffect(() => {
        axios.get('/api/weather')
            .then(function(response) {
                setWeather(response.data);
                console.log(response);
            })
            .catch(function(error) {
                console.log("실패");
            })
    }, []);
    return(
        <h1>{weather}</h1>
    )
}
