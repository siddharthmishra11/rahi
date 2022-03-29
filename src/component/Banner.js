import React from 'react';
import myvideo from '../Assets/video.mp4';
import Navbar from "./Navbar";
function Banner() {
  return <>
    <Navbar/>
    <div className={`flex shadow-2xl w-full h-[40vh] items-center `}>
    
      <div className='w-full z-[-1]'>
        <video className='videoTag mb-0' width="100%" loop autoPlay muted>
          <source src={myvideo} type="video/mp4"/>
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  </>;
}

export default Banner;