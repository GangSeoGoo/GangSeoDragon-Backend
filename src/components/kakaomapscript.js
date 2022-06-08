import { markerdata } from "./markerData";

const { kakao } = window;

export default function KakaoMapScript() {
    const container = document.getElementById('myMap');

    const options = {
        center: new kakao.maps.LatLng(35.150369020443875, 128.87847858651804),
        level: 3
    };
    const map = new kakao.maps.Map(container, options);

    // let markerPosition = new kakao.maps.LatLng(
    //     35.150369020443875,
    //     128.87847858651804
    //   ); //생성될 마커의 위도 경도를 설정

    //   // 마커를 생성
    //   let marker = new kakao.maps.Marker({
    //     position: markerPosition,
    //   });

    //   // 마커를 지도 위에 표시
    //   marker.setMap(map);

    markerdata.forEach((el) => {
        //마커를 생성함
        new kakao.maps.Marker({
            //마커가 표시 될 지도
            map: map,
            position: new kakao.maps.LatLng(el.lat, el.lng),
            title: el.title,
        });
    });
}
