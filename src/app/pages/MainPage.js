import React, {useEffect, useState} from "react";
import ComponentLine, {STATUS} from "../components/MainPage/ComponentLine";
import Slide from "../components/Slide";
import ArrowLeft from "../Icons/ArrowLeftIcon";
import {Background} from "../components/StyledComponents";
import AlignCenterContainer from "../components/AlignCenterContainer";
import styled from "styled-components";
import PressableElement from "../components/PressableElement";
import {API} from "../api";

export default function MainPage({nextPageAction = () => {}, prometheus = {}, isContainerLoaded}) {
    const [highPerfTask, setHighPerfTask] = useState("containerd")
    const [isReconnecting, setReconnecting] = useState(false)

    useEffect(() => {
        const api = new API(1500)
        setTimeout(()=>setReconnecting(true),300)
        setInterval(() => {
            api
                .get(api.AVAIL_ENDPOINT.service.top)
                .then((response) => {
                    console.log(response)
                    setReconnecting(false)
                })
                .catch(()=>{
                    setReconnecting(true)
                })
        }, 2000)
    }, [])


    return (<Slide useSheet={false}>
        <Background style={{
            transform: isContainerLoaded ? "translate3d(0,0,0)" : "translate3d(-100px,0,0)",
            transition: "transform 0.3s ease",
            width: 175}}>
            <AlignCenterContainer width={"100%"} height={"100%"}>
                <ul style={{
                    transform: isContainerLoaded ? "translate3d(0,0,0)" : "translate3d(-30px,0,0)",
                    transition: "transform 0.35s ease, opacity 0.4s",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    opacity: isContainerLoaded ? 1 : 0,
                    transitionDelay: "0.25s"
                }}>
                    <LiGap>
                        <ComponentLine title={"CPU"} status={prometheus.cpu?.util > 80 ? STATUS.WARN : STATUS.LOAD}/>
                    </LiGap>
                    <LiGap>
                        <ComponentLine title={"RAM"} status={prometheus.mem?.left < 2 ? STATUS.WARN : STATUS.LOAD}/>
                    </LiGap>
                    <LiGap>
                        <ComponentLine title={"NET"} status={isReconnecting ? STATUS.ERR : STATUS.LOAD}/>
                    </LiGap>
                    <LiGap>
                        <ComponentLine title={"SSD"} status={
                            prometheus.nvme0n1?.smartprom_media_errors > 0 || prometheus.nvme0n1?.smartprom_critical_warning > 0 || prometheus.nvme0n1?.smartprom_percentage_used > 10 || prometheus.nvme0n1?.smartprom_available_spare < 90 || prometheus.nvme0n1?.smartprom_temperature > 60
                                ? STATUS.ERR : STATUS.LOAD
                        }/>
                    </LiGap>
                    <LiGap>
                        <ComponentLine title={"HDD1"} status={
                            prometheus.sda?.smartprom_current_pending_sector_raw > 0 || prometheus.sda?.smartprom_offline_uncorrectable_raw > 0 ||prometheus.sda?.smartprom_raw_read_error_rate_raw > 0 ||prometheus.sda?.smartprom_spin_retry_count_raw > 0 ||prometheus.sda?.smartprom_temperature_celsius_raw > 60 ||prometheus.sda?.smartprom_seek_error_rate_raw > 0 ||prometheus.sda?.smartprom_reallocated_sector_ct_raw > 0 ||prometheus.sda?.smartprom_reallocated_event_count_raw > 0
                                ? STATUS.ERR : STATUS.LOAD
                        }/>
                    </LiGap>
                    <LiGap>
                        <ComponentLine title={"HDD2"} status={
                            prometheus.sdb?.smartprom_current_pending_sector_raw > 0 || prometheus.sdb?.smartprom_offline_uncorrectable_raw > 0 ||prometheus.sdb?.smartprom_raw_read_error_rate_raw > 0 ||prometheus.sdb?.smartprom_spin_retry_count_raw > 0 ||prometheus.sdb?.smartprom_temperature_celsius_raw > 60 ||prometheus.sdb?.smartprom_seek_error_rate_raw > 0 ||prometheus.sdb?.smartprom_reallocated_sector_ct_raw > 0 ||prometheus.sdb?.smartprom_reallocated_event_count_raw > 0
                                ? STATUS.ERR : STATUS.LOAD
                        }/>
                    </LiGap>
                </ul>
            </AlignCenterContainer>
        </Background>
        <div style={{
            position: "absolute",
            left: 175,
            top: 0,
            width: "calc(100% - 175px)",
            height: "100%",
            display: "flex",
            alignItems: "center"
        }}>
            <div style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                <div style={{
                    marginLeft: 50,
                    marginTop: 14,
                    transform: isContainerLoaded ? "translate3d(0,0,0)" : "translate3d(-60px,0,0)",
                    transition: "transform 0.4s ease, opacity 0.4s",
                    opacity: isContainerLoaded ? 1 : 0,
                    transitionDelay: "0.3s",
                    // textShadow: "0 1px 80px rgba(0,0,0,0.6)" //slows down animation massively - replaced with div
                }}>
                    <span style={{
                        color: "white",
                        opacity: 0.6,
                        fontWeight: "600",
                        fontSize: 18,
                        marginLeft: 4
                    }}>Highest CPU Usage</span>
                    <br/>
                    <span style={{color: "white", fontWeight: "600", fontSize: 50}}>{highPerfTask}</span>
                    <div style={{
                        position: "absolute",
                        bottom: 0,
                        transform: "translate3d(0, -23px, 0)",
                        background: "black",
                        filter: "blur(10px)",
                        opacity: 0.15,
                        width: "100%",
                        height: "40px",
                        zIndex: -1
                    }}/>
                </div>
                <div style={{
                    opacity: isContainerLoaded ? 1 : 0,
                    transform: isContainerLoaded ? "translate3d(0,0,0)" : "translate3d(50px,0,0)",
                    transition: "transform 0.3s ease, opacity 0.4s",
                    transitionDelay: "0.5s"
                }}>
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
                    </PressableElement>
                </div>
            </div>
        </div>
    </Slide>)
}

const LiGap = styled.li`
  margin-top: 14px;
`