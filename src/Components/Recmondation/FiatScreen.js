import React, { useState, useEffect } from "react";
import { Grid, Paper } from "@material-ui/core";
import FiatScreenLeft from "./FiatScreenLeft";

import FiatScreenCenter from "./FiatScreenCenter";
import { Hidden } from "@material-ui/core";
import randomColor from "randomcolor";
import { useSelector } from "react-redux";
import CurrencySystem from "./CurrencySystem";

const FiatScreen = () => {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });
  const fiatChangeRate = useSelector(
    (state) =>
      !Array.isArray(state.chatScreen.fiatData) &&
      state.chatScreen.fiatData.recommended_fiat_dict.changerate_cryptos
  );

  const fiatPriceDict = useSelector(
    (state) =>
      !Array.isArray(state.chatScreen.fiatData) &&
      state.chatScreen.fiatData.recommended_fiat_dict.price_dict
  );
  return (
    <>
      <Grid container>
        {/* left grid */}
        <Grid item md={3}>
          <FiatScreenLeft />
        </Grid>
        {/* center grid */}
        <Grid item xs={12} md={9}>
          <FiatScreenCenter />
        </Grid>

        <Hidden only={["lg", "md", "xl"]}>
          <Grid container style={{ marginTop: "20px", paddingLeft: "10px" }}>
            <Grid item xs={12}>
              <h3> Price</h3>

              <Paper elevation={0} id="conversionRatePaper">
                {fiatPriceDict &&
                  Object.entries(fiatPriceDict).map(([key, value]) => (
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
              <h3> Change rate per 24 hours</h3>

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
        </Hidden>

        <Hidden only={["sm", "xs"]}>
          <Grid
            item
            style={{
              paddingLeft: "50px",
              paddingRight: "200px",
              paddingTop: "50px",
              paddingBottom: "50px",
            }}
          >
            <p
              style={{
                textAlign: "justify",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              The Effective earnings depend on ay dynamic variables. Even the
              presented results are based on proprietary predication formulas.
              We do not guarantee any kind of earning. Please read our
              <span style={{ color: "red" }}> Disclaimer</span> for further
              information.
            </p>
          </Grid>
        </Hidden>

        <Hidden only={["md", "lg", "xl"]}>
          <Grid
            item
            style={{
              paddingLeft: "5%",
              paddingRight: "5%",
              paddingTop: "5%",
              paddingBottom: "10%",
            }}
          >
            <p
              style={{
                textAlign: "justify",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              The Effective earnings depend on ay dynamic variables. Even the
              presented results are based on proprietary predication formulas.
              We do not guarantee any kind of earning. Please read our
              <span style={{ color: "red" }}> Disclaimer</span> for further
              information.
            </p>
          </Grid>
        </Hidden>
      </Grid>
    </>
  );
};

export default FiatScreen;
