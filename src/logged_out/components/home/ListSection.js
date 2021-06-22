import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';


import CardSection from './CardSection';

import Pagination from '@material-ui/lab/Pagination';

import axios from 'axios';
import { Fragment } from 'react';


//캠핑 리스트 목록 컴포넌트
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));
// 리스트 스타일 

const useStylesPageButton = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
    
  },
}));




export default function ListSection() {
  const classes = useStyles();
  const classesPage = useStylesPageButton();

  const [totalCnt, setTotalCnt] =useState(0);

  const [datas,setDatas] = useState();
  
  const getCampingList = useCallback(async (page) => {
    const datas = {};
    datas['pageNumber'] = page;
    datas['visiblePages'] = 5;
    datas['showingContentNum'] = 5;
    console.log(datas);
    const res =await axios.post("http://localhost:3000/campingInfo/campInfoList",  datas)
    // 지역 설정한 api로바꿔야 한다.

    console.log(res.data.data);
  
   
    setDatas(res.data.data);
    
  }, []);
  
  useEffect(()=>{
    getTotalCount();
    getCampingList(1);
    
  },[getCampingList]);

  


  const getTotalCount = async () => {
    const res =await axios.post("http://localhost:3000/campingInfo/campSpotAllcount")
    
    console.log(res);
    setTotalCnt(res.data.data.totalRow);
  }

  return (
    <Fragment>
      <div className={classes.root}>
       {datas && <CardSection items={datas} ></CardSection>}
      </div>

      <div className={classesPage.root}>
      <Pagination count={totalCnt} color="primary" onChange={
        (obj, page) => {
          getCampingList(page);
        }
      } />
      </div>
    </Fragment>
   


  );
}