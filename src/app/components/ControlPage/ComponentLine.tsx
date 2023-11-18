import PressableElement from "@/app/components/PressableElement";
import React from "react";

export default function ComponentLine(
    {
        title = "",
        action = () => {
        }
    }) {
    return (
        <PressableElement
            onClick={action}
            clickColor={"#00000066"}
            borderEnabled={false}
            scaleEnabled={false}
            >
            <div style={{fontSize: 20, width: "100%", padding: "15px 0 14px 7px", marginTop: -1, border: "solid #707070", borderWidth: "1px 0"}}>
                {title}
            </div>
        </PressableElement>
    )
}