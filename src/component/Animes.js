import React, {useState,useEffect,useContext} from 'react';
import { BallTriangle } from  'react-loader-spinner';
import Pagination from './Pagination';
import { Link } from 'react-router-dom';
import data from '../data_stored.json';
import images from '../img_data.json';
import {AuthContext} from '../Context/AuthContext';
import Favorites from './Favorites';
import {database,storage} from '../firebase'
import { getDatabase, ref, child, get, set } from "firebase/database";
function Animes() {
    const [animes,setAnimes]=useState([]);
    const [page,setPage]=useState(1);
    const [hover,setHover]=useState('');
    const [favorites,setFavorites]=useState([]);
    const {user} = useContext(AuthContext);
    function next(){
        setPage(page+1);
    }
    function previous(){
        if(page===1)return;
        setPage(page-1);
    }
    useEffect(function(){
        let result = Object.keys(data).map((key) => [String(key), data[key]]);
        let filtered = result.filter((val)=>Object.keys(val[1]).length>0);
        setAnimes(filtered);
        const dbRef = ref(getDatabase());
        let userId = user.uid;
        get(child(dbRef, `users/${userId}/favorites`)).then((snapshot) => {
          if (snapshot.exists()) {
              if(snapshot.val().favorites)
              setFavorites(snapshot.val().favorites);
         } else {
             console.log("No data available");
         }
        }).catch((error) => {
             console.error(error);
       });
    },[page]);
    let add=(favPlace)=>{
        let newArray=[...favorites,favPlace];
        setFavorites([...newArray]);
        const db = getDatabase();
        let uid = user.uid;
        console.log(newArray);
        set(ref(db, 'users/' + uid+'/favorites'), {
            favorites: [...newArray]
          })
    }
    let remove=(remPlace)=>{
        let newArray = favorites.filter((place)=> place !== remPlace);
        setFavorites([...newArray]);
        const db = getDatabase();
        let uid = user.uid;
        set(ref(db, 'users/' + uid+'/favorites'), {
            favorites: [...newArray]
          })
    }
  return <>
  
  <div className='m-auto text-center w-4/5 justify-center'>
  <div className='mt-8 mb-8 font-bold text-2xl md:text-3xl text-center text-[#79B4B7]'>Top Places to Visit </div>
  {
      animes.length===0 ? <div className='flex justify-center'><BallTriangle heigth="100" width="100" color='grey' ariaLabel='loading'/></div>:
  
  <div className='flex flex-wrap text-center w-full justify-evenly'>
    {
        animes.map((movie)=>{
            
            return <div onMouseEnter={()=>setHover(movie[0])} onMouseLeave={()=>setHover('')} className={ ` my-8  h-[40vh] w-[350px] shadow-2xl rounded-sm  flex hover:scale-110 ease-out duration-300`}>
                {
                    hover===movie[0] && <>
                    {
                      favorites.length!=0 && favorites.find((m)=>m===movie[0]) ?
                       <div className='cursor-pointer absolute top-2 right-2 text-xl ' onClick={()=>remove(movie[0])}> ❌ </div>:
                       <div className='cursor-pointer absolute top-2 right-2 text-2xl font-bold' onClick={()=>add(movie[0])}>💚</div>
                    }  
                    </>
                }
                
                <Link to={{pathname: "/description", search: String(movie[0])}} style={{writingMode:"vertical-lr"}} className='rotate-180 text-center justify-center text-xl md:text-xl text-white bg-gradient-to-r from-[#090a0f] to-[#1b2735] p-2 pl-2 flex '>
                    {movie[0]}
                </Link>
                <div className={`bg-[url(${images[movie[0]][0]})] h-full bg-center bg-cover w-full`}>

                </div>
            </div>
        })
    }
    
    
      
  </div>
}
  
<Pagination page={page} previous={previous} next={next}/>
  </div>
    </>;
}

export default Animes;
