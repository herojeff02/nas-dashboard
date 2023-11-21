import styled from "styled-components";
import React from "react";
import ErrorIcon from "../../Icons/ErrorIcon";
import ApprovedIcon from "../../Icons/ApprovedIcon";
import QuestionIcon from "../../Icons/QuestionIcon";
import BottomSheet from "../Sheet/BottomSheet";
import PressableElement from "../PressableElement";
import AlignCenterContainer from "../AlignCenterContainer";
import Loading from "react-loading";

const Dialog = (
    {
        mainText = "",
        primaryButtonText = undefined,
        primaryButtonTextColor = "#000",
        secondaryButtonText = undefined,
        isVisible = false,
        setVisible = _ => {
        },
        primaryButtonAction = () => {
        },
        secondaryButtonAction = () => {
        },
        finalAction = () => {
        },
        showSuccessIcon = false,
        showFailIcon = false,
        showQuestionIcon = false,
        showLoadingIcon = false,
    }) => {

    return (<>
        <BottomSheet
            isDismissible={false}
            isOpen={isVisible}
            setOpen={setVisible}
            preferredWidth={"400px"}
        >
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                alignItems:"center"
            }}>
                <div style={{textAlign: "center", margin: "30px 0 12px 0", height:"34px", width:"34px"}}>
                    {showSuccessIcon &&
                        <ApprovedIcon width={34} height={34} fill={"#3b9600"}/>}
                    {showFailIcon &&
                        <ErrorIcon width={34} height={34} fill={"#af0000"}/>}
                    {showQuestionIcon &&
                        <QuestionIcon width={34} height={34} fill={"#f95700"}/>}
                    {showLoadingIcon &&
                        <Loading type={"spin"} width={34} height={34} color={"#af0000"}/>}
                </div>
                <ModalMainText>
                    {mainText}
                </ModalMainText>
                <div style={{display: "flex", alignItems: "stretch", borderTop: `1px solid #22222210`, width:"100%"}}>
                    {!!secondaryButtonText &&
                        <>
                            <PressableElement
                                borderEnabled={false}
                                scaleEnabled={false}
                                height={null}
                                onClick={() => {
                                    secondaryButtonAction();
                                    finalAction()
                                }}>
                                <AlignCenterContainer height={"100%"}>
                                    <ModalButtonText text={secondaryButtonText} style={{color: "#000"}}>
                                        {secondaryButtonText}
                                    </ModalButtonText>
                                </AlignCenterContainer>
                            </PressableElement>
                            <div style={{borderRight: `1px solid #22222210`}}/>
                        </>
                    }
                    {!!primaryButtonText &&
                        <PressableElement
                            borderEnabled={false}
                            scaleEnabled={false}
                            clickColor={"#EEE"}
                            height={null}
                            onClick={() => {
                                primaryButtonAction();
                                finalAction()
                            }}>
                            <AlignCenterContainer height={"100%"}>
                                <ModalButtonText text={primaryButtonText} style={{color: primaryButtonTextColor}}>
                                    {primaryButtonText}
                                </ModalButtonText>
                            </AlignCenterContainer>
                        </PressableElement>
                    }
                </div>
            </div>
        </BottomSheet>
    </>);
};

const ModalButtonText = styled.p`
  font-weight: 600;
  font-size: 14px;
  margin: 6px;
  text-align: center;
  padding: 10px 0;

  ${({text}) => text === "삭제" ? "color: #FF5757" : null}
  ${({disabled, selected}) => (disabled && !selected) ? `background: #D9D9D9` : null}
`;
const ModalMainText = styled.p`
  padding: 5px 20px 35px 20px;
  font-weight: 500;
  font-size: 16px;
  margin: 0;
  text-align: center;
  color: #000;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Dialog;
