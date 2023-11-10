import {Background} from "@/app/components/StyledComponents";
import AlignCenterContainer from "@/app/components/AlignCenterContainer";
import React from "react";
import Slide from "@/app/components/Slide";
import ComponentLine from "@/app/components/ControlPage/ComponentLine";

export default function ControlPage() {
    return (
        <Slide useSheet={false}>
            <Background>
                <AlignCenterContainer width={"100%"} height={"100%"}>
                    <div style={{display: "flex", flexDirection:"column", width:"45%", minWidth:300}}>
                        <div style={{paddingTop:50}}/>
                        <ComponentLine title={"shutdown"}/>
                        <ComponentLine title={"reboot"}/>
                        <div style={{paddingTop:70}}/>
                        <ComponentLine title={"refresh"} action={()=>{location.reload()}}/>
                        <ComponentLine title={"restart supervisor"}/>
                        <ComponentLine title={"restart transmission"}/>
                    </div>
                </AlignCenterContainer>
            </Background>
        </Slide>)
}