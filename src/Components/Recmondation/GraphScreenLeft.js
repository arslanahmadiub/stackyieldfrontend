import React, { useState, useEffect } from "react";
import { Grid, Paper } from "@material-ui/core";
import "react-circular-progressbar/dist/styles.css";
import CurrencySystem from "./CurrencySystem";
import randomColor from "randomcolor";
import { useSelector } from "react-redux";
import CustomCircleCrypto from "./CustomCircleCrypto";
import { Hidden } from "@material-ui/core";

const GraphScreenLeft = () => {
  const cryptoData = useSelector(
    (state) => state.chatScreen.cryptoData.conversion_dict
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

  const currencyWithAmount = useSelector((state) => state.currency.currency);

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
    <>
      <Grid container direction="column">
        {/* top circle full screen */}

        <Hidden only={["xs", "sm"]}>
          <div style={{ display: "flex", position: "relative" }}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <div style={{ display: "flex", position: "relative" }}>
                <CustomCircleCrypto
                  currency={currencyWithAmount && currencyWithAmount}
                  amount={amountText && amountText}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <div
                style={{
                  position: "absolute",
                  bottom: "10px",
                  right: "1%",
                }}
              >
                <h3>
                  Total <br></br> Investment
                </h3>
              </div>
            </Grid>
          </div>
        </Hidden>

        {/* top circle bottom screen */}

        <Hidden only={["lg", "md", "xl"]}>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              width: "100vw",
              justifyContent: "center",
              flexDirection: "column",
              overflowY: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                overflowY: "hidden",
              }}
            >
              <CustomCircleCrypto
                currency={currencyWithAmount && currencyWithAmount}
                amount={amountText && amountText}
              />
            </div>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                marginTop: "10px",
                overflowY: "hidden",
              }}
            >
              <h2>Total Investment</h2>
            </div>
          </Grid>
        </Hidden>

        <Hidden only={["xs", "sm"]}>
          <Grid container style={{ marginTop: "20px", paddingLeft: "10px" }}>
            <Grid item xs={12}>
              <h3> Conversion Rates</h3>

              <Paper elevation={0} id="conversionRatePaper">
                {cryptoData &&
                  Object.entries(cryptoData).map(([key, value]) => (
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
        </Hidden>

        <Hidden only={["lg", "md", "xl"]}>
          <Grid container style={{ marginTop: "20px", paddingLeft: "10px" }}>
            <Grid item xs={12}>
              <h3> Conversion Rates</h3>

              <Paper elevation={0} id="conversionRatePaper">
                {cryptoData &&
                  Object.entries(cryptoData).map(([key, value]) => (
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
        </Hidden>
      </Grid>
    </>
  );
};

export default GraphScreenLeft;
