 "use client"
import { useRef, useState} from "react";
import "./Row.css"
import {FaChevronLeft, FaChevronRight,FaPlay} from 'react-icons/fa';
import { useRouter } from 'next/navigation'
import { useInView } from "react-intersection-observer";

function Rowdata({film,isOrignal})
{
    const slider=useRef(null)
    const navigateRow=useRouter();
    const [scrollEnd, setscrollEnd] = useState(false);
    const[scroller,setScroller]=useState(0)   
    const[hover,setHover]=useState(false);

    const[rowHover,setRowhover]=useState(-1);
  
    const [inView, setInView] = useInView({
    triggerOnce: true,
  });

      const actions = (shift) => {
    slider.current.scrollLeft += shift;
    setScroller(scroller + shift);
  };

      const scrollCheck = () => {
    setScroller(slider.current.scrollLeft);
    if (Math.floor(slider.current.scrollWidth - slider.current.scrollLeft) <=slider.current.offsetWidth)
      {
      setscrollEnd(true);
    } 
    else 
    {
      setscrollEnd(false);
    }
  };
   

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

    navigateRow.push(`/search/${e.target.slot}/${e.target.id}`)
   }

    return(
        <>
        <div className="all-items"  ref={slider} onScroll={scrollCheck} onMouseEnter={() => setHover(true) }
        onMouseLeave={() => setHover(false)}>
            {film.map((ele)=>((isOrignal && ele.poster_path)||(!isOrignal && ele.backdrop_path))&& 
            (<div key ={ele.id} ref={inView}>
              {setInView && <div  className={`${isOrignal ? "items-poster":"items-flat"}`} 
            style={{
                backgroundImage:`url("https://image.tmdb.org/t/p/original${isOrignal?ele.poster_path:ele.backdrop_path}")`,
                backgroundPosition:"center center",
                backgroundSize:"cover"
            }}  
            onMouseEnter={()=>setRowhover(ele.id)} onMouseLeave={()=>setRowhover(-1)} 
            slot={ele?.title ? "movie" :"tv"} id={ele?.id} onClick={allInfo} > 

              <div className={` ${rowHover===ele.id ? "div-abs":"hider"}`}>
              <p>{ele?.title || ele?.name}</p>
              <button><FaPlay/></button>
              <div className="row-nums">
              <p>⭐{topercent(ele?.vote_average)}%</p>
              <p>{timecut(ele?.first_air_date || ele?.release_date)}</p>
            </div> 
            </div>
            </div>}
            {!isOrignal && <p className="mobile-title">{ele?.name || ele?.title}</p>}
            </div>))}
        </div>
        {film.length > 4 && <div>
          {scroller!==0 &&(<button className={`shifters arrows-left ${!hover?"show":""}`} key="left" onClick={()=>{actions(-500)}} onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}>
            <FaChevronLeft size={40} className="arrow-icon"  />
            </button>)}
        {!scrollEnd &&(<button className={`shifters arrows-right ${!hover?"show":""}`} key="right"onClick={()=>{actions(+500)}} onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}>
            <FaChevronRight size={40} className="arrow-icon" />
        </button>)}
        </div>}
        </>
    )
}
export default Rowdata