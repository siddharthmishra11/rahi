import React,{useState,useContext} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button,CardActionArea } from '@mui/material';
import "./ResetPw.css"
import lock from "../Assets/lock.png";
import TextField from '@mui/material/TextField';
import {Link,useNavigate} from "react-router-dom"
import {AuthContext} from "../Context/AuthContext"
import Alert from '@mui/material/Alert';

export default function ResetPw() {
    const [email,setEmail] = useState("");
    const [err,setErr] = useState("");
    const [loading,setLoading] = useState(false);
    const {resetEmail} = useContext(AuthContext);
    const navigate = useNavigate();
    const handleClick = async()=>{
      try{
        setErr('');
        setLoading(true);
        let userObj = await resetEmail(email);
        setLoading(false);
        navigate("/login");
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
      
      <Card sx={{ maxWidth: 345}} className = "main-card">
          <CardMedia
            component="img"
            height="120"
            image={lock}
            alt="lock"
          />

          <CardContent className = "card" id = "over">
            <Typography gutterBottom variant="h6" component="div" align="center">
              Trouble Logging In
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
            Enter your email and we'll send you a link to get back into your account.
            </Typography>
            <div className = "email-wrapper">
            <TextField id="outlined-basic" label="Email" variant="outlined" size="small" fullWidth = {true} value = {email} onChange = {(e)=>setEmail(e.target.value)}/>
            </div>
            <div className = "email-wrapper">
                <Button variant="contained" className = "btn" fullWidth = {true} onClick = {handleClick} disabled = {loading}>Send Login Link</Button>
            </div>
            <div className = "Or">
                <hr/>
                <p className = "mid">or</p>
                <hr/>
            </div>
            <Typography gutterBottom variant="subtitle1" component="div" align="center">
            <Link to = "/signup" style = {{textDecoration: "none",color: "#484848",fontWeight: "550"}}>Create a New Account</Link> 
            {err!=='' && <Alert severity="error" sx = {{width: "17vw"}}>{err}</Alert>}
            </Typography>
            <Card variant = "outlined" sx={{ width: 345,backgroundColor: " #d9d9d9",height: 40,marginTop: "10vh"}}>
              <CardActionArea sx = {{height: 40}}>
                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom align="center">
                <Link to = "/login" style = {{textDecoration: "none",color: "#484848",fontWeight: "550"}}>Back To Login</Link>
                </Typography>
              </CardActionArea>
            </Card>
          </CardContent>
      </Card>
    );
  }
