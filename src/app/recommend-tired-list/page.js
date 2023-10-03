const Reclist = lazy(()=>loadMood(import("../../../components/Modalpages/Reclist")))
import { Suspense, lazy } from 'react'
import Loading from '../../../components/Loading/Loading';

function Tiredrec()
{
  let tired=[752623,335787,361743,5174,447365,157336,137113];
   let rN=Math.floor(Math.random() *7);

    return(
        <>
        <Suspense fallback={<Loading/>}>
        <p className="app-rec-para">Here are few options to make you <span className='app-mood-color'>feel relaxed</span></p>
        <Reclist mood={tired[rN]}></Reclist>
        </Suspense>
        </>
    )
}
async function loadMood(promise) {
  return new Promise(resolve => {
    setTimeout(resolve, 2000);
  }).then(() => promise);
}
export default Tiredrec