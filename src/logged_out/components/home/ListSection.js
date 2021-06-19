import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

import Pagination from '@material-ui/lab/Pagination';

import axios from 'axios';
import { Fragment } from 'react';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const useStylesPage = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));




export default function SimpleList() {
  const classes = useStyles();
  const classesPage = useStylesPage();

  const [totalCnt, setTotalCnt] =useState(0);


  useEffect(()=>{
    test();
    
  },[]);

  const getCampingList = useCallback(async (page) => {
    const datas = {};
    datas['pageNumber'] = page;
    datas['visiblePages'] = 5;
    datas['showingContentNum'] = 5;
    console.log(datas);
    const res =await axios.post("http://localhost:3000/campingInfo/campInfoList",  datas)
    console.log(res);
  }, []);

  const test = async () => {
    const res =await axios.post("http://localhost:3000/campingInfo/campSpotAllcount")
    console.log(res);
    setTotalCnt(res.data.data.totalRow);
  }

  return (
    <Fragment>
      <div className={classes.root}>
        <List component="nav" aria-label="main mailbox folders">
          <ListItem button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItem>
        </List>
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