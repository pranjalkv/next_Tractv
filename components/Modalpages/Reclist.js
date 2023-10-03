import "./Reclist.css"
import axios from "axios";
import Recimg from "./Reclistcomps/Recimg";
import Errormsg from "../Errormsg/Errormsg";


async function Reclist ({mood})
{
   const API_KEY=process.env.API_TRACTV
    const moodURL=`https://api.themoviedb.org/3/movie/${mood}/recommendations?api_key=${API_KEY}&page=2&language=en-US`;
    try
    {
        const reqList=await axios.get(moodURL)
            let reclist= reqList.data.results
            return(
        <>
        <div className="reclist-flex">
        {reclist?.map(ele=>(ele?.poster_path)&&<div style={{position:"relative"}} key={ele.id}>
        <Recimg ele={ele}></Recimg>      
        </div>)}
        </div>
        </>
    )
            
        }
            catch(err)
            {
                return <Errormsg/>
            }

    
}
export default Reclist