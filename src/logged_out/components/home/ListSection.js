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


// 캠핑장을  담당하는  컴포넌트입니다.


export default function ListSection({datas, totalCnt, getCampingList}) {
  const classes = useStyles();
  const classesPage = useStylesPageButton();


  return (
    <Fragment>

      {/* 캠핑장 목록 */}
      <div className={classes.root}>
        {datas && <CardSection items={datas}>
        </CardSection>}
      </div>

      {/* 페이지 버튼 */}
      <div className={classesPage.root}>
        <Grid container >
            <Grid item xs={6}>
                  <Pagination count={totalCnt} color="primary" onChange={(obj, page) => {
                    // 선택된 페이지 버튼 (number) 을 콜백함수로 넘겨줍니다.
                    getCampingList(page);
                  }}/>
              </Grid>
                  <Grid item xs={6}>
                    {/* 값을 초기화 하는 버튼입니다. */}
                    <Button
                      variant="contained"
                      color="inherit"
                      className={classes.button} onClick={() => {
                        window.location.reload()}}
                      >
                        초기화
                    </Button>
              </Grid>
        </Grid>
      </div>
    </Fragment>
  );
}