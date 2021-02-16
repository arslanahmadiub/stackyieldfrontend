import React, { useState, useEffect } from "react";
import { Grid, Paper } from "@material-ui/core";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import CurrencySystem from "./CurrencySystem";
import randomColor from "randomcolor";
import { useSelector } from "react-redux";

const FiatScreenLeft = () => {
  const cryptoData = useSelector(
    (state) => state.chatScreen.cryptoData.conversion_dict
  );

  const fiatChangeRate = useSelector(
    (state) =>
      state.chatScreen.fiatData &&
      state.chatScreen.fiatData.recommended_fiat_dict.changerate_cryptos
  );

  const fiatAmount = useSelector(
    (state) =>
      state.chatScreen.userFiatData && state.chatScreen.userFiatData.count_fiat
  );

  const cryptoDict = useSelector((state) =>
    state.chatScreen.cryptoData ? state.chatScreen.cryptoData.crypto_dict : null
  );
  const cryptoDictInput = useSelector((state) =>
    state.chatScreen.userCryptoData
      ? state.chatScreen.userCryptoData.count_crypto
      : null
  );

  const [amountText, setAmountText] = useState(null);

  let covertAmount = () => {
    let currency = Object.keys(cryptoDict)[0];

    let coinPriceWithoutDolor = cryptoDict[currency].price.replace("$", "");
    let coinPriceWithoutComa = coinPriceWithoutDolor.replace(",", "");
    let amount = parseFloat(cryptoDictInput) * parseFloat(coinPriceWithoutComa);

    setAmountText("$" + amount.toFixed(2));
  };
  useEffect(() => {
    if (cryptoDict) {
      covertAmount();
    }
  }, []);

  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="flex-start"
      style={{
        paddingTop: "10px",
        paddingLeft: "20px",
      }}
    >
      <Grid item xs={12}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={12}>
            <div style={{ display: "flex", position: "relative" }}>
              <div
                style={{
                  display: "flex",
                  width: "150px",
                  height: "150px",
                  position: "relative",
                }}
              >
                <CircularProgressbar
                  value={100}
                  text={fiatAmount && "$" + fiatAmount}
                  style={{ fontSize: "12px" }}
                />
              </div>
              <div
                style={{ position: "absolute", bottom: "10px", left: "110%" }}
              >
                <h3>
                  Total <br></br> Investment
                </h3>
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} style={{ marginTop: "20px", height: "10vh" }}>
        <h3>Change rate per 24 hours</h3>

        <Paper elevation={0} id="conversionRatePaper">
          {fiatChangeRate &&
            Object.entries(fiatChangeRate).map(([key, value]) => (
              <CurrencySystem
                color={randomColor()}
                key={key}
                currency={key.charAt(0).toUpperCase() + key.slice(1)}
                value={value}
              />
            ))}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default FiatScreenLeft;
