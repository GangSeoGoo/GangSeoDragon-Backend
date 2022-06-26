import {Link} from "react-router-dom";

export default function Nav(){
    return(
        <nav>
            <Link to={"/tourlist"}>관광지 리스트</Link>
            <Link to={"/recommend"}>날씨별 관광지 추천</Link>
            <Link to={"/location"}>위치별 관광지 추천</Link>
            <Link to={"/fruits"}>특산물 소개</Link>
            <Link to="/review">리뷰 남기기</Link>
        </nav>
    )
}
