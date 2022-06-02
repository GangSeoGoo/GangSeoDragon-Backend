import {Link} from "react-router-dom";

export default function Nav(){
    return(
        <nav>
            <Link to={"/about"}>날씨별 관광지 추천</Link>
            <Link to={"/about"}>위치별 관광지 추천</Link>
            <Link to={"/about"}>특산물 소개</Link>
        </nav>
    )
}
