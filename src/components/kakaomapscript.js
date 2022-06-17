/*global kakao */
import markerData from "./markerData"; // 임의로 만든 데이터파일 불러오기

export default function KakaoMapScript() {
  const container = document.getElementById('myMap');

  const options = {
    center: new kakao.maps.LatLng(35.150369020443875, 128.87847858651804),
    level: 7
  };
  const map = new kakao.maps.Map(container, options);
  markerData.forEach((el) => {  
    let imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png', // 마커이미지의 주소   
    imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기
    imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정
      
        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성
    let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
    markerPosition = new kakao.maps.LatLng(el.lat, el.lng); // 마커가 표시될 위치

    // 마커를 생성합니다
    let marker = new kakao.maps.Marker({
      position: markerPosition, 
      image: markerImage // 마커이미지 설정 
    });



    // infowindow 내부 형태 정의
    const iwContent = `
      <div class="iwBox">
        <h4 class="iwTitle">${el.title}</h4>
        <img class="iwImage" src=${el.image} alt="사진"/>
      </div>
    `;

    // 마커에 표시할 인포윈도우를 생성함
    const infowindow = new kakao.maps.InfoWindow({
      content: iwContent, // 인포윈도우에 표시할 내용
      removable: true,
    });
    // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록
    // 이벤트 리스너로는 클로저를 만들어 등록
    // 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됨
    kakao.maps.event.addListener(
      marker,
      "click", //마우스를 올려둘 때 이벤트
      makeOverListener(map, marker, infowindow),
    );
    // kakao.maps.event.addListener(
    //   marker,
    //   "mouseout", //마우스가 떠날 때 이벤트
    //   makeOutListener(infowindow)
    // );
    
  })
  // 인포윈도우를 표시하는 클로저를 만드는 함수
  function makeOverListener(map, marker, infowindow) {
    return function () {
      infowindow.open(map, marker);
    };
  }
  // 인포윈도우를 닫는 클로저를 만드는 함수
  // function makeOutListener(infowindow) {
  //   return function () {
  //     infowindow.close();
  //   };
  // }
};