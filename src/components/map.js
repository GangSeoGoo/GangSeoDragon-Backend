import Header from "./header";
import {useEffect} from "react";
import KakaoMapScript from "./kakaomapscript";
import Nav from "./nav";

function Map(){
    useEffect(() => {
        KakaoMapScript();
    }, []);
    return(
        <div>
            <Header/>
            <Nav/>
            <div id='myMap' style={{
                width: '100vw',
                height: '100vh'
            }}></div>
        </div>
    )
}
export default Map;
