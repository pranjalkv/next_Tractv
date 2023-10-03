import list from "../../../components/data";
import Front from "../../../components/Front/Front";
import Row from "../../../components/Row/Row";

export default function Moviepage()
{
    return(
        <>
        <Front fetchBanner={list.getTabTv} def_type="tv"></Front>
      <Row title="Trending Now"  fetch={list.getTvTrend} isOrignal></Row>
      <Row title="Top Rated"  fetch={list.getTvRated}></Row>
        </>
        )
}