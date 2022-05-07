import { createStore } from "redux";
import Figures from "./figuresOperateUtil";

const configKey = 'drawingBoard:drawingStyle';

const defaultState = {
  figures: [],
  drawingStyle: localStorage.getItem(configKey) ? JSON.parse(localStorage.getItem(configKey)) : {
    type: "path",
    color: "orange",
    width: 2,
    fill: "transparent",
  }
};

function handleAction(state = defaultState, action) {
  const {
    type
  } = action;
  if (type === "INIT_FIGURES") {
    action.figures.forEach(f => state.figures.push(f));
    Figures.addStatus(state.figures);
    return {
      ...state
    };
  } else if (type === "ADD_NEW_FIGURE") {
    state.figures.push(action.figure);
    Figures.addStatus(state.figures);
    return {
      ...state
    };
  } else if (type === "SET_DRAWING_STYLE") {
    state.drawingStyle = action.style;
    localStorage.setItem(configKey, JSON.stringify(state.drawingStyle));
    return {
      ...state
    };
  } else if (type === "SET_ACTIVE_SELECTOR") {
    state.activeSelector = action.activeSelector;
    return {
      ...state
    };
  } else if (type === "CHANGE_HANDLER_MODE") {
    state.handlerMode = action.handlerMode;
    return {
      ...state
    };
  } else if (type === "CLEAR_FIGURES") {
    Figures.clearAllStack();
    state.figures = [];
    return {
      ...state
    };
  } else if (type === "BACK_TO") {
    const lastStatus = Figures.backStatus();
    if (lastStatus) {
      state.figures = [...lastStatus];
      return {
        ...state
      };
    }
  } else if (type === "RECOVER_TO") {
    const lastStatus = Figures.recStatus();
    if (lastStatus) {
      state.figures = [...lastStatus];
      return {
        ...state
      };
    }
  }
  return state;
}

const store = createStore(handleAction);
export default store;