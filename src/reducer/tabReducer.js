const initalState = {
  tabNumber: null,
  newTabNumber: null,
};

export const rabReducer = (state = initalState, action) => {
  switch (action.type) {
    case "GET_TAB_NUMBER":
      return {
        ...state,
        tabNumber: action.payload,
      };
    case "CHANGE_TAB_NUMBER":
      return {
        ...state,
        newTabNumber: action.payload,
      };

    case "RESET":
      return initalState;

    default:
      return state;
  }
};
