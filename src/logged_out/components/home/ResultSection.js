import React, { useCallback, useState, useEffect } from 'react';
import { Fragment } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import ListSection from './ListSection'
import { makeStyles } from '@material-ui/core/styles';
import KaKaoMap from './KakaoMap';

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

  const [datas, setDatas] = useState({});
  const [totalCnt, setTotalCnt] = useState(0);

  const getCampingList = useCallback(async (page) => {
    const data = {};
    data['pageNumber'] = page;
    data['visiblePages'] = 5;
    data['showingContentNum'] = 5;
    console.log(data);
    const res =await axios.post("http://localhost:3000/campingInfo/campInfoList",  data)
    // 지역 설정한 api로바꿔야 한다.

    console.log(res.data.data);
    setDatas(res.data.data);
  }, []);

  const getTotalCount = async () => {
    const res =await axios.post("http://localhost:3000/campingInfo/campSpotAllcount")
    
    console.log(res);
    setTotalCnt(res.data.data.totalRow);
  }

  useEffect(()=>{
    getTotalCount();
    getCampingList(1);
    
  },[getCampingList]);

  return (
   
    <Fragment>
      {datas && <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
         { console.log(datas)}
          <ListSection 
            datas={datas}
            totalCnt={totalCnt}
            getCampingList={getCampingList}
          />
          
          </Grid>
          
          <Grid item xs={6}>
            <KaKaoMap
              datas={datas}
            />
          </Grid>
      </Grid>
    </div>
    }
    </Fragment>

  );
}