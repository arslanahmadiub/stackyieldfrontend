import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import FiatScreenLeft from "./FiatScreenLeft";
import GraphScreenCenter from "./GraphScreenCenter";
import FiatScreenCenter from "./FiatScreenCenter";

import Switch from "@material-ui/core/Switch";

const FiatScreen = () => {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <>
      <Grid container>
        {/* left grid */}
        <Grid item md={3}>
          <FiatScreenLeft />
        </Grid>
        {/* center grid */}
        <Grid item md={9}>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></div>
          <FiatScreenCenter />
        </Grid>
        {/* right grid */}
        {/* <Grid item md={4}>
            <GraphScreenRight />
          </Grid> */}
      </Grid>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        style={{
          paddingTop: "10px",
          paddingLeft: "20px",
        }}
      >
        <Grid item xs={12} style={{ display: "flex", marginTop: "20px" }}>
          <div
            style={{
              display: "flex",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
              }}
            >
              <div>
                <p style={{ textAlign: "center", fontWeight: "600" }}>
                  Sell/Reinvest?<br></br>Compound Rewards
                </p>
              </div>
              <div>
                <Switch
                  checked={state.checkedA}
                  onChange={handleChange}
                  name="checkedA"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
              </div>
            </div>
          </div>
          <div style={{ marginRight: "25%" }}>
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
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default FiatScreen;
