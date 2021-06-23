/*global kakao*/
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';


const KaKaoMap=({datas})=>{
  console.log(datas);

  const [markers,setMarkers] = useState();

  const [infoWindow,setInfoWindow] = useState();
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
  useEffect(()=>{


    
    var container = document.getElementById('map');
    var options = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 15 , //지도의 레벨(확대, 축소 정도)
      maxLevel: 13
    };
    var map = new kakao.maps.Map(container, options);

    
    datas.map((list, idx)=>(
      setMarkers(new kakao.maps.Marker({
        map:map,
        position: new kakao.maps.LatLng(list.mapX,list.mapY)
      }))
    ));

    datas.map((list, idx)=>(
      setInfoWindow(new kakao.maps.InfoWindow({
        content: "<div>"+list.facltNm + "<div>"
      }))
    ));

  

    kakao.maps.event.addListener(markers, 'mouseover', makeOverListener(map, markers, infoWindow));
    kakao.maps.event.addListener(markers, 'mouseout', makeOutListener(infoWindow));
    

    }, [])

    return (
        <div >
        	<div id="map" style={{width:"100hv", height:"500px"}}></div> 
          
        </div>
    )
}

export default KaKaoMap;