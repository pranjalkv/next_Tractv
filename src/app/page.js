import styles from './page.module.css'
import Front from '../../components/Front/Front'
import list from '../../components/data'
import { lazy,Suspense } from "react";
import Loading from '../../components/Loading/Loading';

const Row =lazy(()=>loadRow(import('../../components/Row/Row')))
export default function Home() {
  return (
    <main className={styles.main}>
      <Front fetchBanner={list.getBanner}></Front>
       <Suspense fallback={<Loading />} >
      <Row fetch={list.getNetflix} isOrignal title="Netflix Orignals"></Row>
      <Row fetch={list.getAction} title="Action Movies"></Row>
      <Row fetch={list.getComedy} title="Comedy Movies"></Row>
      <Row fetch={list.getPrime} title="Prime Orignals" isOrignal></Row>
      <Row fetch={list.getTVaMystery} title="Mystery Series"></Row>
      </Suspense>
    </main>
  )
}
async function loadRow(promise) {
  return new Promise(resolve => {
    setTimeout(resolve, 2000);
  }).then(() => promise);
}