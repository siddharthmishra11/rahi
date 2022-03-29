import React from 'react';
import Logo from '../Assets/RAAHIE.svg'
import { Link } from 'react-router-dom';
function Navbar() {
  return <>
    <div className='flex items-center z-10'>
        <img src={Logo} className='w-1/3' alt='Logo'></img>
            <div className='w-1/3'></div>
            <div className='flex w-1/3 space-x-8 mr-10 justify-end'>
                <Link to='/' className='text-[#1B1A17] drop-shadow-2xl font-bold text-4xl'>Home</Link> 
                <Link to='/favorites' className='text-[#1B1A17] drop-shadow-2xl font-bold text-4xl'>Favourites</Link>
            </div>
    </div>
    </>;
}

export default Navbar;