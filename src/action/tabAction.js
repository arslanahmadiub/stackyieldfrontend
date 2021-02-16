export const tabAction = (data) => {
  return {
    type: "GET_TAB_NUMBER",
    payload: data,
  };
};
export const changeTabAction = (data) => {
  return {
    type: "CHANGE_TAB_NUMBER",
    payload: data,
  };
};
