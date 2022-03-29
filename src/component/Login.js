import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {useContext,useState} from 'react'
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import "./Login.css"
import insta from "../Assets/Instagram.jpeg"
import Instagram from "../Assets/insta.png"
import img0 from "../Assets/img0.jpeg"
import img1 from "../Assets/img1.jpeg"
import img2 from "../Assets/img2.jpeg"
import img3  from "../Assets/img3.jpeg"
import {makeStyles} from '@material-ui/core/styles';
import { grey } from '@mui/material/colors';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import {Link,useNavigate} from "react-router-dom"
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import {AuthContext} from '../Context/AuthContext'
export default function Login() {
    const store = useContext(AuthContext);
    const useStyles = makeStyles({
        text1:{
            color: "grey",
            textAlign: "center",
        },
        card2:{
            height: "7vh",
            marginTop: "2%"
        }
    })
    const classes = useStyles();
    const [email,setEmail] = useState('');
    const [pw,setPw] = useState('');
    const [err,setErr] = useState('');
    const [loading,setLoading] = useState(false);
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();
    const handleClick = async()=>{
      try{
        setErr('');
        setLoading(true);
        let userObj = await login(email,pw);
        setLoading(false);
        navigate("/");
      }
      catch(err){
        setErr(err);
        setTimeout(()=>{
          setErr('');
        },2000);
        setLoading(false);
      }
    }
  return (
      
    <div className = "loginWrapper">
    <div className = "imgCar" style = {{backgroundImage: "url("+Instagram+")",backgroundSize: "cover"}}>
       <div className = "car">
       <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={180}
        totalSlides={4}
        isPlaying = {true}
        hasMasterSpinner = {true}
        infinite = {true}
        touchEnabled = {false}
        dragEnabled = {false}
      >
        <Slider>
          <Slide index={0}><Image src = {img0}></Image></Slide>
          <Slide index={1}><Image src = {img1}></Image></Slide>
          <Slide index={2}><Image src = {img2}></Image></Slide>
          <Slide index={3}><Image src = {img3}></Image></Slide>
        </Slider>
      </CarouselProvider>
        </div>
    
  </div>
  <div className = "loginWrapper">
     <div className = "loginCard">
     <Card variant="outlined">
         <div className = "instaLogo">
             <img src = {insta} alt = "Instagram">
             </img>
         </div>
   
       <CardContent>
         {err!=='' && <Alert severity="error">{err}</Alert>}
         <TextField id="outlined-basic" label="Email" variant="outlined" autoComplete = "on" fullWidth = {true} margin = "dense" size="small" onChange = {(e)=>setEmail(e.target.value)}/>
         <TextField id="outlined-basic" label="Password" variant="outlined" autoComplete = "on" fullWidth = {true} margin = "dense" size="small" onChange = {(e)=>setPw(e.target.value)}/>
         <Typography className = {classes.text1} variant="subtitle1">
             <Link to = "/reset/password" style = {{textDecoration: "none"}}>Forget Password?</Link>
        </Typography>
     </CardContent>
     <CardActions>
       <Button size="small" color="primary" variant="contained" fullWidth = {true} onClick = {handleClick} disabled = {loading}>
         Log In
       </Button>
     </CardActions>
   </Card>
   <Card variant="outlined" className = {classes.card2}>
     <CardContent>
         <Typography className = {classes.text1} variant="subtitle1">
            Don't have an Account? <Link to = "/signup"  style = {{textDecoration: "none"}}>Sign Up</Link>
         </Typography>
     </CardContent>
     </Card>
   </div>
     </div>
     </div>
  );
}