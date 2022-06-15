import React from "react";

export default function Fruits(props){
    return(
        <div className="fruit--div">
            <img src={props.img} className="fruit--img"></img>
            <div className="fruit--content">
                <h1 className="fruit--name">{props.name}</h1>
                <span className="fruit--comment">{props.comment}</span>
            </div>
        </div>
    )
}