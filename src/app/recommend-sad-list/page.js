const Reclist = lazy(()=>loadMood(import("../../../components/Modalpages/Reclist")))
import { Suspense, lazy } from 'react'
import Loading from '../../../components/Loading/Loading';

function Sadrec()
{
   let sad=[12133,8363,57214,502356,868759,76493,10201]
   let rN=Math.floor(Math.random() *7);

    return(
        <>
        <Suspense fallback={<Loading/>}></Suspense>
         <p className="app-rec-para">Here are few options to <span className='app-mood-color'>cheer up</span> your mood</p>
         <Reclist mood={sad[rN]}></Reclist>
        </>
    )
}
async function loadMood(promise) {
  return new Promise(resolve => {
    setTimeout(resolve, 2000);
  }).then(() => promise);
}
export default Sadrec