"use client"
import { useState } from "react"
function Readmore({filmresult})
{
    const [n,setN]=useState(250)
    var x=0;
    function cut(string,n)
    {
     x=string?.length;
     return string?.length>n ? string.slice(0,n-1)+"..." : string
    }
    return(
        <p className="search-desc">{cut(filmresult,n)}
                 {x>250 &&<button className="read-more"  
                 onClick={()=>{setN(n=>n+2000)}}>{n>250 ? "" :"Read More"}</button>}
    </p>
    )
}
export default Readmore