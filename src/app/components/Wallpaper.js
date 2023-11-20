import React, {useEffect, useState} from "react";

export default function Wallpaper() {
    const [wallpaperPath, setWallpaperPath] = useState("")
    const [curtain, setCurtain] = useState(true)

    const revealCurtain = () => setTimeout(() => setCurtain(false), 200)

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
        }, 5400000)
    }, []);


    function setWallpaper() {
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

    }

    return (
        <div style={{width: "100%", height: "100%"}}>
            <img onLoad={revealCurtain} src={wallpaperPath} alt={""} width={"100%"}
                 height={"100%"}
                 style={{
                     objectFit: "cover",
                     opacity: 0.6,
                 }}/>
            <div style={{
                background: "black",
                position: "absolute",
                right: 0,
                top: 0,
                height: "100%",
                width: curtain ? "100%" : "0%",
                transition: "width 0.6s ease"
            }}/>
        </div>
    )
}