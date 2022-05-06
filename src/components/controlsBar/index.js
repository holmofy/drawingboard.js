import "./index.css";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import ColorSelector from "../colorSelector";
import FigureSelector from "../figureSelector";
import PropsSelector from "../propsSelector";
import FiguresOperate from "../figuresOperate";
import HandlerMode from "../handlerMode";

function ToolBar() {
  const wrapRef = useRef();
  const { drawingStyle } = useSelector((state) => state);

  function handleWheel(e) {
    const { current } = wrapRef;
    e.stopPropagation();
    current.scrollTo({
      left: ~~(current.scrollLeft + e.deltaY * 0.5)
    });
  }
  return (
    <div className="tool-bar-wrap"
      style={{ "--fillColor": drawingStyle.color }}
      onWheel={handleWheel}
      ref={wrapRef}
    >
      <div className="tool-bar">
        <HandlerMode />
        <ColorSelector />
        <FigureSelector />
        <PropsSelector />
        <FiguresOperate />
      </div>
    </div>
  );
}

export default ToolBar;
