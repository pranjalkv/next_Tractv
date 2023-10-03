import "./Row.css"
import axios from "axios";
import Rowdata from "./Rowdata";
import Errormsg from "../Errormsg/Errormsg";

async function Row({title,fetch,isOrignal})
{
   try{
const request=await axios.get(fetch)
  let film= request.data.results
  return(
<section className="rows">
        <p>{title}</p>
        <Rowdata film={film} isOrignal={isOrignal}></Rowdata>
        </section>
    )
  }
  catch(err)
  {
    return <Errormsg/>
  }

    
}

export default Row