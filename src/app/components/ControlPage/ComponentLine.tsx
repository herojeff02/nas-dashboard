import PressableElement from "@/app/components/PressableElement";
import React from "react";

export const ComponentLineShape = {
    "circle" : 1,
    "pill" : 2,
}

export default function ComponentLine(
    {
        title = "",
        action = () => {},
        shape = ComponentLineShape.circle
    }) {
    switch (shape) {
        case ComponentLineShape.circle:
            return (
                <PressableElement
                    onClick={action}
                    clickColor={"#00000066"}
                    borderEnabled={false}
                    scaleEnabled={false}
                    width={"100px"}
                    height={"100px"}
                >
                    <div style={{fontSize: 20, height:"100%", width: "100%", padding: "15px 0 14px 7px"}}>
                        {title}
                    </div>
                </PressableElement>
            )
    }
}