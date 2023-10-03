const Reclist = lazy(()=>loadMood(import("../../../components/Modalpages/Reclist")))
import { Suspense, lazy } from 'react'
import Loading from '../../../components/Loading/Loading';
function Happyrec()
{
    let happy=[597,1010581,1016121,2105,10528,88751,253412];

   let rN=Math.floor(Math.random() *7);

    return(
        <>
        <Suspense fallback={<Loading />} >
        <p className="app-rec-para">Here are few options that will make you even <span className='app-mood-color'>more Happier</span></p>
        <Reclist mood={happy[rN]}></Reclist>
        </Suspense>
        </>
    )
}
async function loadMood(promise) {
  return new Promise(resolve => {
    setTimeout(resolve, 2000);
  }).then(() => promise);
}

export default Happyrec

