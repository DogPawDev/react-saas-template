import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardSection from './CardSection';
import Pagination from '@material-ui/lab/Pagination';
import { Fragment } from 'react';
import { Button ,Grid} from '@material-ui/core';

//컴포넌트 CSS
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
    position: "relative",
  },
}));

// 페이징 버튼 CSS
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
        <Grid container >
          <Grid item xs={6}>
          <Pagination count={totalCnt} color="primary" onChange={
          (obj, page) => {
            getCampingList(page);
          }
        } />
          </Grid>
          <Grid item xs={6}>
          <Button
        variant="contained"
        color="inherit"
        className={classes.button} onClick={() => {
          window.location.reload()
        }}
      >초기화
      </Button>
          </Grid>
        </Grid>
       
        
      </div>

      
    </Fragment>
   


  );
}