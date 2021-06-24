import React, { useCallback, useState, useEffect } from 'react';
import { Fragment } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import ListSection from './ListSection'
import { makeStyles } from '@material-ui/core/styles';
import KaKaoMap from './KakaoMap';
import HeadSection from "./HeadSection";





// 캠핑장 목록을 담당하는 컴포넌트입니다.

// 컴포넌트 CSS
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


export default function ResultSection() {
  const classes = useStyles();

  const [datas, setDatas] = useState();


  const [totalCnt, setTotalCnt] = useState(0);
  const [CityString, setCityString] = useState(''); 

  const [DosiString, setDosiString] = useState('');
  
  const [isFlag,setFlag] = useState(true);



  // 캠핑장 목록을 조회하기위한 함수 입니다.
  const getCampingList = useCallback(async (page, dodo, sisi) => {

    //데이터 조회 요청을 만들기 위한 임시 객체
    const data = {};

    //페이징 관련 키값
    data['pageNumber'] = page;
    data['visiblePages'] = 6;
    data['showingContentNum'] = 6;
    
    // 지역 범위를 토대로 조회하기 위한 값
    data['doNm'] = dodo ? dodo : CityString;
    data['sigunguNm'] = sisi ? sisi : DosiString;
    
    //API 서버에 요청을 보냅니다.
    const res =await axios.post("http://localhost:3000/campingInfo/campInfoList",  data)
  
    // 얻어온 값을 Datas에 저장합니다.
    setDatas(res.data.data);
    
  }, [CityString, DosiString]);

  // 페이지 버튼 생성에 필요한 캠핑장 수를 조회하는 함수 입니다.
  const getTotalCount = async (dodo,sisi) => {
    
    // 데이터 조회를 위한 요청을 만들 임시 객체
    const data={};


    //조회에 필요한 값 설정 
    data['doNm'] = dodo ? dodo : CityString;
    data['sigunguNm'] = sisi ? sisi : DosiString;
    
    
    //서버에 조회합니다
    const res =await axios.post("http://localhost:3000/campingInfo/campSpotAllcount", data)
    
    //값이 1 이상이여야 캠핑 리스트 컴포넌트를 그리기 위한 Flag 변수 설정
    if(res.data.data.totalRow >= 1 ){
      setFlag(true);
    }else{
      setFlag(false);
    }
    // 캠핑장 개수를 저장합니다.
    setTotalCnt(res.data.data.totalRow);
  }


  // HeadSection 컴포넌트에서 값을 받아오기 위한 콜백함수 입니다.
  // 해당 컴포넌트에서 지역이 선택되면 해당 함수를 호출해 ResultSection 컴포넌트에 state 값을 저장합니다.
  const handleOnClick = useCallback((dodo,sisi)=> {
    getCampingList(1, dodo, sisi); 
    setDosiString(sisi);
    setCityString(dodo);
    getTotalCount(dodo,sisi);
   
   },[getCampingList, getTotalCount])
 
  return (
   
    <Fragment>
      
      {/* 지역 선택 컴포넌트 */}
      <HeadSection handleOnClick={handleOnClick} isFlag={isFlag}  />

      
      {/* 캠핑장 리스트 컴포넌트 */}
      {/* 지역이 선택되거나 지역이 없는 경우는 목록이 표시되지 않습니다. */}
      {DosiString  && totalCnt !== 0 && <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            {/* 캠핑장 목록을 그리기위해 필요한 데이터를 넘겨줍니다. */}
            <ListSection 
              datas={datas}
              totalCnt={Math.round(totalCnt/6)}
              getCampingList={getCampingList}
            />
          </Grid>
          
          {/* 카카오맵 컴포넌트 */}
          {DosiString && <Grid item xs={6}>
            {/* 카카오맵에 마커를 찍기위해 필요한 위치정보를 넘겨줍니다. */}
            <KaKaoMap
              datas={datas}
            />
          </Grid>}
        </Grid>
      </div>
      }
    </Fragment>

  );
}