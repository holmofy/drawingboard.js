import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState, Fragment } from "react";
import { createLine } from "../../utils/svg/createLineUtil";
import { createPath } from "../../utils/svg/createPathUtil";
import { createRect } from "../../utils/svg/createRectUtil";
import { createCircle } from "../../utils/svg/createCircleUtil";
import { createTriangle } from "../../utils/svg/createTriangleUtil";
import { createBessel } from "../../utils/svg/createBesselUtil";
import createSvgChildUtil from "../../utils/svg/createSvgChildUtil";
import useUnload from "../../utils/unload";
import saveToIndexDb from "../../utils/saveToIndexDbUtil";
import readIndexDb from "../../utils/readIndexDbUtil";
import deleteItem from "../../utils/deleteItemUtil";

let onTouch = false;
let onPainting = false;
let updated = false;
let requested = false;

function DrawingBox() {
  const newAction = useDispatch();
  const [figure, setFigure] = useState({});
  const { drawingStyle, activeSelector, handlerMode } = useSelector((state) => state);
  const { figures } = useSelector((state) => state);

  useUnload(e => {
    localStorage.setItem("lastDrawingBoard", JSON.stringify({ id: location.pathname, figures }));
  })

  useEffect(() => {
    const lastDrawingBoard = localStorage.getItem("lastDrawingBoard");
    if (lastDrawingBoard) {
      const { id, figures } = JSON.parse(lastDrawingBoard);
      if (id === location.pathname) {
        newAction({ type: "INIT_FIGURES", figures });
        return;
      } else {
        deleteItem(id, () => saveToIndexDb(id, figures));
      }
    }
    readIndexDb(location.pathname, ({ data }) => {
      if (data) {
        newAction({ type: "INIT_FIGURES", figures: data });
      }
    });
  }, []);

  function handleMouseDown(e) {
    onPainting = true;
    const { nativeEvent } = e;
    const { color, width, fill } = drawingStyle;
    figure.color = color;
    figure.width = width;
    figure.fill = fill;
    figure.path = "";
    figure.type = drawingStyle.type;
    figure.key = Date.now();
    figure.downX = nativeEvent.offsetX;
    figure.downY = nativeEvent.offsetY;
  }

  function updateComponent() {
    requested = true;
    setFigure({ ...figure });
  }

  function handleMouseMove(e) {
    if (activeSelector !== '') {
      newAction({
        type: "SET_ACTIVE_SELECTOR",
        activeSelector: ''
      });
    }
    if (!onPainting) return;
    figure.flag = true;
    let handleDrawing = function () { };
    const { type } = drawingStyle;
    if (type === "path") handleDrawing = createPath;
    else if (type === "line") handleDrawing = createLine;
    else if (type === "rect") handleDrawing = createRect;
    else if (type === "circle") handleDrawing = createCircle;
    else if (type === "triangle") handleDrawing = createTriangle;
    else if (type === "arc") handleDrawing = createBessel;
    handleDrawing(e, figure);
    if (!updated) {
      updated = true;
      requestAnimationFrame(updateComponent);
    }
  }

  function handleMouseUp() {
    if (onTouch) return;
    onPainting = false;
    if (!figure?.flag) return;
    const lastFigure = { ...figure };
    figure.type = "";
    newAction({ type: "ADD_NEW_FIGURE", figure: lastFigure });
  }

  function touchToMouse(e) {
    const {
      target,
      touches: [{ pageX, pageY }],
    } = e;
    const container = ['path', 'circle', 'line', 'rect', 'polygon'].includes(target.tagName) ?
      target.parentElement.parentElement : target.parentElement
    const offsetX = pageX - container.offsetLeft;
    const offsetY = pageY - container.offsetTop;
    return { nativeEvent: { offsetX, offsetY } };
  }

  function handleTouchEnd(e) {
    e.preventDefault();
    onTouch = false;
    handleMouseUp();
  }

  function handleTouchMove(e) {
    if (onTouch) {
      handleMouseMove(touchToMouse(e));
    } else {
      onTouch = true;
      handleMouseDown(touchToMouse(e));
    }
  }

  function handleMouseLeave() {
    onPainting = false;
  }

  useEffect(function () {
    if (requested) {
      updated = false;
      requested = false;
    }
  }, [figure]);

  return (
    <Fragment>
      <svg
        className="drawing-box"
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        onMouseUp={handleMouseUp}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {figures.map((item, index) => createSvgChildUtil(item, index))}
        {createSvgChildUtil(figure)}
      </svg>
      {handlerMode === 'handler' ? <div className="drawing-mask"></div> : null}
    </Fragment>
  );
}
export default DrawingBox;
