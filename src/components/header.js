import { useNavigate } from "react-router-dom";
import React from "react";

export default function Header(){
    const navigate = useNavigate();
    return(
        <header>
            <img src="../images/gangseo.png" className="logo" alt={"이미지 로딩중..."} onClick={ ()=> navigate('/')}/>
        </header>
    );
}
