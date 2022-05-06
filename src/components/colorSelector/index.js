import React from "react";
import { useDispatch, useSelector } from "react-redux";

const colors = ["#ff776d", "#020826", "#8c7851", "#008eff", "orange"];

function ColorSelector() {
  const newAction = useDispatch();
  const { drawingStyle, activeSelector } = useSelector((state) => state);

  function handleClick({ target }) {
    const { dataset } = target;
    if (!dataset.color) return;
    drawingStyle.color = dataset.color;
    if (drawingStyle.fill !== "transparent") drawingStyle.fill = dataset.color;
    newAction({ type: "SET_DRAWING_STYLE", style: drawingStyle });
  }
  function toggleSelector() {
    newAction({
      type: "SET_ACTIVE_SELECTOR",
      activeSelector: activeSelector === 'color-selector' ? '' : 'color-selector'
    });
  }
  return (
    <div className={activeSelector === 'color-selector' ? "tool-bar-group active-group" : "tool-bar-group"}
      onClick={toggleSelector}>
      <svg className="tool-bar-item" viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg" width="28" height="28">
        <path d="M852.456667 216.746667A452.693333 452.693333 0 0 0 526.90999999 85.333333a426.666667 426.666667 0 0 0-2.133333 853.333334 110.08 110.08 0 0 0 107.946666-80.64 107.52 107.52 0 0 0-24.31999999-97.28 21.333333 21.333333 0 0 1 15.786667-35.413334h70.39999999A262.4 262.4 0 0 0 957.41666699 483.413333a361.813333 361.813333 0 0 0-104.96-266.666666zM696.296667 640h-70.4a106.24 106.24 0 0 0-79.786667 177.066667 20.906667 20.906667 0 0 1 5.12 20.906666c-2.133333 8.96-11.946667 14.506667-25.173333 15.36a341.333333 341.333333 0 0 1-333.653334-388.693333A345.6 345.6 0 0 1 527.336667 170.666667H530.75a361.386667 361.386667 0 0 1 260.266667 105.813333 277.333333 277.333333 0 0 1 81.066666 203.52A177.92 177.92 0 0 1 696.296667 640z" p-id="996"></path><path d="M530.75 277.333333m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" p-id="997"></path>
        <path d="M669.41666699 307.2a64 64 0 1 0 87.46666601 23.466667 64 64 0 0 0-87.46666601-23.466667zM392.083333 307.2a64 64 0 1 0 23.466667 87.466667 64 64 0 0 0-23.466667-87.466667zM281.576667 480.426667a64 64 0 1 0 88.746666 17.066666 63.573333 63.573333 0 0 0-88.746666-17.066666z"></path>
      </svg>
      <div className="tool-bar-popover" onClick={handleClick}>
        {colors.map((item, index) => {
          return (
            <span
              className="tool-bar-item"
              style={{ backgroundColor: item }}
              data-color={item}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ColorSelector;
