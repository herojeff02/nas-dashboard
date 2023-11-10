"use client"
import React, {useEffect, useRef, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";

import 'swiper/css'
import ControlPage from "./pages/ControlPage";
import MainPage from "./pages/MainPage";
import StatusPage from "./pages/StatusPage";
import {Background} from "./components/StyledComponents";
import PageDots from "./components/PageDots";


export default function Home() {
    const [wallpaperPath, setWallpaperPath] = useState("")
    const [isSheetExpanded, setSheetExpanded] = useState(false)
    const [activeIndex, setActiveIndex] = useState(1)
    const [curtain, setCurtain] = useState(true)
    const lastTimeout = useRef(0)
    const ref = useRef()

    const nextPage = () => ref.current?.slideNext()
    const prevPage = () => ref.current?.slidePrev()

    useEffect(()=>{
        clearTimeout(lastTimeout.current)
        lastTimeout.current = setTimeout(()=>{
            ref.current?.slideTo(1)
        },300000)
    }, [activeIndex])

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

    return (
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
            <Background>
                <Swiper
                    onBeforeInit={(swiper) => {
                        ref.current = swiper;
                    }}
                    speed={250}
                    initialSlide={1}
                    spaceBetween={0}
                    slidesPerView={"auto"}
                    simulateTouch={true}
                    allowTouchMove={true}
                    autoplay={true}
                    onSlideChange={(e) => {
                        setSheetExpanded(e.activeIndex > 1)
                        setActiveIndex(e.activeIndex)
                    }}
                    style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        left: 0,
                        top: 0,
                    }}
                >
                    <SwiperSlide style={{width: "100%", height: "100%"}}>
                        <ControlPage/>
                    </SwiperSlide>
                    <SwiperSlide style={{width: "100%", height: "100%"}}>
                        <MainPage nextPageAction={nextPage}/>
                    </SwiperSlide>
                    <SwiperSlide style={{width: "100%", height: "100%"}}>
                        <StatusPage isExpanded={isSheetExpanded} animate={true}>
                            <>
                            </>
                        </StatusPage>
                    </SwiperSlide>
                    <SwiperSlide style={{width: "100%", height: "100%"}}>
                        <StatusPage isExpanded={isSheetExpanded}>
                            <>
                            </>
                        </StatusPage>
                    </SwiperSlide>
                </Swiper>
                <div style={{
                    position: "absolute",
                    bottom: 0,
                    transform: isSheetExpanded ? "scale(1.0)" : "scale(0.9)",
                    opacity: isSheetExpanded ? 1 : 0,
                    pointerEvents: isSheetExpanded ? "all" : "none",
                    left: 0,
                    width: "100%",
                    height: 80,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transition: "transform 0.4s ease, opacity 0.3s ease",
                    zIndex: 1
                }}>
                    <PageDots style={{textAlign: "left", height: "100%", paddingLeft: 60, width: "calc(50% - 150px)"}}
                              onClick={prevPage} dots={activeIndex - 1}/>
                    <span style={{width: "300px", textAlign: "center"}}>Uptime : ?? days, 20 hours</span>
                    <PageDots style={{textAlign: "right", height: "100%", paddingRight: 60, width: "calc(50% - 150px)"}}
                              onClick={nextPage} dots={ref.current?.slides.length - activeIndex - 1} gravity={"right"}/>
                </div>
            </Background>
        </div>

    )
}