"use client"
import React, {useEffect, useRef, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";

import 'swiper/css'
import ControlPage from "./pages/ControlPage";
import MainPage from "./pages/MainPage";
import StatusPage from "./pages/StatusPage";
import {Background, RevealContainer} from "./components/StyledComponents";
import PageDots from "./components/PageDots";
import Wallpaper from "./components/Wallpaper";


export default function Home() {
    const [isSheetExpanded, setSheetExpanded] = useState(false)
    const [activeIndex, setActiveIndex] = useState(1)
    const [isContainerLoaded, setContainerLoaded] = useState(false)
    const lastTimeout = useRef(0)
    const ref = useRef()

    const nextPage = () => ref.current?.slideNext()
    const prevPage = () => ref.current?.slidePrev()

    useEffect(() => {
        clearTimeout(lastTimeout.current)
        lastTimeout.current = setTimeout(() => {
            ref.current?.slideTo(1)
        }, 300000)
    }, [activeIndex])

    useEffect(() => {
        setTimeout(() => {
            setContainerLoaded(true)
        }, 500)
    }, []);


    return (
        <>
            <Wallpaper/>
            <RevealContainer loaded={isContainerLoaded}>
                <Background>
                    {isContainerLoaded && <Swiper
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
                    </Swiper>}

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
                        <PageDots
                            style={{textAlign: "left", height: "100%", paddingLeft: 60, width: "calc(50% - 150px)"}}
                            onClick={prevPage} dots={activeIndex - 1}/>
                        <span style={{width: "300px", textAlign: "center"}}>Uptime : ?? days, 20 hours</span>
                        <PageDots
                            style={{textAlign: "right", height: "100%", paddingRight: 60, width: "calc(50% - 150px)"}}
                            onClick={nextPage} dots={ref.current?.slides.length - activeIndex - 1} gravity={"right"}/>
                    </div>
                </Background>
            </RevealContainer>
        </>
    )
}