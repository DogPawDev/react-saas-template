/*global kakao*/
import React from 'react';
import styled from "styled-components";

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;


const KaKaoMap=({datas = []})=>{
 
//datas는 캠핑장 목록을 담을 props 입니다.

//카카오 지도 API를 불러오는 부분입니다.
const mapScript = document.createElement("script");
mapScript.async = true;
mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=189d436aa8c877e447c0b9c8c52b9f2e&autoload=false`;

document.head.appendChild(mapScript);
//index.html에 head에 카카오맵 api를 불러오는 <script> 태그를 추가했습니다.

const onLoadKakaoMap = () => {
  window.kakao.maps.load(() => {

    // 카카오 지도 API를 담을 TAG 입니다.
    const mapContainer = document.getElementById("map");

    // 지도의 초기 세팅값 설정을 할 수 있습니다.
    const mapOption = {
      center: new window.kakao.maps.LatLng(37.365264512305174, 127.10676860117488), // 지도의 중심좌표
      level: 15 , //지도의 레벨(확대, 축소 정도)
      maxLevel: 13
    };

    // 카카오지도의 객체를 map 변수에 저장
    var map = new window.kakao.maps.Map(mapContainer, mapOption);

    // 카카오지 지도 상에서 infoWindow (작은 창)을 띄우기 위한 위치 정보를 저장하는 배열입니다.
    var positions = [];
    

    //datas안에 캠핑장 수만큼 반복 후 cpaingData 변수안에 content:이름, latlng: 위치정보 객체를 담습니다.
    datas.map((data, index)=>{

      const campingData = {
        //infoWindow 안에 들어가는 캠핑장 목록과 위치정보를 저장합니다.
          content: "<div>"+data.facltNm+"<div>", 
          latlng: new kakao.maps.LatLng(data.mapY, data.mapX)
       }
      positions.push(campingData)

  });



for (var i = 0; i < positions.length; i ++) {

  // 마커를 생성합니다
  var marker = new kakao.maps.Marker({
      map: map, // 마커를 표시할 지도
      position: positions[i].latlng // 마커의 위치
  });

  // 마커에 표시할 인포윈도우를 생성합니다 
  var infowindow = new kakao.maps.InfoWindow({
      content: positions[i].content // 인포윈도우에 표시할 내용
  });



  // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
  // 이벤트 리스너로는 클로저를 만들어 등록합니다 
  // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
  kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
  kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
}  

// 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
function makeOverListener(map, marker, infowindow) {
  return function() {
      infowindow.open(map, marker);
  };
}

// 인포윈도우를 닫는 클로저를 만드는 함수입니다 
function makeOutListener(infowindow) {
  return function() {
      infowindow.close();
  };
}
      
    });
  };
  mapScript.addEventListener("load", onLoadKakaoMap);


  return <MapContainer id="map"></MapContainer>;

}
export default KaKaoMap;