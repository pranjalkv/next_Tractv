"use client"
import { useEffect, useState ,useRef} from "react";
import"./Navbar.css";
import {FaCaretUp ,FaSearch} from 'react-icons/fa';
import Link from "next/link";
import { useRouter } from "next/navigation";
import Modal from "./Modalcomp/Modal";
import axios from "axios";



function Navbar({API_KEY})
{
  
     const ref = useRef()

    const[black,setblack]=useState(false)
    const[menu_btn ,setmenu]=useState(false);
    const [search,setSearch]=useState(false);
    const[sug,setSug]=useState("");
    const[filmitems,setFilmitesm]=useState([]);

     const navigate =useRouter();

    let searchapi=`https://api.themoviedb.org/3/search/multi?query=${sug}&api_key=${API_KEY}`

    function open_menu(e)
    {
        e.stopPropagation();
        setmenu(!menu_btn)
        setSearch(false)
    }
    function searchfn(e) 
    {
        e.stopPropagation();
        setSearch(search=>!search);
    }
    function changeNav()
    {
    if(window.scrollY>20)
    {
        setblack(true);
    }
    else
    {
        setblack(false);
    }
    }
    function changeMenu()
    {
        if(window.innerWidth>1100)
        {
            setmenu(false)
        }
    }
    function changetv(media)
    {
        if(media ==="tv")
        {
            media="series";
        }
        return media;
    }

        function timecut(string)
    {
        return string?.slice(0,4)
    }

      function filmclick(e)
  {
    e.preventDefault();
    e.stopPropagation();
     navigate.push(`/search/${e.target.title}/${e.target.id}`)  
  }

  function errorHandle(e)
  {
    e.target.src="/images/noimg.jpg"
  }

    useEffect(()=>{
        window.addEventListener("scroll",changeNav)
        window.addEventListener("resize",changeMenu)
        return()=>{window.removeEventListener("scroll",changeNav)
        window.removeEventListener("resize",changeMenu)}
    },[])

    useEffect(()=>{
        async function getSearch()
        {
            try{
const res=await axios.get(searchapi)
            setFilmitesm(res.data.results.slice(0,10))
        return res;
            }
            catch(err)
        {
            console.log(err)
        }
        }
        getSearch();
    },[searchapi])

      useEffect(() => {
    const checkOutside = e => {
      if (search && ref.current && !ref.current.contains(e.target))
      {
        setSearch(false)
      }
    }

    document.addEventListener("mousedown", checkOutside)

    return () => {
      document.removeEventListener("mousedown", checkOutside)
    }
  }, [search])

    return(
        <section>
        <nav id="navbar" className={black || menu_btn ?"blacknav":""} ref={ref}>
            <Link href="/"><div id="title">
                <h2>Tractv</h2>
            </div></Link>
            <div className={`menu ${menu_btn?"menu-change":""}`} >

            <ul className="navl-ul" onClick={()=>setmenu(false)}>
                <li><Link href="/" className="navl" >Home</Link></li>
               <li><Link href="/movies" className="navl" >Movies</Link></li>
               <li><Link href="/series" className="navl" >Series</Link></li>
               <li><Link href="/animated" className="navl" >Animated</Link></li>
            </ul>
            </div>

            {search &&<div className="search-box" >
                <input  type="text" id="input-search" placeholder="Search Movie..." 
                value={sug} 
                onChange={(e)=>setSug(e.target.value)} autoFocus autoComplete="off" />
                <div className= {`${sug==="" ? "hidesug":"div-suggest"}`}>
                {filmitems?.map((ele)=>((ele?.media_type!=="person") &&<div className="suggest"  key={ele?.id} 
                title={ele?.media_type} id={ele?.id} onClick={filmclick}>
                        {ele?.backdrop_path ? <img width="50px" height="75px" 
                        src={`https://image.tmdb.org/t/p/original${ele?.poster_path}`} alt="" onError={errorHandle}/ >:
                        <img width="50px" height="75px" src="/images/noimg.jpg" alt="N.A." />}
                    <div className="search-info">
                    <p>{ele?.title || ele?.name}</p>
                      <div className="search-year-type">
                      <p>{timecut(ele?.first_air_date || ele?.release_date)}</p>
                      <p style={{marginLeft:"10px",
                                textTransform:"capitalize"}}>{changetv(ele?.media_type)}</p>        
                      </div>
                    </div>
                     </div>))}
                     {(filmitems.length===0 && sug.length>=3)  && <div className="suggest" 
                     style={{pointerEvents:"none"}}><p style={{fontStyle:"italic"}}>No items found</p></div>}
                </div>
                
            </div>}
            <div className="other-items">
            <button className="searchbtn" onClick={searchfn}><FaSearch /></button>
            <Modal></Modal>
            <div className={`div-toggle ${menu_btn?"color-change":""}`}>
                <button className="toggler" onClick={open_menu}>Menu <FaCaretUp className={menu_btn?"rotate-menu-icon":"menu-icon"}/></button>
            </div>
            </div>
        </nav>
        </section>
    )
}
export default Navbar