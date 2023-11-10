import React from "react";

const AlignCenterContainer = ({children, left = false, right = false, width, height, ...props}) => {
    let justifyContent = "center";
    if (left) {
        justifyContent = "left";
    } else if (right) {
        justifyContent = "right";
    }
    return (
        <div
            style={{
                width: width,
                height: height,
                display: "flex",
                justifyContent: justifyContent,
                alignItems: "center",

            }}
            {...props}
        >
            {children}
        </div>)
};


export default AlignCenterContainer;
