import React, {useEffect, useState} from "react";
import ComponentLine, {STATUS} from "../components/MainPage/ComponentLine";
import Slide from "../components/Slide";
import ArrowLeft from "../Icons/ArrowLeft";
import {Background} from "../components/StyledComponents";
import AlignCenterContainer from "../components/AlignCenterContainer";
import styled from "styled-components";
import PressableElement from "../components/PressableElement";

export default function MainPage({nextPageAction = () => {}}) {
    const [isContainerLoaded, setContainerLoaded] = useState(false)

    useEffect(() => {
            setContainerLoaded(true)
    }, []);


    return (<Slide useSheet={false}>
        <Background style={{width: 275}}>
            <AlignCenterContainer width={"100%"} height={"100%"}>
                <ul style={{textAlign: "center", display: "flex", flexDirection: "column"}}>
                    <LiGap>
                        <ComponentLine title={"CPU"} status={STATUS.LOAD}/>
                    </LiGap>
                    <LiGap>
                        <ComponentLine title={"NET"} status={STATUS.IDLE}/>
                    </LiGap>
                    <LiGap>
                        <ComponentLine title={"SSD"} status={STATUS.IDLE}/>
                    </LiGap>
                    <LiGap>
                        <ComponentLine title={"HDD1"} status={STATUS.LOAD}/>
                    </LiGap>
                    <LiGap>
                        <ComponentLine title={"HDD2"} status={STATUS.LOAD}/>
                    </LiGap>
                </ul>
            </AlignCenterContainer>
        </Background>
        <div style={{
            position: "absolute",
            left: 275,
            top: 0,
            width: "calc(100% - 275px)",
            height: "100%",
            display: "flex",
            alignItems: "center"
        }}>
            <div style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                <div style={{marginLeft: 50,
                    transform:isContainerLoaded?"translateY(0)":"translateY(-50px)",
                    transition:"transform 0.4s ease"}}>
                    <span style={{
                        color: "#FFFFFF50",
                        fontWeight: "600",
                        fontSize: 18,
                        marginLeft: 4
                    }}>Highest CPU Usage</span>
                    <br/>
                    <span style={{color: "white", fontWeight: "600", fontSize: 50}}>containerd</span>
                </div>
                <div style={{
                    opacity:isContainerLoaded ? 1 : 0,
                    transform:isContainerLoaded ? "translateX(0)" : "translateX(50px)",
                    transition:"transform 0.3s ease, opacity 0.4s",
                transitionDelay:"0.3s"}}>
                <PressableElement
                    width={110}
                    height={110}
                    clickColor={"#00000000"}
                    borderEnabled={false}
                    onClick={nextPageAction}
                    borderRadius={20}
                >
                    <AlignCenterContainer>
                        <ArrowLeft style={{margin: 40, height: 30, width: 30}}/>
                    </AlignCenterContainer>
                </PressableElement></div>
            </div>
        </div>
    </Slide>)
}

const LiGap = styled.li`
  margin-top: 14px;
`