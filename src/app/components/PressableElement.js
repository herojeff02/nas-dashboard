import styled from "styled-components";
import {useEffect, useRef, useState} from "react";

const TRANSPARENT_COLOR = "#00000000"
const isMobile = true
const PressableElement = (
    {
        children = <></>,
        idleColor = TRANSPARENT_COLOR,
        hoverColor = "#00000006",
        clickColor = "#00000010",
        borderColor = "#ddddddC0",
        borderEnabled = true,
        borderRadius = "0px" || 0,
        scaleEnabled = true,
        backgroundEnabled = true,
        cursor = "pointer",
        onClick,
        width = "100%" || 0,
        height = "100%" || 0,
        coverMode = false,
        className = "",
    }) => {

    const containerRef = useRef()
    const [pressedDownScale, setPressedDownScale] = useState(1)

    useEffect(() => {
        if (!scaleEnabled) {
            setPressedDownScale(1)
        } else if (containerRef.current?.offsetWidth < 100 && containerRef.current?.offsetHeight < 100) {
            setPressedDownScale(0.8)
        } else if (containerRef.current?.offsetWidth < 300 && containerRef.current?.offsetHeight < 300) {
            setPressedDownScale(0.9)
        } else {
            setPressedDownScale(0.95)
        }
    }, [scaleEnabled, containerRef])


    return (<Container
        ref={containerRef}
        onClick={onClick}
        onContextMenu={() => {
            return false;
        }}
        isMobile={isMobile}
        idleColor={idleColor}
        hoverColor={hoverColor}
        clickColor={clickColor}
        borderColor={borderColor}
        borderEnabled={borderEnabled}
        backgroundEnabled={backgroundEnabled}
        pressedDownScale={pressedDownScale}
        cursor={cursor}
        className={className}

        style={{
            height: height,
            width: width,
            borderRadius: borderRadius,
        }}
    >
        {children}
        {coverMode && <Container
            isMobile={isMobile}
            idleColor={idleColor}
            hoverColor={hoverColor}
            clickColor={clickColor}
            borderEnabled={false}
            backgroundEnabled={backgroundEnabled}
            pressedDownScale={1}
            cursor={cursor}

            style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: "100%",
                borderRadius: borderRadius,
            }}
        />}
    </Container>);
}

const Container = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  overflow: hidden;
  cursor: ${({cursor, backgroundEnabled}) => backgroundEnabled ? cursor : "default"};

  background: ${({idleColor, backgroundEnabled}) => backgroundEnabled ? idleColor : TRANSPARENT_COLOR};
  transform: scale3d(1, 1, 1);
  box-shadow: 0 0 0 1px ${({
                             borderEnabled,
                             borderColor
                           }) => borderEnabled ? borderColor : TRANSPARENT_COLOR} inset;
  transition: background-color 0.25s, box-shadow 0.25s, transform 0.3s;

  :hover {
    background: ${({idleColor, hoverColor, isMobile, backgroundEnabled}) => {
      if (backgroundEnabled) {
        if (isMobile) {
          return idleColor
        } else {
          return hoverColor
        }
      } else {
        return TRANSPARENT_COLOR
      }
    }};
    box-shadow: 0 0 0 1px ${({borderEnabled, hoverColor, borderColor, isMobile, backgroundEnabled}) => {
      if (backgroundEnabled) {
        if (borderEnabled) {
          return borderColor
        } else if (isMobile) {
          return TRANSPARENT_COLOR
        } else {
          return hoverColor
        }
      } else {
        return TRANSPARENT_COLOR
      }
    }} inset;
    transform: scale3d(1, 1, 1);
    transition: background-color 0.1s, box-shadow 0.1s, transform 0.2s;
  }

  :active {
    background: ${({clickColor, backgroundEnabled}) => backgroundEnabled ? clickColor : TRANSPARENT_COLOR};
    transform: scale3d(${({pressedDownScale}) => pressedDownScale}, ${({pressedDownScale}) => pressedDownScale}, 1);
    box-shadow: 0 0 0 1px ${({
                               borderEnabled,
                               borderColor,
                               backgroundEnabled
                             }) => (backgroundEnabled && borderEnabled) ? borderColor : TRANSPARENT_COLOR} inset;
    transition: background-color 0.15s, box-shadow 0.15s, transform 0.17s;
  }

`


export default PressableElement;
