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




export default function ListSection({datas, totalCnt, getCampingList}) {
  const classes = useStyles();
  const classesPage = useStylesPageButton();

  console.log(datas);
  return (
    <Fragment>
      <div className={classes.root}>
       {datas && 
        <CardSection 
          items={datas}
        >
        </CardSection>}
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