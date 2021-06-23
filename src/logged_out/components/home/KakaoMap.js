/*global kakao*/
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import styled from "styled-components";
import { List } from '@material-ui/core';

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;


const KaKaoMap=({datas = []})=>{
  console.log(datas);

  
  // const [markers,setMarkers] = useState();

  // const [infoWindow,setInfoWindow] = useState();
  // 인포윈도우를 표시하는 클로저를 만드는 함수입니다 



//   useEffect(()=>{


    
//     var container = document.getElementById('map');
//     var options = {
//       center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
//       level: 15 , //지도의 레벨(확대, 축소 정도)
//       maxLevel: 13
//     };
//     var map = new kakao.maps.Map(container, options);

    
//     datas.map((list, idx)=>(
//       setMarkers(new kakao.maps.Marker({
//         map:map,
//         position: new kakao.maps.LatLng(list.mapX,list.mapY)
//       }))
//     ));

//     datas.map((list, idx)=>(
//       setInfoWindow(new kakao.maps.InfoWindow({
//         content: list.facltNm
//       }))
//     ));

  

//     kakao.maps.event.addListener(markers, 'mouseover', makeOverListener(map, markers, infoWindow));
//     kakao.maps.event.addListener(markers, 'mouseout', makeOutListener(infoWindow));
    

//     }, [])

//     return (
//         <div >
//         	<div id="map" style={{width:"100hv", height:"500px"}}></div> 
          
//         </div>
//     )
// }

const mapScript = document.createElement("script");

  mapScript.async = true;
  mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=189d436aa8c877e447c0b9c8c52b9f2e&autoload=false`;

  document.head.appendChild(mapScript);

  const onLoadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(37.365264512305174, 127.10676860117488), // 지도의 중심좌표
        
        level: 15 , //지도의 레벨(확대, 축소 정도)
        maxLevel: 13
      };
      var map =new window.kakao.maps.Map(mapContainer, mapOption);

      var positions = [];
      
      datas.map((data, index)=>{
        const campingData = {
          content: "<div>"+data.facltNm+"<div>", 
          latlng: new kakao.maps.LatLng(data.mapY, data.mapX)
      }
        positions.push(campingData)
    })



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
  console.log(infowindow);
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