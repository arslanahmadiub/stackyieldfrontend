const initalState = {
  fiatData: [],
  cryptoData: [],
  userCryptoData: [],
  userFiatData: [],
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
    case "SAVE_USER_CRYPTO_DATA":
      return {
        ...state,
        userCryptoData: action.payload,
      };
    case "SAVE_USER_FIAT_DATA":
      return {
        ...state,
        userFiatData: action.payload,
      };
    case "RESET":
      return initalState;

    default:
      return state;
  }
};
