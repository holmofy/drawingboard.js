import { renderPath } from "./createPathUtil";
import { renderLine } from "./createLineUtil";
import { renderRect } from "./createRectUtil";
import { renderCircle } from "./createCircleUtil";
import { renderTriangle } from "./createTriangleUtil";
import { renderBessel } from "./createBesselUtil";

function createSvgChildUtil(item, index) {
  const { type } = item;
  if (type === "empty") return null;
  let getPath = function () { };
  if (type === "path") getPath = renderPath;
  else if (type === "freeHand") getPath = renderPath;
  else if (type === "line") getPath = renderLine;
  else if (type === "rect") getPath = renderRect;
  else if (type === "circle") getPath = renderCircle;
  else if (type === "triangle") getPath = renderTriangle;
  else if (type === "arc") getPath = renderBessel;
  else return null;
  return getPath(item, index);
}

export default createSvgChildUtil;
