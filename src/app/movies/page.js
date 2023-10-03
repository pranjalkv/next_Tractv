import list from "../../../components/data";
import Front from "../../../components/Front/Front";
import Row from "../../../components/Row/Row";

export default function Moviepage()
{
    return(
        <>
        <Front fetchBanner={list.getTabmovie} def_type="Movie"></Front>
      <Row title="Trending Now"  fetch={list.getTabtrend} isOrignal></Row>
      <Row title="Top Rated"  fetch={list.getTabtop}></Row>
        </>
        )
}