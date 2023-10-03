import list from "../../../components/data";
import Front from "../../../components/Front/Front";
import Row from "../../../components/Row/Row";

export default function Moviepage()
{
    return(
        <>
        <Front fetchBanner={list.getBannerAnim}></Front>
        <Row fetch={list.getTVAnim} title="Animated TV Shows" isOrignal></Row>
        <Row fetch={list.getAnim} title="Animated Movies"></Row>
        <Row fetch={list.getJanime} title="Anime"></Row>
        </>
        )
}