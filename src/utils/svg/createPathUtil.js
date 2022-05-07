function createPath(e, figure) {
  const { nativeEvent } = e;
  figure.path += `L${nativeEvent.offsetX} ${nativeEvent.offsetY}`;
}

function renderPath(figure, index) {
  const { path, color, width, downX, downY } = figure;
  if (!path) return null;
  const newPath = `M${downX} ${downY} ` + path;
  return (
    <path
      stroke={color}
      strokeWidth={width}
      fill="transparent"
      strokeLinecap="round"
      strokeLinejoin="round"
      d={newPath}
      key={index}
    />
  );
}

export { createPath, renderPath };
