import styled from "styled-components";
import React from "react";
import ErrorIcon from "../../Icons/ErrorIcon";
import ApprovedIcon from "../../Icons/ApprovedIcon";
import QuestionIcon from "../../Icons/QuestionIcon";
import CenterSheet from "../Sheet/CenterSheet";
import PressableElement from "../PressableElement";
import AlignCenterContainer from "../AlignCenterContainer";

const Dialog = (
    {
        mainText = "",
        primaryButtonText = "확인",
        primaryButtonTextColor = "#fff",
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
    }) => {

    return (<>
        <CenterSheet
            isDismissible={false}
            isOpen={isVisible}
            setOpen={setVisible}
        >
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative"
            }}>
                <div style={{ textAlign: "center", margin: "12px 0 0 0" }}>
                    {showSuccessIcon &&
                        <ApprovedIcon width={34} height={34} fill={"#3b9600"}
                                      style={{ margin: "2px 0 3px 0" }} />}
                    {showFailIcon &&
                        <ErrorIcon width={34} height={34} fill={"#af0000"} style={{ margin: "2px 0 3px 0" }} />}
                    {showQuestionIcon &&
                        <QuestionIcon width={34} height={34} fill={"#f95700"} style={{ margin: "2px 0 3px 0" }} />}
                </div>
                <ModalMainText>
                    {mainText}
                </ModalMainText>
                <div style={{ display: "flex", alignItems: "stretch", borderTop: `1px solid #22222250` }}>
                    {!!secondaryButtonText &&
                        <>
                            <PressableElement
                                $borderEnabled={false}
                                $scaleEnabled={false}
                                height={null}
                                onClick={() => {
                                    secondaryButtonAction();
                                    finalAction()
                                }}>
                                <AlignCenterContainer height={"100%"}>
                                    <ModalButtonText text={secondaryButtonText} style={{ color: "#fff" }}>
                                        {secondaryButtonText}
                                    </ModalButtonText>
                                </AlignCenterContainer>
                            </PressableElement>
                            <div style={{borderRight: `1px solid #22222250`}}/>
                        </>
                    }
                    <PressableElement
                        $borderEnabled={false}
                        $scaleEnabled={false}
                        height={null}
                        onClick={() => {
                            primaryButtonAction();
                            finalAction()
                        }}>
                        <AlignCenterContainer height={"100%"}>
                            <ModalButtonText text={primaryButtonText} style={{ color: primaryButtonTextColor }}>
                                {primaryButtonText}
                            </ModalButtonText>
                        </AlignCenterContainer>
                    </PressableElement>
                </div>
            </div>
        </CenterSheet>
    </>);
};

const ModalButtonText = styled.p`
    font-weight: 600;
    font-size: 14px;
    margin: 6px;
    text-align: center;
    padding: 10px 0;

    ${({ text }) => text === "삭제" ? "color: #FF5757" : null}
    ${({ disabled, selected }) => (disabled && !selected) ? `background: #D9D9D9` : null}
`;
const ModalMainText = styled.p`
    padding: 8px 20px 20px 20px;
    font-weight: 500;
    font-size: 16px;
    margin: 0;
    text-align: center;
    color: #fff;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default Dialog;
