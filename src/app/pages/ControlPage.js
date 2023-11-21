import {Background, RevealContainer} from "@/app/components/StyledComponents";
import AlignCenterContainer from "@/app/components/AlignCenterContainer";
import React, {useEffect, useState} from "react";
import Slide from "@/app/components/Slide";
import ComponentLine from "@/app/components/ControlPage/ComponentLine";
import {API} from "../api";
import Dialog from "../components/Dialog/Dialog";
import {ComponentLineShape} from "../components/ControlPage/ComponentLine";
import SupervisorIcon from "../Icons/SupervisorIcon";
import TorrentIcon from "../Icons/TorrentIcon";
import RefreshIcon from "../Icons/RefreshIcon";
import RebootIcon from "../Icons/RebootIcon";
import ShutdownIcon from "../Icons/ShutdownIcon";

export default function ControlPage({selected = false}) {
    const [isContainerLoaded, setContainerLoaded] = useState(false)
    const [isWaitingDialogOpen, setWaitingDialogOpen] = useState(false)
    const [waitingDialogText, setWaitingDialogText] = useState("")
    const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false)
    const [confirmationDialogText, setConfirmationDialogText] = useState("")
    const [confirmationDialogPrimaryFunc, setConfirmationDialogPrimaryFunc] = useState(()=>()=>{})
    const [isTransmissionDialogOpen, setTransmissionDialogOpen] = useState(false)
    const [isWaitingResponseDialogOpen, setWaitingResponseDialogOpen] = useState(false)
    const [isErrorDialogOpen, setErrorDialogOpen] = useState(false)

    const api = new API(4000);

    useEffect(() => {
        if (!selected) {
            setWaitingDialogOpen(false)
            setConfirmationDialogOpen(false)
            setTransmissionDialogOpen(false)
            setWaitingResponseDialogOpen(false)
            setErrorDialogOpen(false)
        }
    }, [selected])

    const wait = (func) => setTimeout(func, 6000)

    const shutdown = () => {
        setConfirmationDialogOpen(false)
        setWaitingDialogText("Shutting Down...")
        setWaitingResponseDialogOpen(true)
        api
            .get(api.AVAIL_ENDPOINT.power.shutdown)
            .then(() => {
                setWaitingDialogOpen(true)
                wait(()=> setWaitingDialogOpen(false))
                setWaitingResponseDialogOpen(false)
            })
            .catch((e) => {
                console.log(e)
                setWaitingDialogOpen(true)
                wait(()=> setWaitingDialogOpen(false))
                setWaitingResponseDialogOpen(false)
            })
    }
    const shutdownConfirmation = () => {
        setConfirmationDialogText("Shutdown?")
        setConfirmationDialogPrimaryFunc(() => shutdown)
        setConfirmationDialogOpen(true)
    }
    const reboot = () => {
        setConfirmationDialogOpen(false)
        setWaitingDialogText("Rebooting...")
        setWaitingResponseDialogOpen(true)
        api
            .get(api.AVAIL_ENDPOINT.power.reboot)
            .then(() => {
                setWaitingDialogOpen(true)
                wait(()=>setWaitingDialogOpen(false))
                setWaitingResponseDialogOpen(false)
            })
            .catch((e) => {
                console.log(e)
                setWaitingDialogOpen(true)
                wait(()=>setWaitingDialogOpen(false))
                setWaitingResponseDialogOpen(false)
            })
    }
    const rebootConfirmation = () =>{
        setConfirmationDialogText("Reboot?")
        setConfirmationDialogPrimaryFunc(() => reboot)
        setConfirmationDialogOpen(true)
    }
    const refresh = () =>{
        setContainerLoaded(true)
        setTimeout(() => {
            location.reload()
        }, 500)
    }
    const r_supervisor = () => {
        setWaitingResponseDialogOpen(true)
        api
            .get(api.AVAIL_ENDPOINT.service.supervisor)
            .then(() => {
                setWaitingResponseDialogOpen(false)
            })
            .catch((e) => {
                console.log(e)
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
                    <div style={{position:"absolute", left:"calc(50% + 10px)", top:"50%", transform:"translate(-50%, calc(-50% - 40px))"}}>
                        <ComponentLine action={refresh} width={165} shape={ComponentLineShape.pill} icon={<RefreshIcon width={"38px"} height={"40px"} style={{transform:"translateX(-2px)"}}/>} title={"refresh"}/>
                        <ComponentLine action={r_supervisor} width={270} shape={ComponentLineShape.pill} icon={<SupervisorIcon width={"34px"} height={"40px"}/>} title={"restart supervisor"}/>
                        <ComponentLine action={r_transmission} width={290} shape={ComponentLineShape.pill} icon={<TorrentIcon width={"35px"} height={"38px"}/>} title={"restart transmission"}/>
                    </div>
                    <div style={{position:"absolute", left:"50%", bottom:"40px", transform:"translate(-50%, 0)"}}>
                        <AlignCenterContainer width={"100%"}>
                            <ComponentLine action={shutdownConfirmation} shape={ComponentLineShape.circle} icon={<ShutdownIcon width={"100%"} height={"100%"}/>} title={""}/>
                            <ComponentLine action={rebootConfirmation} shape={ComponentLineShape.circle} icon={<RebootIcon width={"100%"} height={"100%"}/>} title={""}/>
                        </AlignCenterContainer>
                    </div>
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
                isVisible={isWaitingDialogOpen}
                mainText={waitingDialogText}/>

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

            <Dialog
                showQuestionIcon={true}
                setVisible={setConfirmationDialogOpen}
                isVisible={isConfirmationDialogOpen}
                mainText={confirmationDialogText}
                primaryButtonText={"Confirm"}
                primaryButtonAction={confirmationDialogPrimaryFunc}
                secondaryButtonText={"Cancel"}
                secondaryButtonAction={() => setConfirmationDialogOpen(false)}/>
        </Slide>)
}