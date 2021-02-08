import React, { useState, useEffect } from "react";
import { Grid, Paper } from "@material-ui/core";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import CurrencySystem from "./CurrencySystem";
import randomColor from "randomcolor";
import { useSelector } from "react-redux";

const GraphScreenLeft = () => {
  const cryptoData = useSelector(
    (state) => state.chatScreen.cryptoData.conversion_dict
  );

  const cryptoDict = useSelector(
    (state) => state.chatScreen.cryptoData.crypto_dict
  );
  const cryptoDictInput = useSelector(
    (state) => state.chatScreen.userCryptoData.count_crypto
  );

  const [amountText, setAmountText] = useState(null);

  let covertAmount = () => {
    let coinPriceWithoutDolor = cryptoDict.bitcoin.price.replace("$", "");
    let coinPriceWithoutComa = coinPriceWithoutDolor.replace(",", "");
    let amount = parseFloat(cryptoDictInput) * parseFloat(coinPriceWithoutComa);

    setAmountText("$" + amount);
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
                  width: "100px",
                  height: "100px",
                  position: "relative",
                }}
              >
                <CircularProgressbar
                  value={100}
                  text={amountText && amountText}
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
        <h3>Conversion Rates</h3>

        <Paper elevation={0} id="conversionRatePaper">
          {cryptoData &&
            Object.entries(cryptoData).map(([key, value]) => (
              <CurrencySystem
                color={randomColor()}
                key={key}
                currency={key.charAt(0).toUpperCase() + key.slice(1)}
                value={"$" + value}
              />
            ))}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default GraphScreenLeft;
