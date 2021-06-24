import React, { useState,Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  Typography,
  Card,
  Button,
  Box,
  withStyles,
  withWidth,
} from "@material-ui/core";
import WaveBorder from "../../../shared/components/WaveBorder";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// 검색 버튼 컴포넌트


// 컴포넌트 CSS
const styles = (theme) => ({
  extraLargeButtonLabel: {
    fontSize: theme.typography.body1.fontSize,
    [theme.breakpoints.up("sm")]: {
      fontSize: theme.typography.h6.fontSize,
    },
  },
  formControl:{
    margin: theme.spacing(1),
    minWidth: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  extraLargeButton: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    [theme.breakpoints.up("xs")]: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    [theme.breakpoints.up("lg")]: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
  },
  card: {
    boxShadow: theme.shadows[4],
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("xs")]: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(5.5),
      paddingBottom: theme.spacing(5.5),
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
    },
    [theme.breakpoints.up("lg")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
    [theme.breakpoints.down("lg")]: {
      width: "auto",
    },
  },
  wrapper: {
    position: "relative",
    backgroundColor: theme.palette.secondary.main,
    paddingBottom: theme.spacing(2),
  },

  container: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(12),
    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(9),
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(6),
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(3),
    },
  },
  containerFix: {
    [theme.breakpoints.up("md")]: {
      maxWidth: "none !important",
    },
  },
  button: {
    margin: theme.spacing(1),
  },
  waveBorder: {
    paddingTop: theme.spacing(1),
  },
});

function HeadSection(props) {
  const { classes, theme, handleOnClick ,isFlag} = props;

  const [dodo, setDo] = useState('');
  const [sisi, setSi] = useState('');

  const [isSelect,setIsSelect] = useState(false);


  // 선택된 지역을 변수에 저장합니다.
  const handleChangeDodo = (event) => {
    setIsSelect(true);
    setDo(event.target.value);
  };
  const handleChangeSisi = (event) => {
    setSi(event.target.value);
  };

//드롭다운 버튼에 들어가는 데이터 입니다. 
  const City=[
    {name:"서울시",
            list:["강남구","강동구","강북구","강서구","관악구",
              "광진구","구로구","금천구","노원구","도봉구","동대문구","동작구","마포구","서대문구","서초구","성동구","성북구","송파구","양천구",
              "영등포구","용산구","은평구","종로구","중구","중랑구"
                ]
      },
    { name:"부산시",
            list:["강서구","금정구","기장군","남구","동구","동래구","부산진구","북구","사상구","사하구","서구","수영구","연제구","영도구","중구","해운대구"]
          },
    { name:"대구시",
            list:["남구","달서구","달성군","동구","북구","상주","서구","수성구","중구"]
          },
    { name:"인천시",
            list:["강화군","계양구","남구","남동구","동구","부평구","서구","연수구","웅진군","중구"]
          },
    { name:"광주시",
            list:["광산구","남구","동구","북구","서구"]
          },
    { name:"대전시",
            list:["대덕구","동구","서구","유성구","중구"]
          }, 
    { name:"울산시",
            list:["남구","동구","북구","울주군","중구"]
          },
    { name:"세종시",
            list:["금남면","세종시","소정면","연서면","전동면"]
          },
    { name:"경기도",
            list:['가평군',"고양시","과천시","광명시","광주시","구리시","군포시","김포시","남양주시","동두천시","부천시","성남시","수원시","시흥시","안산시","안성시","안양시","양주시","양평군","여주시","연천군","오산시","용인시","의왕시","의정부시","이천시","파주시","평택시","포천시","하남시","화성시"]
          },
    { name:"강원도",
            list:["강릉시","고성군","동해시","삼척시","속초시","양구군","양양군","영월군","원주시","인제군","정선군","철원군","춘천시","태백시","평창군","홍천군","화천군","횡성군"]
          },
    { name:"충청북도",
            list:["괴산군","단양군","보은군","영동군","옥천군","음성군","제천시","증평군","진천군","청원군","청주시","충주시"]
          },
    { name:"충청남도",
            list:["계룡시","공주시","금산군","논산시","당진시","보령시","부여군","서산시","서천군","아산시","예산군","천안시","청양군","태안군","홍성군"]
          },
    { name:"전라북도",
            list:["고창군","군산시","김제시","남원시","무주군","부안군","순창군","완주군","익산시","임실군","장수군","전주시","정읍시","진안군"]
          },
    { name:"전라남도",
            list:["강진군","고흥군","곡성군","광양시","구례군","나주시","담양군","목포시","무안군","보성군","순천시","신안군","여수시","영광군","영암군","완도군","장성군","장흥군","진도군","함평군","해남군","화순군"]
          }, 
    { name:"경상북도",
            list:["경산시","경주시","고열군","구미시","군위군","김천시","문경시","봉화군","상주시","성주군","안동시","영덕군","영양군","영주시","영천시","예천군","울릉군","울진군","의성군","청도군","청송군","칠곡군","포항시"]
          },
    { name:"경상남도",
            list:["거제시","거창군","고성군","김해시","남해군","밀양시","사천시","산청군","양산시","의령군","진주시","창녕군","통영시","하동군","함안군","함양군","합천군"]
          },    
    { name:"제주도",
            list:['제주시',"서귀포시"]
          }         
  ];



  //도/시가 선택될 경우 선택된 도시에 속한 시/동/군을 불러오기위한 임시 변수
  const CityTemp = City.filter((data, index) => {
    return data.name === dodo
  });

  
  return (
    <Fragment>
      <div className={classNames("lg-p-top", classes.wrapper)}>
        <div className={classNames("container-fluid", classes.container)}>
        
          <Box display="flex" justifyContent="center" className="row">
            <Card
              className={classes.card}
              data-aos-delay="200"
              data-aos="zoom-in"
            >
              <div className={classNames(classes.containerFix, "container")}>
                <Box justifyContent="space-between" className="row">
                        
                    <Typography variant="h5" align="center">
                      캠핑 지역 선택
                    </Typography>

                  {/* 드롭다운 -  시/도 */}
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">도/시</InputLabel>

                    {/* MenuItem 컴포넌에서 선택된 값이 dodo에 저장 됩니다. */}
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={dodo}
                      onChange={handleChangeDodo}
                    >
                      {City.map( (data, idx)=> (
                        <MenuItem value={data.name}>{data.name}</MenuItem>
                      ))}
    
                    </Select>
                  </FormControl>


                  {/* 드롭다운 - 시/군/구 */}
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">시/군/구</InputLabel>
                      {/* 시/도가 선택되면 해당 컴포넌트가 생성됩니다. */}
                      { isSelect && <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={sisi}
                          onChange={handleChangeSisi}
                        >

                        {
                          CityTemp[0].list.map( (data, idx)=> (
                          <MenuItem value={data}>{data}</MenuItem>
                        ))
                        }
                    </Select>}
                  </FormControl>


                  <Button
                      variant="contained"
                      color="secondary"
                      className={classes.button} onClick={() => {
                        handleOnClick(dodo, sisi);  
                      }}
                      >탐색
                  </Button>
        
                  {
                      isFlag === false &&<Typography variant="h5">
                      해당 지역 근처에 캠핑장이 없습니다
                    </Typography>
                  }     
                </Box>  
              </div>
            </Card>
          </Box>
        </div>
      </div>

      {/* 물결 애니메이션 */}
      <WaveBorder
        upperColor={theme.palette.secondary.main}
        lowerColor="#FFFFFF"
        className={classes.waveBorder}
        animationNegativeDelay={2}
      />

    </Fragment>
  );
}

export default withWidth()(
  withStyles(styles, { withTheme: true })(HeadSection)
);
