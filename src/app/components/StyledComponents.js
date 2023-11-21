import styled from "styled-components";

export const RevealContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  opacity: ${({reveal}) => reveal ? 1 : 0};
  pointer-events: ${({reveal}) => reveal ? "auto" : "none"};
  transition: opacity 0.5s;
`

export const Background = styled.div`
  background: var(--wall-background);
  color: var(--wall-text);
  width: 100%;
  height: 100%;
`

export const AnimatedSheet = styled.div`
  position: absolute;
  transform: ${({isExpanded}) => isExpanded ? "translate3d(20px, -2px, 0)" : "translate3d(0, -2px, 0)"};
  height: ${({isExpanded}) => isExpanded ? "calc(100% - 40px)" : "150px"};
  width: ${({isExpanded}) => isExpanded ? "calc(100% - 40px)" : "calc(100% + 80px)"};
  background: var(--tile-background);
  color: var(--tile-text);
  overflow: hidden;
  overflow-y: scroll;
  border-radius: ${({isExpanded}) => isExpanded ? "20px" : "100px"};
  transition: transform 0.6s ease, height 0.4s ease, width 0.6s ease;
`
export const Sheet = styled.div`
  position: absolute;
  transform: translate3d(20px, -2px, 0);
  border-radius: 20px;
  height: calc(100% - 40px);
  width: calc(100% - 40px);
  background: var(--tile-background);
  color: var(--tile-text);
  overflow: hidden;
  overflow-y: scroll;
`