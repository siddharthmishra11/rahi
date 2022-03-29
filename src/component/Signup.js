import * as React from 'react';
import {useState,useContext} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import "./Signup.css"
import insta from "../Assets/Instagram.jpeg"
import {makeStyles} from '@material-ui/core/styles';
import { grey } from '@mui/material/colors';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import {Link,useNavigate} from "react-router-dom"
import {AuthContext} from '../Context/AuthContext'
import { getDatabase, ref, set } from "firebase/database";
export default function Signup() {
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
    const [name,setName] = useState('');
    const [err,setErr] = useState('');
    const [loading,setLoading] = useState(false);
    const history = useNavigate();
    const store = useContext(AuthContext);
    const {signUp} = useContext(AuthContext);
    const handleClick = async()=>{
      try{
        setErr('');
        setLoading(true);
        let userObj = await signUp(email,pw);
        let uid = userObj.user.uid;
        const db = getDatabase();
        set(ref(db, 'users/' + uid), {
          name: name,
          email: email,
          password : pw,
          favorites: []
        });
          history("/");
          setLoading(false);
           
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
    <div className = "signUpWrapper">
    <div className = "signUpCard">
    <Card variant="outlined">
        <div className = "instaLogo">
            <img src = {insta} alt = "Instagram">
            </img>
        </div>
  
      <CardContent>
        <Typography className = {classes.text1} variant="subtitle1">
          Sign Up to see photos and videos from your friends
        </Typography>
        {err!=='' && <Alert severity="error">{err}</Alert>}
        <TextField id="outlined-basic" label="Email" variant="outlined" autoComplete = "on" fullWidth = {true} margin = "dense" size="small" value = {email} onChange = {(e)=>setEmail(e.target.value)}/>
        <TextField id="outlined-basic" label="Password" variant="outlined" autoComplete = "on" fullWidth = {true} margin = "dense" size="small" value = {pw} onChange = {(e)=>setPw(e.target.value)}/>
        <TextField id="outlined-basic" label="Full Name" variant="outlined" autoComplete = "on" fullWidth = {true} margin = "dense" size="small" value = {name} onChange = {(e)=>setName(e.target.value)}/>
      </CardContent>
    <CardActions>
      <Button size="small" color="primary" variant="contained" fullWidth = {true} onClick = {handleClick} disabled = {loading} onClick = {handleClick}>
        Sign Up
      </Button>
    </CardActions>
    <CardContent>
        <Typography className = {classes.text1} variant="subtitle1">
          By Signing Up, you agree to our Terms,Conditions & Cookies Policy
        </Typography>
    </CardContent>
  </Card>
  <Card variant="outlined" className = {classes.card2}>
    <CardContent>
        <Typography className = {classes.text1} variant="subtitle1">
           Having an Account? <Link to = "/login"  style = {{textDecoration: "none"}}>Login</Link>
        </Typography>
    </CardContent>
    </Card>
  </div>
    </div>
  );
}
