import styled from "styled-components";

export const Background = styled.div`
  background: var(--wall-background);
  color: var(--wall-text);
  width: 100%;
  height: 100%;
`

export const AnimatedSheet = styled.div`
  position: absolute;
  transform: ${({isExpanded}) => isExpanded ? "translate3d(30px, -25px, 0)" : "translate3d(0, -2px, 0)"};
  height: ${({isExpanded}) => isExpanded ? "calc(100% - 110px)" : "150px"};
  width: ${({isExpanded}) => isExpanded ? "calc(100% - 60px)" : "calc(100% + 60px)"};
  background: var(--tile-background);
  color: var(--tile-text);
  overflow: hidden;
  overflow-y: scroll;
  border-radius: ${({isExpanded}) => isExpanded ? "0" : "100px"};
    // border-radius: ${({isExpanded}) => isExpanded ? "20px" : "100px"};
  // box-shadow: 0 0 26px rgba(0,0,0,0.3);
  transition: transform 0.5s ease, height 0.3s ease, width 0.5s ease;
`
export const Sheet = styled.div`
  position: absolute;
  transform: translate3d(30px, -25px, 0);
  height: calc(100% - 110px);
  width: calc(100% - 60px);
  background: var(--tile-background);
  color: var(--tile-text);
  overflow: hidden;
  overflow-y: scroll;
  border-radius: 0;
`