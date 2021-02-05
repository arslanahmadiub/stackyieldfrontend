import axios from "axios";
import { apiEndPoint } from "../Config.json";

let fietApiUrl = apiEndPoint + "getFormFiat";
let cryptoApiUrl = apiEndPoint + "getFormCrypto";

export async function formFiatApi(data) {
  return await axios({
    method: "post",
    url: fietApiUrl,
    data: data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function formCryptoApi(data) {
  return await axios({
    method: "post",
    url: cryptoApiUrl,
    data: data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
