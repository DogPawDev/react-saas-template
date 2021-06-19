import React from 'react';
import { Fragment } from 'react';
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

  return (
   
    <Fragment>
    
       <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
        <ListSection/>
        </Grid>
        <Grid item xs={6}>
        <KaKaoMap/>
        </Grid>
       
      </Grid>
    </div>
    </Fragment>

  );
}