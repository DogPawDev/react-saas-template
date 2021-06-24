import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import SvgIcon from '@material-ui/core/SvgIcon';

// CSS
const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
  },
  media: {
    height: 140,
  },
  paper: {
    textAlign: 'center',
  },
});


// 캠핑 정보를 보여주는 리스트의 태그 CSS
const useStyleChip = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    '& > *': {
      margin: 2,
    },
  },
});

export default function CardSection({items}) {
  const classes = useStyles();
  const classes2= useStyleChip();

  
//주소 아이콘 뱃지 컴포넌트 생성
function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}



  return (
    <Grid container spacing={2}>
      {/* 캠핑장 데이터를 토대로 렌더링합니다. items : 캠핑장 목록 및 정보*/}
      {items.map((list,idx)=>(  
        <Grid item xs={4} data-aos="zoom-in-up">
          <Card className={classes.root}>
              <CardActionArea>     
                <CardMedia
                  className={classes.media}
                  image={list.firstImageUrl}
                  title={list.facltNm}
                />
  
                <CardContent>

                  <Typography gutterBottom variant="h5" component="h2">
                    {list.facltNm}
                  </Typography>

                  <div className={classes2.root} >
                    <Chip label={"테마 : "+list.induty} />
                    <Chip label={"운영 상태 : "+list.manageSttus} />
                    <Chip label={"운영시즌 : "+list.operPdCl} />
                    <Chip label={"운영 주 : "+list.operDeCl} />
                    <Chip label={"반려동물 : "+list.animalCmgCl} />
                    <Chip  icon={<HomeIcon />}
                    label={"주소 : "+ list.addr1} />
                  </div>
            
                </CardContent>

              </CardActionArea>
          </Card>
       </Grid>))
       }
    </Grid>
  );
}