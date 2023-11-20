import React, {useEffect, useState} from "react";

export default function Wallpaper({setLoaded = (a) => {}}) {
    const [wallpaperPath, setWallpaperPath] = useState("")
    const [curtain, setCurtain] = useState(true)

    const revealCurtain = () => {
        setTimeout(() => {
            setCurtain(false)
        }, 200)
        setTimeout(() => {
            setLoaded(true)
        }, 450)
    }

    useEffect(() => {
        setWallpaper()
        setInterval(() => {
            setCurtain(true)
            setTimeout(() => {
                setWallpaperPath("")
            }, 600)
            setTimeout(() => {
                setWallpaper()
            }, 4000)
        }, 1000*60*30)

        setTimeout(()=>{revealCurtain()}, 5000)
    }, []);


    function setWallpaper() {
        let wall_path = [
            "abduzeedo",
            "heysupersimi",
            "oostarteroo",
            "eberhardgross",
            "limamauro23"
        ];
        setWallpaperPath("https://source.unsplash.com/user/"+wall_path[Math.floor(Math.random() * wall_path.length)]+"/"+window.innerWidth+"x"+window.innerHeight)
    }

    return (
        <div style={{width: "100%", height: "100%", position: "absolute", left: 0, top: 0}}>
            <img onLoad={revealCurtain} src={wallpaperPath} alt={""} width={"100%"}
                 height={"100%"}
                 style={{
                     objectFit: "cover",
                     opacity: 0.8,
                 }}/>
            <div style={{
                background: "black",
                position: "absolute",
                left: 0,
                top: 0,
                height: "100%",
                width: "100%",
                transform: curtain ? "translate3d(0%,0,0)" : "translate3d(100%,0,0)",
                transition: "transform 0.6s ease"
            }}/>
        </div>
    )
}