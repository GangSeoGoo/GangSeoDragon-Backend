/*global kakao */
import React, { useEffect } from 'react';
import KakaoMapScript from "./kakaomapscript";
import Header from './header';
import Nav from './nav';

export default function Map() {

    useEffect(() => {
        KakaoMapScript();
    }, []);
    
    return (
        <div>
            <Header/>
            <Nav/>
            <div id='myMap' style={{
                width: '100vw',
                height: '100vw'
            }}>
            </div>
        </div>
    );
}