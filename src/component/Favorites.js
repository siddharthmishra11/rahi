import React,{useState,useEffect,useContext} from 'react';
import Pagination from './Pagination';
import data from '../data_stored.json';
import Navbar from "./Navbar";
import {AuthContext} from '../Context/AuthContext';
import { getDatabase, ref, child, get, set } from "firebase/database";
function Favorites() {
  const [favorites,setFavorites]=useState([]);
  const [page,setPage]=useState(1);
  const {user} = useContext(AuthContext);
  const [rating,setRating]=useState(0);
  const [popularity,setPopularity]=useState(0);
  const [search,setSearch]=useState("");
  const [rows,setRows]=useState(5);
  useEffect(()=>{
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
  },[]);

  let remove=(remPlace)=>{
    let newArray = favorites.filter((place)=> place !== remPlace);
    setFavorites([...newArray]);
    const db = getDatabase();
    let uid = user.uid;
    set(ref(db, 'users/' + uid+'/favorites'), {
        favorites: [...newArray]
      })
  }
  let filtered=[];
  filtered=favorites.map((place)=>[place,data[place]]);
  console.log("fav",favorites);
  console.log("fil",filtered);

  if(rating===1)filtered=filtered.sort((a,b)=> parseFloat(a[1]["⭐️ Total score"].split(" ")[0].split("/")[0]) - parseFloat(b[1]["⭐️ Total score"].split(" ")[0].split("/")[0]));
  else if(rating===-1)filtered=filtered.sort((a,b)=> parseFloat(b[1]["⭐️ Total score"].split(" ")[0].split("/")[0]) - parseFloat(a[1]["⭐️ Total score"].split(" ")[0].split("/")[0]));

  if(popularity===1)filtered=filtered.sort((a,b)=>parseFloat(a[1]["💵 Cost"].split("$")[1].split("/")[0].replace(/[^0-9]/g, ""))-parseFloat(b[1]["💵 Cost"].split("$")[1].split("/")[0].replace(/[^0-9]/g, "")));
  else if(popularity===-1)filtered=filtered.sort((a,b)=>parseFloat(b[1]["💵 Cost"].split("$")[1].split("/")[0].replace(/[^0-9]/g, ""))-parseFloat(a[1]["💵 Cost"].split("$")[1].split("/")[0].replace(/[^0-9]/g, "")));

  filtered=filtered.filter((anime)=>anime[0].toLowerCase().includes(search.toLocaleLowerCase()));

  let maxPages=Math.ceil(filtered.length/rows);
  let sPage=(page-1)*rows
  let ePage=Number(sPage)+Number(rows);

  filtered=filtered.slice(sPage,ePage);

  
  function next(){
    if(page>=maxPages)return;
      setPage(page+1);
  }
  function previous(){ 
      if(page===1)return;
      setPage(page-1);
  }

  return <>
    <Navbar/>
    <div className='flex justify-center space-x-8 m-auto mb-2 mt-2 '> 
      <input type='text' placeholder='Search' value={search} onChange={(e)=>setSearch(e.target.value)} className='border-[#79B4B7] text-[#090a0f] font-bold rounded-xl border-2 p-2 m-2'/>
      <input type='number' placeholder='Row' value={rows} onChange={(e)=>setRows(e.target.value)} className='border-[#79B4B7] text-[#090a0f] font-bold rounded-xl border-2 p-2 m-2'/>
    </div>
    <div className="flex flex-col w-2/3 m-auto mb-2 mt-2 ">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Places
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <button onClick={()=>{setPopularity(0);setRating(-1)}}> 🔺</button> Total Score <button onClick={()=>{setPopularity(0);setRating(1)}}> 🔻</button >
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs flex font-medium text-gray-500 uppercase tracking-wider"
                  >
                  <button onClick={()=>{setRating(0);setPopularity(-1)}}> 🔺</button> Cost of Living <button onClick={()=>{setRating(0);setPopularity(1)}}> 🔻</button>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Internet 📡
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Remove</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {
                filtered.map((Anime) => (
                  <tr key={Anime.mal_id} className=' justify-center items-center '>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full" src="https://media.cntraveler.com/photos/60596b398f4452dac88c59f8/4:5/w_2132,h_2665,c_limit/MtFuji-GettyImages-959111140.jpg" alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{Anime[0]}</div>
                          <div className="text-sm text-gray-500">{Anime[1]["⛅️ Temperature (now)"]}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{Anime[1]["⭐️ Total score"].split(" ")[0]}</div>
                      <div className="text-sm text-gray-500">{Anime[1]["⭐️ Total score"].split(" ").slice(1)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 text-sm text-gray-900">
                        {Anime[1]["💵 Cost"]}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    
                    <div className="text-sm text-gray-900">{Anime[1]["📡 Internet"]}</div>
                        
                      </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={()=>remove(Anime[0])} className="text-red-600 hover:text-red-900">
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    
    
      <Pagination page={page} previous={previous} next={next}/>
  </>
}

export default Favorites;
