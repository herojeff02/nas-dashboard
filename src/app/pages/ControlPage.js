import {Background, RevealContainer} from "@/app/components/StyledComponents";
import AlignCenterContainer from "@/app/components/AlignCenterContainer";
import React, {useState} from "react";
import Slide from "@/app/components/Slide";
import ComponentLine from "@/app/components/ControlPage/ComponentLine";
import axios from "axios";

export default function ControlPage({selected = false}) {

    const SERVER = "http://1.2.3.2:55255/"
    const shutdown = ()=>{
        axios.get(SERVER + "power/shutdown")
    }
    const reboot = ()=>{
        axios.get(SERVER + "power/reboot")
    }
    const r_supervisor = ()=>{
        axios.get(SERVER + "service/supervisor")
    }
    const r_transmission = ()=>{
        axios.get(SERVER + "service/transmission")
    }

    const [isContainerLoaded, setContainerLoaded] = useState(false)
    return (
        <Slide useSheet={false}>
            <RevealContainer loaded={isContainerLoaded}>
                <div style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    background: "black",
                    width: "100%",
                    height: "100%"
                }}/>
            </RevealContainer>
            <Background style={{
                position: "absolute",
                left: 0,
                top: 0,
                // backdropFilter:selected ? "grayscale(1) contrast(120%) brightness(1)":"grayscale(0) contrast(100%) brightness(1)",
                // webkitBackdropFilter:selected ? "grayscale(1) contrast(120%) brightness(1)":"grayscale(0) contrast(100%) brightness(1)",
                // transition: "backdrop-filter 5s steps(12), -webkit-backdrop-filter 5s steps(12)"
            }}>
                <RevealContainer loaded={!isContainerLoaded}>
                    <AlignCenterContainer width={"100%"} height={"100%"}>
                        <div style={{display: "flex", flexDirection: "column", width: "45%", minWidth: 300}}>
                            <div style={{paddingTop: 50}}/>
                            <ComponentLine title={"shutdown"} action={shutdown}/>
                            <ComponentLine title={"reboot"} action={reboot}/>
                            <div style={{paddingTop: 70}}/>
                            <ComponentLine title={"refresh"} action={() => {
                                setContainerLoaded(true)
                                setTimeout(() => {
                                    location.reload()
                                }, 500)
                            }}/>
                            <ComponentLine title={"restart supervisor"} action={r_supervisor}/>
                            <ComponentLine title={"restart transmission"} action={r_transmission}/>
                        </div>
                    </AlignCenterContainer>
                </RevealContainer>
            </Background>
        </Slide>)
}