import "./Page.css"
import axios from "axios";
import Readmore from "./Readmore";
import Pageplay from "./Pageplay";
import arLang from "../../../../../components/lang";
import Row from "../../../../../components/Row/Row";

export default async function Page({params})
{
    const API_KEY=process.env.API_TRACTV

    const getUrl=`https://api.themoviedb.org/3/${params.medType}/${params.pageId}?api_key=${API_KEY}`
    const getCast =`https://api.themoviedb.org/3/${params.medType}/${params.pageId}/credits?api_key=${API_KEY}`
    const getRowrec=`https://api.themoviedb.org/3/${params.medType}/${params.pageId}/recommendations?api_key=${API_KEY}`

    const req=await axios.get(getUrl)
    let filmresult=req.data;

     const reqCast=await axios.get(getCast)
    let allcast= reqCast.data.cast.slice(0,7);

     function changetv(media)
    {
        if(media ==="tv")
        {
            media="series";
        }
        return media;
    }

    function year(string)
    {
        return string?.slice(0,4)
    }

    function hrsMin(minutes)
    {
        let h=Math.floor(minutes/60);
        let m=minutes%60;
        let thrs= h>0 ? h+(h===1 ? "hr ":"hrs ") : "";
        let tmin= m>0? m+(m===1 ?"min " : "mins "):"";

        return thrs+tmin;
    }
    function numFromat(num) {
    if(num > 999 && num < 1000000)
    {
        return (num/1000).toFixed(1) + 'K'; 
    }
    else if(num >=1000000 && num<=999999999)
    {
        return (num/1000000).toFixed(1) + 'M'; 
    }
    else if(num >=1000000000)
    {
        return (num/1000000000).toFixed(1)+ 'B'
    }
    else if(num < 999 && num>0)
    {
        return num; // if value < 1000, nothing to do
    }
    else 
    {
        return " -/-"
    }
}

function topercent(value)
{
   return (value*10).toFixed(2)
}
    


    function changeLang(lang)
    {
        for(let i=0;i<arLang.length;i++)
        {
            if(arLang[i].iso_639_1===lang)
            {
                lang=arLang[i].english_name;
            }
        }
        return lang
    }


    return(
        <>
        <section id="search">
           <img className="search-img" 
            src="/images/back2.jpg" alt="" />
            <div className="overlay"></div>
        <div className="page-result">
            <div className="poster-left">
                {filmresult?.poster_path ?<img  className="img-poster" 
                src={`https://image.tmdb.org/t/p/original${filmresult?.poster_path}`} />:
                <img  className="img-poster" 
                src="/images/noposter.jpg" alt="fsag" />}
            </div>
            <div className="info-right">
                <p className="movie-name">{filmresult?.title || filmresult?.name}</p>
                  <div>
                    {filmresult["genres"]?.map((ele,i)=><p className="movie-genre-search" key={i}><span>{ele.name}</span></p>)} 
                </div>
         
                <div className="num-info">
                <p style={{fontWeight:"600",textTransform:"capitalize"}}>{changetv(params.medType)}
                <span className="lang-span"> ({changeLang(filmresult?.original_language)})</span></p>
                {params.medType==="movie"?<p >{year(filmresult?.release_date)}</p>:<p>Started {year(filmresult?.first_air_date)}</p>}
                {params.medType==="movie" ? <p>{hrsMin(filmresult?.runtime)}</p>:<p style={{textTransform:"capitalize"}}>{filmresult?.status}</p>}
                </div>

              
                

                <div className="vote">
                    <p>⭐{topercent(filmresult?.vote_average)}%</p>
                     <p>Total Votes:&nbsp;<span style={{fontWeight:600,color:"var(--yellow)"}}>{numFromat(filmresult?.vote_count)}</span></p>
                </div>

                 <Readmore filmresult={filmresult?.overview}></Readmore>
            

                {(params.medType==="movie" && filmresult?.budget>0) &&<div className="money">
                  
                    <p className="budget">Budget &nbsp; &nbsp; &nbsp;<span>${numFromat(filmresult?.budget)}</span></p>
                    {filmresult?.revenue>0 && <p className="collection">Collection <span>${numFromat(filmresult?.revenue)}</span></p>}
                </div>}

                    <div className="all-cast">Cast &nbsp;
                    {allcast.map((ele,i)=><p className="comma" key={i}>{ele?.name}</p>)}
                    </div>
                     <Pageplay idvid={params.pageId} media={filmresult?.name ? "tv":"movie"} 
                     API_KEY={API_KEY}></Pageplay>
             </div>
        </div>
        </section>
        <hr className="line"/>
        <Row fetch={getRowrec} isOrignal></Row>
        </>
    )
}
