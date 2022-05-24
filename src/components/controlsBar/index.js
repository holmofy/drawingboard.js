import "./index.css";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import ColorSelector from "../colorSelector";
import FigureSelector, { shapes } from "../figureSelector";
import PropsSelector from "../propsSelector";
import FiguresOperate from "../figuresOperate";
import HandlerMode from "../handlerMode";
import { useState } from "react";


let onTouch = false,
  onMove = false,
  lastX = null,
  lastY = null;

function ToolBar() {
  const wrapRef = useRef();
  const [transform, setTransform] = useState({ transX: 0, transY: 0 });
  const { transX, transY } = transform;
  const { innerWidth: width, innerHeight: height } = window;
  const { drawingStyle } = useSelector((state) => state);

  function handleWheel(e) {
    const { current } = wrapRef;
    e.stopPropagation();
    current.scrollTo({
      left: ~~(current.scrollLeft + e.deltaY * 0.5)
    });
  }

  function handleMouseDown(e) {
    onMove = true;
    const { nativeEvent } = e;
    lastX = nativeEvent.offsetX;
    lastY = nativeEvent.offsetY;
  }

  function handleMouseMove(e) {
    if (!onMove) return;
    const { nativeEvent } = e;
    const { offsetX, offsetY } = nativeEvent;
    const newTransX = transX + offsetX - lastX;
    const newTransY = transY + offsetY - lastY;
    const newTransform = { transX: newTransX, transY: newTransY };
    lastX = offsetX;
    lastY = offsetY;
    setTransform(newTransform);
  }


  function touchToMouse(e) {
    const {
      touches: [{ pageX, pageY }],
    } = e;
    const offsetX = pageX;
    const offsetY = pageY;
    return { nativeEvent: { offsetX, offsetY } };
  }

  function handleTouchEnd() {
    onTouch = false;
    onMove = false;
    const deltaX = Math.abs(transX);
    const deltaY = Math.abs(transY);
    const x = deltaX > width / 12 ? deltaX / transX * (width / 2 - 50) : 0;
    const y = deltaY > height / 2 ? -height + 100 : 0;
    setTransform({ transX: x, transY: y });
  }

  function handleTouchMove(e) {
    if (onTouch) {
      handleMouseMove(touchToMouse(e));
    } else {
      onTouch = true;
      handleMouseDown(touchToMouse(e));
    }
  }

  function handleIndicatorClick() {
    setTransform({ ...transform, transX: 0 });
  }

  return (
    <div className="tool-bar-wrap"
      style={{ "--fillColor": drawingStyle.color }}
      onWheel={handleWheel}
      ref={wrapRef}
    >
      <div className={`tool-bar ${Math.abs(transX) > width / 12 ? 'collapsed' : ''} ${Math.abs(transY) > height / 2 ? 'tool-bar-up' : ''}`}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        style={{
          transform: 'translate(' + transX + 'px, ' + transY + 'px)',
          transition: onTouch ? "width .2s" : "transform .3s,width .2s",
          width: Math.abs(transX) > width / 12 ? '50px' : '350px'
        }}>
        <HandlerMode />
        <ColorSelector />
        <FigureSelector />
        <PropsSelector />
        <FiguresOperate />
        <svg
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          className="tool-bar-item collapsed-indicator"
          onClick={handleIndicatorClick}
        >{shapes[drawingStyle.type].path}</svg>
      </div>
    </div>
  );
}

export default ToolBar;
