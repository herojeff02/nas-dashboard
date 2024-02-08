import {useEffect, useRef, useState} from "react";

export default function DraggableContainer(
    {
        dragMultiplierLeft = 1,
        dragMultiplierRight = 1,
        dragMultiplierTop = 1,
        dragMultiplierBottom = 1,
        dragLimitLeft,
        dragLimitRight,
        dragLimitTop,
        dragLimitBottom,
        setPointerMovementCallback,
        setDraggingCallback,
        setMouseDownCallback,
        draggable = true,
        children
    }) {
    const DRAG_THRESHOLD = 10
    const draggingTimeout = useRef(-1)
    const [mouseDown, setMouseDown] = useState(false)
    const [isDragging, setDragging] = useState(false)
    const [pointerDownPosition, setPointerDownPosition] = useState({x: 0, y: 0})
    const [pointerCurrentPosition, setPointerCurrentPosition] = useState({x: 0, y: 0})

    useEffect(() => {
        if(mouseDown) {
            draggingTimeout.current = setTimeout(() => {
                setDragging(true)
                setDraggingCallback && setDraggingCallback(true)
            }, 400)
        } else {
            clearTimeout(draggingTimeout.current)
            draggingTimeout.current = -1
            setDragging(false)
            setDraggingCallback && setDraggingCallback(false)
            setPointerMovementCallback && setPointerMovementCallback({x: 0, y: 0})
            setPointerCurrentPosition({x: pointerDownPosition.x, y: pointerDownPosition.y})
        }

    }, [mouseDown])

    useEffect(() => {
        if(mouseDown) {
            if(draggable) {
                if(Math.abs(pointerCurrentPosition.y - pointerDownPosition.y) > DRAG_THRESHOLD || Math.abs(pointerCurrentPosition.x - pointerDownPosition.x) > DRAG_THRESHOLD) {
                    setDragging(true)
                    setDraggingCallback && setDraggingCallback(true)

                    setPointerMovementCallback && setPointerMovementCallback({
                        x: pointerCurrentPosition.x - pointerDownPosition.x,
                        y: pointerCurrentPosition.y - pointerDownPosition.y
                    })
                }
            } else {
                setDragging(false)
                setDraggingCallback && setDraggingCallback(false)
                // setPointerMovementCallback && setPointerMovementCallback({x: 0, y: 0})
                setPointerDownPosition({x: pointerCurrentPosition.x, y: pointerCurrentPosition.y})
            }
        }
    }, [pointerCurrentPosition])


    const getTransformInlineStyle = () => {
        let diffX = 0
        let diffY = 0
        if(Math.abs(pointerCurrentPosition.y - pointerDownPosition.y) > DRAG_THRESHOLD || Math.abs(pointerCurrentPosition.x - pointerDownPosition.x) > DRAG_THRESHOLD) {
            diffX = pointerCurrentPosition.x - pointerDownPosition.x
            diffY = pointerCurrentPosition.y - pointerDownPosition.y
        }
        let x = 0
        let y = 0
        if(diffX > 0) {
            if(dragLimitRight) {
                x = Math.min(Math.abs(dragLimitRight), diffX * dragMultiplierRight)
            } else {
                x = diffX * dragMultiplierRight
            }
        } else {
            if(dragLimitLeft) {
                x = Math.max(-Math.abs(dragLimitLeft), diffX * dragMultiplierLeft)
            } else {
                x = diffX * dragMultiplierLeft
            }
        }
        if(diffY > 0) {
            if(dragLimitBottom) {
                y = Math.min(Math.abs(dragLimitBottom), diffY * dragMultiplierBottom)
            } else {
                y = diffY * dragMultiplierBottom
            }
        } else {
            if(dragLimitTop) {
                y = Math.max(-Math.abs(dragLimitTop), diffY * dragMultiplierTop)
            } else {
                y = diffY * dragMultiplierTop
            }
        }
        return `translate(${x}px, ${y}px)`
    }

    return <div
        onPointerDown={(e) => {
            setMouseDown(true);
            setMouseDownCallback && setMouseDownCallback(true)
            setPointerDownPosition({x: e.clientX, y: e.clientY})
            setPointerCurrentPosition({x: e.clientX, y: e.clientY})
        }}
        onTouchStart={(e) => {
            setMouseDown(true);
            setMouseDownCallback && setMouseDownCallback(true)
            setPointerDownPosition({x: e.touches[0].clientX, y: e.touches[0].clientY})
            setPointerCurrentPosition({x: e.touches[0].clientX, y: e.touches[0].clientY})
        }}
        onPointerMove={(e) => {
            if(!mouseDown) {
                setPointerDownPosition({x: e.clientX, y: e.clientY})
            }
            setPointerCurrentPosition({x: e.clientX, y: e.clientY})
        }}
        onTouchMove={(e) => {
            if(!mouseDown) {
                setPointerDownPosition({x: e.touches[0].clientX, y: e.touches[0].clientY})
            }
            setPointerCurrentPosition({x: e.touches[0].clientX, y: e.touches[0].clientY})
        }}
        onMouseLeave={() => {
            setMouseDown(false);
            setMouseDownCallback && setMouseDownCallback(false)
        }}
        onPointerUp={() => {
            setMouseDown(false);
            setMouseDownCallback && setMouseDownCallback(false)
        }}
        onTouchEnd={() => {
            setMouseDown(false);
            setMouseDownCallback && setMouseDownCallback(false)
        }}

        style={{
            bottom: 0,
            position: "fixed",
            width: "100%",
            height: "100%",
            pointerEvents: isDragging ? "all" : "none",
            zIndex: 1000,
            transition: !mouseDown || !draggable ? `transform 0.3s ease` : "",
            transform: getTransformInlineStyle()
        }}
    >
        {children}
    </div>

}