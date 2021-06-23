import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
//card
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import SvgIcon from '@material-ui/core/SvgIcon';
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
//firstImageUrl, induty,manageSttus,operPdCl,operDeCl,animalCmgCl,addr1
const classes2= useStyleChip();

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}


console.log(items);
  //console.log(Object.values(items.items));
  
  
  
  return (
    <Grid container spacing={2}>
      {
    items.map((list,idx)=>(
      <Grid item xs={4}>
      <Card className={classes.root}>
      <CardActionArea>
      
     
        <CardMedia
        className={classes.media}
        image={list.firstImageUrl}
        title={list.facltNm}
        >
        </CardMedia>

      
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
    </Grid>

    
    ))
}
    </Grid>



    
  );
}