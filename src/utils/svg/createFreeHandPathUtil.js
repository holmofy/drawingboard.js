import getComponentSvgPath from "../freeHandPencil"

let points

function createFreeHandPath(e, figure) {
    const { path, width, downX, downY } = figure;
    const { nativeEvent } = e;
    if (!path) {
        points = [[downX, downY]];
    }
    points.push([nativeEvent.offsetX, nativeEvent.offsetY]);
    figure.path = getComponentSvgPath(points, {
        size: width,
        thinning: 0.5,
        smoothing: 0.5,
        streamline: 0.5,
        start: { taper: 1 },
        end: { taper: 1 },
    });
}

function renderFreeHandPath(figure, index) {
    const { path, color } = figure;
    if (!path) return null;
    return (
        <path
            fill={color}
            d={path}
            key={index}
        />
    );
}

export { createFreeHandPath, renderFreeHandPath };
