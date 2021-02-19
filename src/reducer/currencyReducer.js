const initalState = {
  currency: null,
};

export const currencyReducer = (state = initalState, action) => {
  switch (action.type) {
    case "SET_CURRENCY_NAME":
      return {
        ...state,
        currency: action.payload,
      };

    case "RESET":
      return initalState;

    default:
      return state;
  }
};
