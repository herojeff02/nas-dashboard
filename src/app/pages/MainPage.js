import React from "react";
import ComponentLine, {STATUS} from "../components/MainPage/ComponentLine";
import Slide from "../components/Slide";
import ArrowLeft from "../components/Icons/ArrowLeft";
import {Background} from "../components/StyledComponents";
import AlignCenterContainer from "../components/AlignCenterContainer";
import styled from "styled-components";

export default function MainPage({
                                     nextPageAction = () => {
                                     }
                                 }) {
    return (
        <Slide useSheet={false}>
            <Background style={{width: 275}}>
                <AlignCenterContainer width={"100%"} height={"100%"}>
                    <ul style={{textAlign: "center", display: "flex", flexDirection: "column"}}>
                        <WhyGapNotSupported>
                            <ComponentLine title={"CPU"} status={STATUS.LOAD}/>
                        </WhyGapNotSupported>
                        <WhyGapNotSupported>
                            <ComponentLine title={"NET"} status={STATUS.IDLE}/>
                        </WhyGapNotSupported>
                        <WhyGapNotSupported>
                            <ComponentLine title={"SSD"} status={STATUS.IDLE}/>
                        </WhyGapNotSupported>
                        <WhyGapNotSupported>
                            <ComponentLine title={"HDD1"} status={STATUS.LOAD}/>
                        </WhyGapNotSupported>
                        <WhyGapNotSupported>
                            <ComponentLine title={"HDD2"} status={STATUS.LOAD}/>
                        </WhyGapNotSupported>
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
                    <div style={{marginLeft: 50}}>
                        <span style={{color: "#FFFFFF50", fontWeight: "600", fontSize: 18, marginLeft: 4}}>Highest CPU Usage</span>
                        <br/>
                        <span style={{color: "white", fontWeight: "600", fontSize: 50}}>containerd</span>
                    </div>
                    <AlignCenterContainer onClick={nextPageAction}>
                        <ArrowLeft style={{margin: 40, height: 30, width: 30}}/>
                    </AlignCenterContainer>
                </div>
            </div>
        </Slide>)
}

const WhyGapNotSupported = styled.li`
    margin-top: 14px;
    `