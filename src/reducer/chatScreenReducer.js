const initalState = {
  fiatData: [],
  cryptoData: [],
};

export const chatScreenReducer = (state = initalState, action) => {
  switch (action.type) {
    case "SAVE_FIAT_DATA":
      return {
        ...state,
        fiatData: action.payload,
      };
    case "SAVE_CRYPTO_DATA":
      return {
        ...state,
        cryptoData: action.payload,
      };
    case "RESET":
      return initalState;

    default:
      return state;
  }
};
