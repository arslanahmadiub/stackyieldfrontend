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

export const userCryptoDataSaveAction = (data) => {
  return {
    type: "SAVE_USER_CRYPTO_DATA",
    payload: data,
  };
};

export const userFiatDataSaveAction = (data) => {
  return {
    type: "SAVE_USER_FIAT_DATA",
    payload: data,
  };
};

export const resetUser = () => {
  return {
    type: "RESET",
  };
};
