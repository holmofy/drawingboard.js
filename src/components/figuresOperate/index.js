import "./index.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Figures from "../../utils/figuresOperateUtil";

function FiguresOperate() {
  const newAction = useDispatch();
  const [cancel, setCancel] = useState(true);
  const [recover, setRecover] = useState(false);
  const state = useSelector((state) => state);

  function handleCancel() {
    if (!cancel) return;
    newAction({ type: "BACK_TO" });
  }
  function handleRecover() {
    if (!recover) return;
    newAction({ type: "RECOVER_TO" });
  }
  function handleClear() {
    if (!cancel) return;
    newAction({ type: "CLEAR_FIGURES" });
  }
  useEffect(
    function () {
      if (Figures.cancelStack.length > 1) setCancel(true);
      else setCancel(false);
      if (Figures.recoveryStack.length) setRecover(true);
      else setRecover(false);
    },
    [state]
  );
  return (
    <div className="tool-bar-group tool-operate">
      <svg
        className="tool-bar-item"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        data-active={cancel}
        onClick={handleCancel}
      >
        <path d="M76 463.7l294.8 294.9c19.5 19.4 52.8 5.6 52.8-21.9V561.5c202.5-8.2 344.1 59.5 501.6 338.3 8.5 15 31.5 7.9 30.6-9.3-30.5-554.7-453-571.4-532.3-569.6v-174c0-27.5-33.2-41.3-52.7-21.8L75.9 420c-12 12.1-12 31.6 0.1 43.7z"></path>
      </svg>

      <svg
        className="tool-bar-item"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        data-active={recover}
        onClick={handleRecover}
      >
        <path d="M946.8 420L651.9 125.1c-19.5-19.5-52.7-5.7-52.7 21.8v174c-79.3-1.8-501.8 14.9-532.3 569.6-0.9 17.2 22.1 24.3 30.6 9.3C255 621 396.6 553.3 599.1 561.5v175.2c0 27.5 33.3 41.3 52.8 21.9l294.8-294.9c12.1-12.1 12.1-31.6 0.1-43.7z"></path>
      </svg>
      <svg className="tool-bar-item"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        data-active={!!state.figures?.length}
        onClick={handleClear}
      >
        <path d="M298.666667 109.25l426.666667 0 0 85.333333-426.666667 1e-8 0-85.33333301Z"></path>
        <path d="M896 237.25000001l-85.333333 0-85.333333 0L298.666667 237.25000001 213.333333 237.25000001 128 237.25000001l0 85.33333299 85.333333 0 0 597.333333 597.333333 0L810.666667 322.583333l85.333333 0L896 237.25000001zM725.333333 834.583333L298.666667 834.583333 298.666667 322.583333l426.666667 0L725.333333 834.583333z" p-id="1153"></path><path d="M384 406.666667l85.333333 0 0 341.33333301-85.333333 0 0-341.33333301Z"></path>
        <path d="M554.666667 406.666667l85.333333 0 0 341.33333301-85.333333 0 0-341.33333301Z"></path>
      </svg>
    </div>
  );
}

export default FiguresOperate;
