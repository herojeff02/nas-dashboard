import React from "react";
import {AnimatedSheet, Sheet} from "./StyledComponents";

const Slide = ({children, useSheet = true, animateSheet = false, isExpanded = false}) => {
    if (useSheet) {
        if (animateSheet) {
            return <div style={{height: "100%", width: "100%", display: "flex", alignItems: "center"}}>
                <AnimatedSheet isExpanded={isExpanded}>{children}</AnimatedSheet>
            </div>
        } else {
            return <div style={{height: "100%", width: "100%", display: "flex", alignItems: "center"}}>
                <Sheet isExpanded={isExpanded}>{children}</Sheet>
            </div>
        }
    } else {
        return <div style={{height: "100%", width: "100%"}}>
            {children}
        </div>
    }
}

export default Slide;

