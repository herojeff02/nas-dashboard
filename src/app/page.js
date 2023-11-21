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
    const [isReconnecting, setReconnecting] = useState(false)
    const [isContainerLoaded, setContainerLoaded] = useState(false)
    const [temporarySdaText, setSdaText] = useState("loading")
    const lastTimeout = useRef(0)
    const ref = useRef()

    const nextPage = () => ref.current?.slideNext()
    const prevPage = () => ref.current?.slidePrev()

    useEffect(() => {
        clearTimeout(lastTimeout.current)
        lastTimeout.current = setTimeout(() => {
            ref.current?.slideTo(1, 3000)
        }, 300000)
    }, [activeIndex])

    const handleScrollLock = (e) => {
        e.preventDefault()
    }

    useEffect(() => {
        document.body.addEventListener('touchmove', handleScrollLock, {passive: false});
        return () => {
            document.body.removeEventListener('touchmove', handleScrollLock, {passive: false})
        }
    }, [])


    // useEffect(() => {
    //     const start = performance.now();
    //     let i = 0;
    //     function count() {
    //         do {i++;} while (i % 1e6 !== 0)
    //         if (i === 1e9) {console.log('Task completed!')}
    //         else {setTimeout(count, 0)}
    //     }
    //     count();
    //     const duration = performance.now() - start;
    //     if(Math.floor(duration) > 5){
    //         setHeavyAnimation(false)
    //     }
    // }, []);


    useEffect(() => {
        const api = new API(1500)
        setTimeout(()=>setReconnecting(true),300)
        setInterval(() => {
            api
                .get(api.AVAIL_ENDPOINT.ping)
                .then(() => {
                    setReconnecting(false)
                })
                .catch(()=>{
                    setReconnecting(true)
                })
        }, 2000)
    }, [])

    useEffect(() => {
        const api = new API(1500)
        setInterval(() => {
            api
                .get(api.AVAIL_ENDPOINT.smartctl.sda)
                .then((r) => {
                    setSdaText(r.data.splice(58,18).join(""))
                })
                .catch(()=>{
                })
        }, 10000)
    }, [])

    return (
        <>
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
                            <div>
                                {temporarySdaText}
                            </div>
                        </StatusPage>
                    </SwiperSlide>
                    <SwiperSlide style={{width: "100%", height: "100%"}}>
                        <StatusPage isExpanded={activeIndex > 1}>
                            <div>
                                asdf
                            </div>
                        </StatusPage>
                    </SwiperSlide>
                </Swiper>

                {/*<NavBar isExpanded={activeIndex > 1} nextPage={nextPage} prevPage={prevPage} currentPage={activeIndex + 1} totalPages={ref.current?.slides.length}/>*/}
            </RevealContainer>

            <Dialog
                showLoadingIcon={true}
                isVisible={isReconnecting}
                mainText={"Connecting..."}/>

        </>
    )
}