/*global kakao*/
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';


const KaKaoMap=({datas})=>{
  //console.log(datas);

  const [markers,setMarkers] = useState();

  useEffect(()=>{


    
    var container = document.getElementById('map');
    var options = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 15 , //지도의 레벨(확대, 축소 정도)
      maxLevel: 13
    };
    var map = new kakao.maps.Map(container, options);

    }, [])

    return (
        <div >
        	<div id="map" style={{width:"100hv", height:"400px"}}></div> 
        
        </div>
    )
}

export default KaKaoMap;