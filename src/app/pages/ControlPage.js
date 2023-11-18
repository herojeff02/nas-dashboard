import {Background, RevealContainer} from "@/app/components/StyledComponents";
import AlignCenterContainer from "@/app/components/AlignCenterContainer";
import React, {useState} from "react";
import Slide from "@/app/components/Slide";
import ComponentLine from "@/app/components/ControlPage/ComponentLine";
import Dialog from "../components/Dialog/Dialog";

export default function ControlPage() {
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
            <Background style={{position: "absolute", left: 0, top: 0}}>
                <RevealContainer loaded={!isContainerLoaded}>
                    <AlignCenterContainer width={"100%"} height={"100%"}>
                        <div style={{display: "flex", flexDirection: "column", width: "45%", minWidth: 300}}>
                            <div style={{paddingTop: 50}}/>
                            <ComponentLine title={"shutdown"} action={() => {}}/>
                            <ComponentLine title={"reboot"} action={() => {}}/>
                            <div style={{paddingTop: 70}}/>
                            <ComponentLine title={"refresh"} action={() => {
                                setContainerLoaded(true)
                                setTimeout(() => {
                                    location.reload()
                                }, 500)
                            }}/>
                            <ComponentLine title={"restart supervisor"} action={() => {}}/>
                            <ComponentLine title={"restart transmission"} action={() => {}}/>
                        </div>
                    </AlignCenterContainer>
                </RevealContainer>
            </Background>
        </Slide>)
}