import React, { useCallback, useState, useEffect } from 'react';
import { Fragment } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import ListSection from './ListSection'
import { makeStyles } from '@material-ui/core/styles';
import KaKaoMap from './KakaoMap';
import HeadSection from "./HeadSection";

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


  const getCampingList = useCallback(async (page, dodo, sisi) => {
    const data = {};
    data['pageNumber'] = page;
    data['visiblePages'] = 6;
    data['showingContentNum'] = 6;
    data['doNm'] = dodo ? dodo : CityString;
    data['sigunguNm'] = sisi ? sisi : DosiString;
    
    console.log(data);
    const res =await axios.post("http://localhost:3000/campingInfo/campInfoList",  data)
    // 지역 설정한 api로바꿔야 한다.

    console.log(Array.isArray(res.data.data) && res.data.data !== 0);
    setDatas(res.data.data);
    
  }, [CityString, DosiString]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getTotalCount = async (dodo,sisi) => {
    const data={};
    data['doNm'] = dodo ? dodo : CityString;
    data['sigunguNm'] = sisi ? sisi : DosiString;
    console.log(data);
    const res =await axios.post("http://localhost:3000/campingInfo/campSpotAllcount", data)
    if(res.data.data.totalRow >= 1 ){
      setFlag(true);
    }else{
      setFlag(false);
    }
    console.log(res);
    setTotalCnt(res.data.data.totalRow);
  }

  const handleOnClick = useCallback((dodo,sisi)=> {
    getCampingList(1, dodo, sisi); 


    console.log(dodo,sisi);
    setDosiString(sisi);
    setCityString(dodo);
    getTotalCount(dodo,sisi);
   
   },[getCampingList, getTotalCount])
 
  return (
   
    <Fragment>
      
      <HeadSection handleOnClick={handleOnClick} isFlag={isFlag}  />

      
      {DosiString  && totalCnt !== 0 && <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
          <ListSection 
            datas={datas}
            totalCnt={Math.round(totalCnt/6)}
            getCampingList={getCampingList}
          />
          
          </Grid>
          
          {DosiString && <Grid item xs={6}>
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