// eslint-disable-next-line react-hooks/exhaustive-deps
import React, { useState,useEffect } from 'react';
import { useLocation } from "react-router";
import { BallTriangle } from  'react-loader-spinner'; 
import data from '../data_stored.json';
import Navbar from "./Navbar";
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
    let middleIndex = Math.ceil(Object.keys(mydata).length / 2)-6;

    const firstHalf = Object.keys(mydata).splice(0, middleIndex);   
    const secondHalf = Object.keys(mydata).splice(middleIndex);
    middleIndex = Math.ceil(secondHalf.length / 2)+8;
    const sH1 = secondHalf.splice(0,middleIndex);
    const sH2 = secondHalf.splice(-middleIndex);

  return (
    // eslint-disable-next-line react-hooks/exhaustive-deps
    <>
    <Navbar/>
    {// eslint-disable-next-line react-hooks/exhaustive-deps
        <div className='w-full m-auto h-1/2  justify-evenly text-center '>
          <h1 className='text-[#1B1A17] drop-shadow-2xl font-bold text-4xl text-center'>{loc.substring(1)}</h1>
          <a href="../Project/index.html">View Crime rate</a>
          <div className='flex w-full flex-wrap text-[#1B1A17] justify-evenly'>
            <div className='w-1/3 hover:scale-110 ease-out duration-300'>
            <table class="table-auto">
            <tbody>
            {
              firstHalf.map((key)=>{
                return <tr className='text-[#1B1A17]'>
                  <td>{key}</td> 
                  <td>{mydata[key]}</td>
                </tr>
              })
            }
          </tbody>
          </table>
          </div>
          <div className='w-1/3  hover:scale-110 ease-out duration-300'>
            <table class="table-auto">
            <tbody>
            {
              sH1.map((key)=>{
                return <tr className='text-[#1B1A17] '>
                  <td>{key}</td> 
                  <td>{mydata[key]}</td>
                </tr>
              })
            }
          </tbody>
          </table>
          </div>

          <div className='w-1/3 hover:scale-110 ease-out duration-300'>
            <table class="table-auto">
            <tbody>
            {
              sH2.map((key)=>{
                return <tr className='text-[#1B1A17] '>
                  <td>{key}</td> 
                  <td>{mydata[key]}</td>
                </tr>
              })
            }
          </tbody>
          </table>
          </div>

          </div>
    </div>
    }
    </>
    
  )
}

export default Description