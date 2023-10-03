"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaPlay } from "react-icons/fa";

function Recimg({ele})
{
    const navigateRec=useRouter();
         function timecut(string)
    {
        return string?.slice(0,4)
    }

    function topercent(value)
   {
   return (value*10).toFixed(2)
    }
       function allInfo(e)
   {
    e.stopPropagation()
    navigateRec.push(`/search/${e.target.slot}/${e.target.id}`)
   }
  function handelRecerror(e)
   {
    e.target.src="/images/noposter.jpg"
   }
    const[recHover,setRechover]=useState(-1);
    return(
        <>
        <img className="items-poster-rec" key={ele.id} 
        src={`https://image.tmdb.org/t/p/original${ele?.poster_path}`}
         style=
        {{
                backgroundPosition:"center center",
                backgroundSize:"cover"}} 
                slot="movie" id={ele.id} 
                onMouseEnter={()=>setRechover(ele.id)} onMouseLeave={()=>setRechover(-1)} onClick={allInfo}
                 onError={handelRecerror} />  
                 <div className={` ${recHover===ele.id ? "info-rec":"hide-rec"}`}>
                    <p>{ele?.title || ele?.name}</p>
                    <button><FaPlay/></button>
              <div className="row-nums">
              <p>⭐{topercent(ele.vote_average)}%</p>
              <p>{timecut(ele.first_air_date || ele?.release_date)}</p>
            </div> 
                </div>
         </>
    )
}

export default Recimg;