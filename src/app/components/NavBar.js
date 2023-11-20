import PageDots from "./PageDots";
import React from "react";

export default function NavBar(
    {
        isExpanded = false,
        prevPage = () => {},
        nextPage = () => {},
        totalPages = 1,
        currentPage = 0
    }
) {
    return <div style={{
        position: "absolute",
        bottom: 0,
        transform: isExpanded ? "scale3d(1.0,1.0,1.0)" : "scale3d(0.9,0.9,0.9)",
        opacity: isExpanded ? 1 : 0,
        pointerEvents: isExpanded ? "all" : "none",
        left: 0,
        width: "100%",
        height: 80,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        transition: "transform 0.4s ease, opacity 0.3s ease",
        zIndex: 1
    }}>
        <PageDots
            style={{textAlign: "left", height: "100%", paddingLeft: 60, width: "calc(50% - 150px)"}}
            onClick={prevPage} dots={currentPage - 2}/>
        <span style={{
            width: "300px", textAlign: "center", color: "white",
            textShadow: "0 1px 30px rgba(0,0,0,0.6)"
        }}>Uptime : ?? days, 20 hours</span>
        <PageDots
            style={{textAlign: "right", height: "100%", paddingRight: 60, width: "calc(50% - 150px)"}}
            onClick={nextPage} dots={totalPages - currentPage} gravity={"right"}/>
    </div>
}