export const cryptoDataAction = (data) => {
  return {
    type: "SAVE_CRYPTO_DATA",
    payload: data,
  };
};

export const fiatDataAction = (data) => {
  return {
    type: "SAVE_FIAT_DATA",
    payload: data,
  };
};

export const resetUser = () => {
  return {
    type: "RESET",
  };
};
