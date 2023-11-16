import React, {useEffect, useState} from "react";

export default function Wallpaper(){
    const [wallpaperPath, setWallpaperPath] = useState("")
    const [curtain, setCurtain] = useState(true)

    useEffect(() => {
        setWallpaper()
        setInterval(()=>{
            setCurtain(true)
            setTimeout(()=>{
                setWallpaperPath("")
            },800)
            setTimeout(()=>{
                setWallpaper()
            },4000)
        }, 5400000)
    }, []);


    function setWallpaper(){
        let wall_path = [
            "/wallpaper/img100.jpg",
            "/wallpaper/img101.png",
            "/wallpaper/img102.jpg",
            "/wallpaper/img103.png",
            "/wallpaper/img104.jpg",
            "/wallpaper/img7.jpg",
            "/wallpaper/img8.jpg",
            "/wallpaper/img10.jpg",
            "/wallpaper/img11.jpg",
            "/wallpaper/img12.jpg",
            "/wallpaper/img1.jpg",
            "/wallpaper/img2.jpg",
            "/wallpaper/img3.jpg",
            "/wallpaper/img4.jpg",
            "/wallpaper/holo/Background_Cliffhouse.jpg",
            "/wallpaper/holo/Background_Safety_Objects.jpg",
            "/wallpaper/holo/bg1a.jpg",
            "/wallpaper/holo/bg2.jpg",
            "/wallpaper/holo/bg3.jpg",
            "/wallpaper/holo/bg4.jpg",
            "/wallpaper/holo/bg5.jpg",
            "/wallpaper/holo/bg6.jpg",
            "/wallpaper/holo/bg7.jpg",
            "/wallpaper/holo/FR_Back_Landscape_Med_1920x1080.jpg",
            "/wallpaper/weather/farewell.jpg",
            "/wallpaper/weather/fre_background.jpg",
        ];
        let wall = Math.random() * wall_path.length;
        wall -= wall % 1;
        let final_wall = wall_path[wall];

        setWallpaperPath(final_wall)
        setCurtain(false)
    }

    return(
        <div style={{width: "100%", height: "100%"}}>
            <img src={wallpaperPath} alt={""} width={"100%"} height={"100%"}
                 style={{
                     objectFit: "cover",
                     opacity: wallpaperPath === "" ? 0 : 0.6,
                     transition: "opacity 2s ease"
                 }}/>
            <div style={{
                background: "black",
                position: "absolute",
                left: 0,
                bottom: 0,
                width: "100%",
                height: curtain ? "100%" : "0%",
                transition: "height 0.8s ease"
            }}/>
        </div>
    )
}