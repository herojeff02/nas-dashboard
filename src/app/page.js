"use client"
import React, {useEffect, useRef, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";

import 'swiper/css'
import ControlPage from "./pages/ControlPage";
import MainPage from "./pages/MainPage";
import StatusPage from "./pages/StatusPage";
import {RevealContainer} from "./components/StyledComponents";
import Wallpaper from "./components/Wallpaper";
import BottomSheet from "./components/Sheet/BottomSheet";
import {API} from "./api";
import Dialog from "./components/Dialog/Dialog";


export default function Home() {
    const [activeIndex, setActiveIndex] = useState(1)
    const [isReconnecting, setReconnecting] = useState(true)
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

    const handleScrollLock = (e) => {
        e.preventDefault()
    }

    useEffect(() => {
        document.body.addEventListener('touchmove', handleScrollLock, { passive: false });
        return () => {
            document.body.removeEventListener('touchmove', handleScrollLock, { passive: false })
        }
    }, [])


    useEffect(() => {
        const api = new API()
        setInterval(() => {
            api
                .get(api.AVAIL_ENDPOINT.ping)
                .then(() => {
                    setReconnecting(false)
                })
                .catch(()=>{
                    setReconnecting(true)
                })
        }, 1000)
    }, [])


    return (
        <>
            <Wallpaper setLoaded={setContainerLoaded}/>
            <RevealContainer loaded={isContainerLoaded}>
                <Swiper
                    onBeforeInit={(swiper) => {
                        ref.current = swiper;
                    }}
                    speed={350}
                    initialSlide={1}
                    spaceBetween={0}
                    slidesPerView={"auto"}
                    allowTouchMove={true}
                    autoplay={true}
                    onSlideChange={(e) => {
                        setActiveIndex(e.activeIndex)
                    }}
                    style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        left: 0,
                        top: 0,
                        opacity: isContainerLoaded ? 1 : 0,
                        overflow: "hidden"
                    }}
                >
                    <SwiperSlide style={{width: "100%", height: "100%"}}>
                        <ControlPage selected={activeIndex === 0}/>
                    </SwiperSlide>
                    <SwiperSlide style={{width: "100%", height: "100%"}}>
                        <MainPage nextPageAction={nextPage} isContainerLoaded={isContainerLoaded}/>
                    </SwiperSlide>
                    <SwiperSlide style={{width: "100%", height: "100%"}}>
                        <StatusPage isExpanded={activeIndex > 1} animate={true}>
                            <>
                            </>
                        </StatusPage>
                    </SwiperSlide>
                    <SwiperSlide style={{width: "100%", height: "100%"}}>
                        <StatusPage isExpanded={true}>
                            <>
                            </>
                        </StatusPage>
                    </SwiperSlide>
                </Swiper>

                {/*<NavBar isExpanded={activeIndex > 1} nextPage={nextPage} prevPage={prevPage} currentPage={activeIndex + 1} totalPages={ref.current?.slides.length}/>*/}
            </RevealContainer>
            <BottomSheet isOpen={isReconnecting} preferredWidth={"300px"} preferredHeight={"100px"}>
                <div style={{
                    color: "black",
                    textAlign: "center",
                    padding: "34px 0 0 0",
                    fontSize: "26px",
                    fontWeight: "200",
                }}>
                    Connecting...
                </div>
            </BottomSheet>
        </>
    )
}