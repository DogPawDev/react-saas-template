/*global kakao*/
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';


const KaKaoMap=()=>{
  useEffect(()=>{
    var container = document.getElementById('map');
    var options = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 15 , //지도의 레벨(확대, 축소 정도)
      maxLevel: 13
    };


    var markers = [];
    
    var ps;

    
    var imageSize = new kakao.maps.Size(35, 35); 
    var imageSrc = "/static/img/map/marker/map_marker_red_64.png";
    var myPositionImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 

    var map = new kakao.maps.Map(container, options);

  // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({zIndex:1});





//marker img
var imageSize = new kakao.maps.Size(35, 35); 
var imageSrc = "/static/img/map/marker/map_marker_red_64.png";
var myPositionImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 





    }, [])



    return (
        <div >
        	<div id="map" style={{width:"100hv", height:"400px"}}></div> 
        
        </div>
    )
}

export default KaKaoMap;