import PressableElement from "@/app/components/PressableElement";
import React from "react";
import AlignCenterContainer from "@/app/components/AlignCenterContainer";

export const ComponentLineShape = {
    "circle": 1,
    "pill": 2,
}

export default function ComponentLine(
    {
        action = () => {},
        icon = <></>,
        title = "",
        width = 90,
        shape = ComponentLineShape.circle
    }) {
    switch (shape) {
        case ComponentLineShape.circle:
            return (
                <span style={{padding: "0 20px"}}>
                    <PressableElement
                        onClick={action}
                        borderEnabled={false}
                        scaleEnabled={false}
                        height={"90px"}
                        width={"90px"}
                        idleColor={"white"}
                        clickColor={"#EEE"}
                        borderRadius={"100px"}
                    >
                        <div
                            style={{color: "black", fontSize: 20, height: "100%", width: "100%", padding: "20px"}}>
                            <AlignCenterContainer height={"100%"} width={"100%"}>
                                {icon}
                            </AlignCenterContainer>
                        </div>
                    </PressableElement>
                </span>
            )
        case ComponentLineShape.pill:
            return (
                <span style={{padding: "10px"}}>
                    <PressableElement
                        onClick={action}
                        borderEnabled={false}
                        scaleEnabled={false}
                        width={width + "px"}
                        height={"60px"}
                        idleColor={"#FFF"}
                        clickColor={"#DDD"}
                        borderRadius={"100px"}
                    >
                        <div style={{color: "black", fontSize: 20, height: "100%", width: "100%", padding: "10px 0 9px 7px"}}>
                            <AlignCenterContainer height={"100%"} width={"100%"} left={true}>
                                <span style={{width:"42px", height:"40px", margin:"0 10px 0 14px"}}>{icon}</span>
                                <span style={{fontSize:20, fontWeight:500}}>{title}</span>
                            </AlignCenterContainer>
                        </div>
                    </PressableElement>
                </span>
            )
    }
}