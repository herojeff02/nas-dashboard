import React, {useEffect, useRef, useState} from "react";
import Slide from "@/app/components/Slide";
import AlignCenterContainer from "@/app/components/AlignCenterContainer";
import styled from "styled-components";
import TileItem from "../components/Tile/TileItem";

export default function StatusPage({
                                       title = "Title",
                                       prometheus = {},
                                       selected = false,
                                       content = [],
                                       isExpanded = false,
                                       animate = false
                                   }) {
    const [expandWithDelay, setExpandWithDelay] = useState(isExpanded)
    const [showDetailsWithDelayPrecondition, setShowDetailsWithDelayPrecondition] = useState(isExpanded)
    const [showDetailsWithDelay, setShowDetailsWithDelay] = useState(isExpanded)
    const [scrolledToTop, setScrolledToTop] = useState(true)
    const lastTimeout = useRef(0)
    const titleRef = useRef()
    useEffect(() => {
        if (isExpanded) {
            clearTimeout(lastTimeout.current)
            setExpandWithDelay(true)
        } else {
            lastTimeout.current = setTimeout(() => {
                setExpandWithDelay(false)
            }, 500)
        }
    }, [isExpanded])
    useEffect(() => {
        if (expandWithDelay) {
            setTimeout(() => setShowDetailsWithDelay(true), 650)
            setTimeout(() => setShowDetailsWithDelayPrecondition(true), 600)
        } else {
            setShowDetailsWithDelay(false)
            setShowDetailsWithDelayPrecondition(false)
        }
    }, [expandWithDelay])

    useEffect(() => {
        const observer = new IntersectionObserver((entries, observer) =>
            entries.forEach((entry) => {
                    setScrolledToTop(entry.isIntersecting)
                }
            )
        );
        if (titleRef.current) {
            observer.observe(titleRef.current);
        }
        return () => observer.disconnect();
    }, [titleRef.current]);


    return (
        <div>
            <SmallTitle $visible={!scrolledToTop && selected && showDetailsWithDelay} onClick={() => {
                titleRef.current.scrollIntoView()
            }}>
                {title}
            </SmallTitle>
            <Slide animateSheet={animate} isExpanded={expandWithDelay}>
                {showDetailsWithDelayPrecondition && <div style={{
                    position: "absolute",
                    left: 40,
                    width: "calc(100% - 80px)",
                    height: "calc(100% - 60px)",
                    transform: showDetailsWithDelay ? "translateX(0)" : "translateX(60px)",
                    opacity: showDetailsWithDelay ? 1 : 0,
                    transition: "transform 0.3s ease, opacity 0.3s",
                }}>
                    <LargeTitle ref={titleRef} $visible={scrolledToTop && showDetailsWithDelay}>
                        {title}
                    </LargeTitle>
                    <div style={{
                        display: "flex"
                    }}>
                        {content.map(
                            (item, idx) => <TileItem key={idx} text={item}/>)
                        }
                    </div>
                </div>}
                <div style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    height: "100%",
                    padding: "20px",
                    pointerEvents: "none",
                    transform: showDetailsWithDelay ? "translateX(-80px)" : "translateX(0)",
                    opacity: showDetailsWithDelay ? 0 : 1,
                    transition: "transform 0.3s ease, opacity 0.3s"
                }}>
                    <AlignCenterContainer width={"100%"} height={"100%"} left={true}>
                        <Hint>
                            Details
                        </Hint>
                    </AlignCenterContainer>
                </div>
            </Slide>
        </div>)
}

const Hint = styled.div`
    padding-left: 50px;
    font-size: 44px;
    font-weight: 500;
`

const LargeTitle = styled.div`
    pointer-events: ${({$visible}) => $visible ? "auto" : "none"};
    padding-bottom: 10px;
    padding-top: 30px;
    font-size: 44px;
    font-weight: 500;
`

const SmallTitle = styled.div`
    pointer-events: ${({$visible}) => $visible ? "auto" : "none"};
    cursor: pointer;
    opacity: ${({$visible}) => $visible ? 1 : 0};
    transform: ${({$visible}) => $visible ? "translate3d(-50%,0,0) scale(1)" : "translate3d(-50%,-4px,0) scale(0.7)"};
    transition: opacity 0.4s ease, transform 0.3s ease;
    position: absolute;
    z-index: 20;
    top: 32px;
    left: 50%;
    font-size: 20px;
    font-weight: 600;
    padding: 4px 18px;
    backdrop-filter: blur(10px);
    border-radius: 100px;
    color: black;
    background: rgba(180, 180, 180, 0.2);

    &:active {
        transform: translate3d(-50%, 0, 0) scale(0.9);
        transition: opacity 0.1s ease, transform 0.1s ease;
    }
`