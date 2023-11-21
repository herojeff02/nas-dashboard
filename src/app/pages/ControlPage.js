import {Background, RevealContainer} from "@/app/components/StyledComponents";
import AlignCenterContainer from "@/app/components/AlignCenterContainer";
import React, {useEffect, useState} from "react";
import Slide from "@/app/components/Slide";
import ComponentLine from "@/app/components/ControlPage/ComponentLine";
import {API} from "../api";
import Dialog from "../components/Dialog/Dialog";
import {ComponentLineShape} from "../components/ControlPage/ComponentLine";

export default function ControlPage({selected = false}) {
    const [isContainerLoaded, setContainerLoaded] = useState(false)
    const [isShutdownDialogOpen, setShutdownDialogOpen] = useState(false)
    const [isRebootDialogOpen, setRebootDialogOpen] = useState(false)
    const [isTransmissionDialogOpen, setTransmissionDialogOpen] = useState(false)
    const [isWaitingResponseDialogOpen, setWaitingResponseDialogOpen] = useState(false)
    const [isErrorDialogOpen, setErrorDialogOpen] = useState(false)
    const api = new API(4000);

    useEffect(() => {
        if (!selected) {
            setShutdownDialogOpen(false)
            setRebootDialogOpen(false)
            setTransmissionDialogOpen(false)
            setWaitingResponseDialogOpen(false)
            setErrorDialogOpen(false)
        }
    }, [selected])

    const wait = (func) => setTimeout(func, 6000)

    const shutdown = () => {
        setWaitingResponseDialogOpen(true)
        api
            .get(api.AVAIL_ENDPOINT.power.shutdown)
            .then(() => {
                setShutdownDialogOpen(true)
                wait(()=> setShutdownDialogOpen(false))
                setWaitingResponseDialogOpen(false)
            })
            .catch(() => {
                setShutdownDialogOpen(true)
                wait(()=> setShutdownDialogOpen(false))
                setWaitingResponseDialogOpen(false)
            })
    }
    const reboot = () => {
        setWaitingResponseDialogOpen(true)
        api
            .get(api.AVAIL_ENDPOINT.power.reboot)
            .then(() => {
                setRebootDialogOpen(true)
                wait(()=>setRebootDialogOpen(false))
                setWaitingResponseDialogOpen(false)
            })
            .catch(() => {
                setRebootDialogOpen(true)
                wait(()=>setRebootDialogOpen(false))
                setWaitingResponseDialogOpen(false)
            })
    }
    const r_supervisor = () => {
        setWaitingResponseDialogOpen(true)
        api
            .get(api.AVAIL_ENDPOINT.service.supervisor)
            .then(() => {
                setWaitingResponseDialogOpen(false)
            })
            .catch(() => {
                setWaitingResponseDialogOpen(false)
            })
    }
    const r_transmission = () => {
        setWaitingResponseDialogOpen(true)
        api
            .get(api.AVAIL_ENDPOINT.service.transmission)
            .then(() => {
                setTransmissionDialogOpen(true)
                wait(()=>setTransmissionDialogOpen(false))
                setWaitingResponseDialogOpen(false)
            })
            .catch((e) => {
                console.log(e)
                setErrorDialogOpen(true)
                wait(()=>setErrorDialogOpen(false))
                setWaitingResponseDialogOpen(false)
            })
    }

    return (
        <Slide useSheet={false}>
            <RevealContainer reveal={isContainerLoaded}>
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
                <RevealContainer reveal={!isContainerLoaded}>
                    <AlignCenterContainer width={"100%"} height={"100%"}>
                        <div style={{display: "flex", flexDirection: "column", width: "45%", minWidth: 300}}>
                            <div style={{paddingTop: 50}}/>
                            <ComponentLine title={"shutdown"} action={shutdown} shape={ComponentLineShape.circle}/>
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
            <Dialog
                showSuccessIcon={true}
                setVisible={setTransmissionDialogOpen}
                isVisible={isTransmissionDialogOpen}
                mainText={"Restarting Transmission"}
                primaryButtonText={"Confirm"}
                primaryButtonAction={() => setTransmissionDialogOpen(false)}/>
            <Dialog
                showSuccessIcon={true}
                isVisible={isRebootDialogOpen}
                mainText={"Rebooting..."}/>
            <Dialog
                showSuccessIcon={true}
                isVisible={isShutdownDialogOpen}
                mainText={"Shutting Down..."}/>

            <Dialog
                showLoadingIcon={true}
                isVisible={isWaitingResponseDialogOpen}
                mainText={"Connecting..."}/>
            <Dialog
                showFailIcon={true}
                setVisible={setErrorDialogOpen}
                isVisible={isErrorDialogOpen}
                mainText={"Failed"}
                primaryButtonText={"Confirm"}
                primaryButtonAction={() => setErrorDialogOpen(false)}/>
        </Slide>)
}