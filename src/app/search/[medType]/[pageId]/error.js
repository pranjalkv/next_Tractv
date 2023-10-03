"use client"
import Link from "next/link"

function Errorpage(){
    return(
    <section className="error-page">
        <div>
            <img className="error-img" src="/images/error.png" alt="" />
        <p className="error-head">ERROR 404!</p>
        <p className="error-title">Page you are searching for does not exist</p>
        <Link href="/"><button className="play-btn">Back</button></Link>
        </div>
        </section>
    )
}

export default Errorpage


