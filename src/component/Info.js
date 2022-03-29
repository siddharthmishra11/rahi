import React from 'react';

function Info() {
  return (
    <>
    <div className='w-1/3 m-4 justify-center text-center items-center'>
    <div className='hover:scale-110 ease-out duration-300  w-[350px] m-auto h-[300px] p-2 my-8 justify-center text-center items-center bg-gradient-to-r from-purple-500 to-pink-500'>
        <div className='mt-8 m-auto font-bold text-3xl'>Go Premium</div>
        <p className='text-xl'> * Ad Free</p>
        <p className='text-xl'> * Exclusive Content</p>
        <p className='text-xl'> * Giveways</p>
        <button className='mt-2 w-2/3 h-1/3 p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md text-3xl'> $44 / mo </button>
      </div>
      <div className='hover:scale-110 ease-out duration-300 w-[350px] m-auto h-[140px] rounded-md p-4 my-8 justify-center text-center items-center bg-gradient-to-r from-purple-500 to-pink-500'>
        <div className='mt-8 m-auto font-bold text-3xl'>Women's Helpline 📞 </div>
      </div>
      <div className='border-2 hover:scale-110 ease-out duration-300 w-[350px] m-auto h-1/2 rounded-md p-2 my-8 justify-center text-center items-center '>
        <div className='mt-8 m-auto font-bold text-3xl'> News </div>
      </div>
    </div>
    
      
    </>
    
  )
}

export default Info