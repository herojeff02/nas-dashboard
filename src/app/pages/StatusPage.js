import React, {useEffect, useRef, useState} from "react";
import Slide from "@/app/components/Slide";
import AlignCenterContainer from "@/app/components/AlignCenterContainer";

export default function StatusPage({children = <></>, isExpanded = false, animate = false}) {
    const [expandWithDelay, setExpandWithDelay] = useState(isExpanded)
    const [showDetailsWithDelayPrecondition, setShowDetailsWithDelayPrecondition] = useState(isExpanded)
    const [showDetailsWithDelay, setShowDetailsWithDelay] = useState(isExpanded)
    const lastTimeout = useRef(0)
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
    useEffect(()=>{
        if(expandWithDelay) {
            setTimeout(() => setShowDetailsWithDelay(true), 650)
            setTimeout(() => setShowDetailsWithDelayPrecondition(true), 600)
        }
        else{
            setShowDetailsWithDelay(false)
            setShowDetailsWithDelayPrecondition(false)
        }
    },[expandWithDelay])

    return (
        <Slide animateSheet={animate} isExpanded={expandWithDelay}>
            {showDetailsWithDelayPrecondition && <div style={{position:"absolute", left:20, top:20, width:"calc(100vw - 80px)", height:"calc(100vh - 80px)", transform:showDetailsWithDelay?"translateX(0)":"translateX(60px)", opacity:showDetailsWithDelay?1:0, transition:"transform 0.3s ease, opacity 0.3s"}}>
                {children}
            </div>}
            <div style={{position:"absolute", left:0, top:0, height:"100%", padding:"20px", transform:showDetailsWithDelay?"translateX(-80px)":"translateX(0)", opacity:showDetailsWithDelay?0:1, transition:"transform 0.3s ease, opacity 0.3s"}}>
                <AlignCenterContainer width={"100%"} height={"100%"} left={true}>
                    <div style={{paddingLeft: 50, fontSize: 44, fontWeight: 500}}>
                        Details
                    </div>
                </AlignCenterContainer>
            </div>
        </Slide>)
}


