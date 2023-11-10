import React, {useEffect, useRef, useState} from "react";
import Slide from "@/app/components/Slide";
import AlignCenterContainer from "@/app/components/AlignCenterContainer";

export default function StatusPage({children = <></>, isExpanded = false, animate = false}) {
    const [expandWithDelay, setExpandWithDelay] = useState(isExpanded)
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

    return (
        <Slide animateSheet={animate} isExpanded={expandWithDelay}>
            {expandWithDelay ? <>
                {children}
            </> : <AlignCenterContainer width={"100%"} height={"100%"} left={true}>
                <div style={{paddingLeft: 50, fontSize: 44, fontWeight: 500}}>
                    Details
                </div>
            </AlignCenterContainer>
            }
        </Slide>)
}


