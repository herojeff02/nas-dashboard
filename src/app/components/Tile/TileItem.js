import styled from "styled-components";
import React from "react";
import ErrorIcon from "../../Icons/ErrorIcon";
import ApprovedIcon from "../../Icons/ApprovedIcon";
import QuestionIcon from "../../Icons/QuestionIcon";
import BottomSheet from "../Sheet/BottomSheet";
import PressableElement from "../PressableElement";
import AlignCenterContainer from "../AlignCenterContainer";
import Loading from "react-loading";

const TileItem = (
    {
        title = "Tile Title",
        children = null,
        text = ""
    }) => {

    return (
        <div style={{
            background: "white",
            boxShadow: "1px 1px 20px rgba(0,0,0,0.1)",
            margin: 14,
            borderRadius: 8
        }}>
            <TileTitleText>
                {title}
            </TileTitleText>
            {children && <ChildrenContainer>
                {children}
            </ChildrenContainer>}
            {text && <ChildrenContainer>
                {text}
            </ChildrenContainer>}
        </div>
    );
};
const TileTitleText = styled.p`
    margin: 15px 20px 15px 20px;
    font-size: 18px;
    font-weight: 600;
    color: #000;
`;
const ChildrenContainer = styled.div`
    margin: 0 22px 25px 22px;
    height: 100%;
`;

export default TileItem;
