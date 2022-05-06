function createBessel(e, figure) {
  const { nativeEvent } = e;
  figure.path = ` Q ${nativeEvent.offsetX} ${figure.downY} ${nativeEvent.offsetX} ${nativeEvent.offsetY}`;
}

function renderBessel(figure, index) {
  const { color, width, downX, downY, path } = figure;
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

export { createBessel, renderBessel };
