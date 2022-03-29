// eslint-disable-next-line react-hooks/exhaustive-deps
import React, { useState,useEffect } from 'react';
import { useLocation } from "react-router";
import { BallTriangle } from  'react-loader-spinner'; 
import data from '../data_stored.json';

function Description() {
  const [isLoading, setIsLoading] = useState(false);
  const [mydata,setMydata]= useState({});
  const location = useLocation();
  const [loc,setLoc]=useState(location.search);
    useEffect(function(){
      let idx = loc.substring(1);
      idx=idx.concat(" ");
      const result=data[String(idx)];
      setMydata(result);
    },[loc]);
// eslint-disable-next-line react-hooks/exhaustive-deps
  return (
    // eslint-disable-next-line react-hooks/exhaustive-deps
    <>
    {// eslint-disable-next-line react-hooks/exhaustive-deps
        <div className='w-3/4 h-1/2 m-auto  justify-center '>
          <h1 className='text-[#1B1A17] drop-shadow-2xl font-bold text-4xl text-center'>{loc}</h1>
          <div className='text-[#1B1A17] drop-shadow-2xl font-bold text-4xl'>
          {
            Object.keys(mydata).map((key)=>{
              return <h1 className='text-[#1B1A17] drop-shadow-2xl font-bold text-4xl text-center'>{key} : {mydata[key]}</h1>
            })
          }
          </div>
    </div>
    }
    </>
    
  )
}

export default Description