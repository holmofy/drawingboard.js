import "./index.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function PropsSelector() {
  const newAction = useDispatch();
  const { drawingStyle, activeSelector } = useSelector((state) => state);

  function handleOnchange({ target }) {
    drawingStyle.width = Number(target.value);
    newAction({ type: "SET_DRAWING_STYLE", style: drawingStyle });
  }

  function handleFill({ target }) {
    drawingStyle.fill = target.checked ? drawingStyle.color : "transparent";
    newAction({ type: "SET_DRAWING_STYLE", style: drawingStyle });
  }

  function toggleSelector() {
    newAction({
      type: "SET_ACTIVE_SELECTOR",
      activeSelector: activeSelector === 'props-selector' ? '' : 'props-selector'
    });
  }

  return (
    <div className={activeSelector === 'props-selector' ? "tool-bar-group active-group" : "tool-bar-group"}
      onClick={toggleSelector}>
      <svg className="tool-bar-item"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
      >
        <path d="M834.752 61.12a115.2 115.2 0 0 0-160.128 28.288L495.232 345.536l-138.24-96.768a63.104 63.104 0 0 0-86.272 13.44l-0.256 0.384L63.616 548.992a63.104 63.104 0 0 0 13.824 90.048l473.344 331.392a63.232 63.232 0 0 0 89.344-17.728l198.08-291.84 0.576-0.96a63.104 63.104 0 0 0-16.896-85.568l-138.24-96.832 179.328-256.192a115.072 115.072 0 0 0-28.16-160.192zM586.944 917.12l-0.192 0.32-131.008-91.712 83.008-118.592a16 16 0 0 0-3.904-22.272l-19.712-13.76a16 16 0 0 0-22.336 3.904L409.856 793.6 291.84 711.04l82.944-118.528a16 16 0 0 0-3.84-22.272l-19.712-13.824a16 16 0 0 0-22.208 3.968l-83.008 118.528-131.008-91.712 129.792-179.84 466.432 326.72-124.224 183.04z m155.712-229.504L277.632 361.984l43.52-60.16 463.232 324.352-41.728 61.44z m71.168-500.736L634.496 443.072l-90.112-63.04 179.392-256.256a55.04 55.04 0 1 1 90.112 63.104h-0.064z"></path>
      </svg>
      <div className="tool-bar-popover props-selector">
        <div>
          <span className='tool-bar-text'>墨迹粗细：</span>
          <input
            value={drawingStyle.width}
            id="range"
            onChange={handleOnchange}
            type="range"
            max={20}
            min={1}
          />
        </div>
        <div className="input-fill">
          <span className='tool-bar-text'>填充内部：</span>
          <input id="checkbox" type="checkbox" onChange={handleFill} />
          <label htmlFor="checkbox" className="input-emoji">
            <span className="input-tips">no </span>
            <span className="input-tips"> off</span>
            {/*<span className='emoji'>😄</span>*/}
          </label>
        </div>
      </div>
    </div>
  );
}

export default PropsSelector;
