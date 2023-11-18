import styled from "styled-components";
import { useEffect, useRef, useState } from 'react';


export default function CenterSheet (
    {
        children,
        isDismissible = true,
        isOpen = true,
        setOpen = alert,
        preferredHeight = "auto" || 100,
        hideOverflow = true,
    }) {

    const [isVisible, setVisible] = useState(false);
    const [sheetHeight, setSheetHeight] = useState(0);

    const sheetRef = useRef()
    const childRef = useRef()
    const scrollRef = useRef()


    const animateClose = () => {
        if(isDismissible && !!setOpen) {
            setOpen(false)
        }
    }

    useEffect(() => {
        if(isOpen) {
            setVisible(true);
        } else {
            setTimeout(() => {
                setVisible(true);
            }, 300)
        }

        const resizeObserver = new ResizeObserver(() => {
            if(preferredHeight === "auto") {
                setSheetHeight(childRef?.current?.offsetHeight)
            } else {
                setSheetHeight(preferredHeight);
            }
        });
        if(childRef.current) {
            resizeObserver.observe(childRef.current);
        }
        return () => resizeObserver.disconnect();
    }, [])


    return (
        <Background style={{
            transition: "background 0.3s, opacity 0.3s",
            pointerEvents: isOpen ? `all` : `none`,
            opacity: isVisible ? `1` : `0`,
            background: `rgba(0, 0, 0, ${isOpen ? 0.2 : 0})`
        }}>
            <div
                style={{ width: "100%", height: "100%" }}
                onClick={(e) => {
                    animateClose()
                }} />

            <Sheet
                onClick={(e) => {
                    if(isOpen) {
                        e.stopPropagation()
                    }
                }}
                ref={sheetRef}
                style={{
                    height: sheetHeight,
                    overflow: hideOverflow ? "hidden" : "default",
                    pointerEvents: isOpen ? `all` : `none`,
                    transition: `opacity 0.25s, transform 0.3s`,
                    opacity: isOpen ? `1` : `0`,
                    transform: isOpen ? `scale3d(1.0, 1.0, 1)` : `scale3d(0.95, 0.95, 1)`
                }}
            >
                <div
                    ref={scrollRef} style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    overflow: "scroll",
                    pointerEvents: isOpen ? `all` : `none`,
                    overscrollBehavior: "none"
                }}>
                    <div ref={childRef}>{children}</div>
                </div>
            </Sheet>
        </Background>)
}


const Background = styled.div`
    position: fixed;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 9040;
  
  left: 50%;
  transform: translate3d(-50%, 0, 0);
`

const Sheet = styled.div`
    width: calc(100% - 20px);
    max-height: calc(100% - 20px);
    position: absolute;
    border-radius: 10px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    background: rgba(0,0,0,0.6);
  backdrop-filter: blur(20px);
    z-index: 9041;
    max-width: 500px;
    margin: auto;

`