import Dot from "./Icons/Dot";

export default function PageDots({onClick, dots, gravity, ...props}) {
    if (dots > 0 && !isNaN(dots)) {
        return <div onClick={onClick} {...props}>
            <div style={{height: "100%", display: "inline-flex", alignItems: "center"}}>
                {[...Array(dots)].map((value, index) => <Dot fill={"#FFFFFF80"} width={8} height={8} key={index}
                                                             style={{margin: 6}}>ø</Dot>)}
            </div>
        </div>
    } else {
        return <div {...props}/>
    }
}