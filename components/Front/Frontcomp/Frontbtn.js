"use client"
import "../Front.css"
import {FaPlay} from 'react-icons/fa';
import { useRouter } from 'next/navigation'

function Frontbtn({movieid,movieSlot})
{
    const frontNavigate=useRouter()
        function openFront(e)
    {
        e.stopPropagation()
        frontNavigate.push(`/search/${e.target.slot}/${e.target.id}`)
    }
    return(
<button className="play-btn" id={movieid} slot={movieSlot} onClick={openFront}>
    <FaPlay className="play-icon"/>Play</button>
    )
}
 export default Frontbtn;