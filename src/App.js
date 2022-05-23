import React, { Fragment, useRef, useState, useEffect } from "react";
import DrawingBox from "./components/drawingBox";
import ToolBar from "./components/controlsBar";

function App() {
  const ref = useRef(null);
  const [viewport, setViewport] = useState({});
  useEffect(() => {
    const width = ref.current ? ref.current.clientWidth : 0;
    const height = ref.current ? ref.current.clientHeight : 0;
    setViewport({ width, height });
  }, [ref.current]);
  return (
    <Fragment>
      <DrawingBox viewportRef={ref} />
      <ToolBar viewport={viewport} />
    </Fragment>
  );
}

export default App;
