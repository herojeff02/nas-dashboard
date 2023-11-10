export const STATUS = {IDLE: 1, LOAD: 2, WARN: 3, ERR: 4}

export default function ComponentLine({title = "", status = STATUS.IDLE}) {
    switch (status) {
        case STATUS.IDLE:
            return <span style={{cursor:"default", fontSize:20, color:"rgba(255,255,255,0.3)"}}>{title}</span>
        case STATUS.LOAD:
            return <span style={{cursor:"default", fontSize:20, color:"white"}}>{title}</span>
        case STATUS.WARN:
            return <span style={{cursor:"default", fontSize:20, color:"#FF7602"}}>{title}</span>
        case STATUS.ERR:
            return <span style={{cursor:"default", fontSize:20, color:"#D50001"}}>{title}</span>
    }
}