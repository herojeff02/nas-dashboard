import PressableElement from "../../PressableElement";
import AlignCenterContainer from "../../AlignCenterContainer";

export default function SheetListItem ({ onClick, children }) {
    return (<PressableElement
        borderEnabled={false}
        scaleEnabled={false}
        onClick={() => {
            !!onClick && onClick()
        }}>
        <div style={{ padding: "16px 16px 16px 18px", borderBottom: "1px solid #DDDDDDC0" }}>
            <AlignCenterContainer left={true}>
                {children}
            </AlignCenterContainer>
        </div>
    </PressableElement>)
}