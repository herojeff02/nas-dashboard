"use client"
import React, {useEffect, useRef, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";

import 'swiper/css'
import ControlPage from "./pages/ControlPage";
import MainPage from "./pages/MainPage";
import StatusPage from "./pages/StatusPage";
import {RevealContainer} from "./components/StyledComponents";
import Wallpaper from "./components/Wallpaper";
import {API} from "./api";
import Dialog from "./components/Dialog/Dialog";


export default function Home() {
    const [activeIndex, setActiveIndex] = useState(1)
    const [isReconnecting, setReconnecting] = useState(false)
    const [isContainerLoaded, setContainerLoaded] = useState(false)
    const [sysInfo, setSysInfo] = useState({})
    const lastTimeout = useRef(0)
    const ref = useRef()


    const nextPage = () => ref.current?.slideNext()
    const prevPage = () => ref.current?.slidePrev()


    const slides = [
        <ControlPage key={0} selected={activeIndex === 0}/>,
        <MainPage key={1} sysInfo={sysInfo} nextPageAction={nextPage} isContainerLoaded={isContainerLoaded}/>,
        <StatusPage
            key={2}
            prometheus={sysInfo}
            title={"SDA"}
            selected={activeIndex === 2}
            isExpanded={activeIndex > 1}
            animate={true}
            content = {[
                sysInfo?.sda?.smartprom_temperature_celsius_raw ?? "loading...",
                sysInfo?.sda?.smartprom_temperature_celsius_raw ?? "loading...",
                sysInfo?.sda?.smartprom_temperature_celsius_raw ?? "loading...",
            ]}
        />,
        <StatusPage 
            key={3} 
            prometheus={sysInfo}
            title={"SDB"} 
            selected={activeIndex === 3} 
            isExpanded={true}>
            <div>
                Empty Page
            </div>
        </StatusPage>
    ]


    useEffect(() => {
        clearTimeout(lastTimeout.current)
        lastTimeout.current = setTimeout(() => {
            ref.current?.slideTo(1, 1500)
        }, 300000)
    }, [activeIndex])

    // const handleScrollLock = (e) => {
    //     e.preventDefault()
    // }
    //
    // useEffect(() => {
    //     document.body.addEventListener('touchmove', handleScrollLock, {passive: false});
    //     return () => {
    //         document.body.removeEventListener('touchmove', handleScrollLock, {passive: false})
    //     }
    // }, [])

    useEffect(() => {
        //Connecting Dialog
        const api = new API(4000)
        setTimeout(() => setReconnecting(true), 300)
        const intervalId = setInterval(() => {
            api
                .get(api.AVAIL_ENDPOINT.ping)
                .then(() => {
                    setReconnecting(false)
                    clearInterval(intervalId)
                })
                .catch(() => {
                    setReconnecting(true)
                })
        }, 2000)
    }, [])


    useEffect(() => {
        const api = new API(10000)
        setInterval(() => {
            api
                .get(api.AVAIL_ENDPOINT.sysinfo)
                .then((r) => {
                    setSysInfo(r.data)
                    console.log(r.data)
                })
                .catch(() => {
                })
        }, 10000)
    }, [])

    return (
        <div style={{position: "fixed", top: 0, left: 0, width: "100%", height: "100%"}}>
            <Wallpaper setLoaded={setContainerLoaded}/>
            <RevealContainer reveal={isContainerLoaded}>
                <Swiper
                    onBeforeInit={(swiper) => {
                        ref.current = swiper;
                    }}
                    speed={400}
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
                        overflowX: "hidden",
                        overflowY: "scroll"
                    }}>
                    {slides.map((item, index) => {
                        return <SwiperSlide key={index} style={{width: "100%", height: "100%"}}>
                            {item}
                        </SwiperSlide>
                    })}
                </Swiper>
            </RevealContainer>

            <Dialog
                showLoadingIcon={true}
                isVisible={isReconnecting}
                mainText={"Connecting..."}/>

        </div>
    )
}