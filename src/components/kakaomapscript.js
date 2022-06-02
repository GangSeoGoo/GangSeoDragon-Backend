const { kakao } = window;

export default function KakaoMapScript() {
    const container = document.getElementById('myMap');

    const options = {
        center: new kakao.maps.LatLng(35.146658, 128.824483),
        level: 3
    };
    const map = new kakao.maps.Map(container, options);

    let markerPosition = new kakao.maps.LatLng(
        35.146658,
        128.824483
    ); //생성될 마커의 위도 경도를 설정

    // 마커를 생성
    let marker = new kakao.maps.Marker({
        position: markerPosition,
    });

    // 마커를 지도 위에 표시
    marker.setMap(map);
}
