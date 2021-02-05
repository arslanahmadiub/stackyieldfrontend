import React from "react";
import { Grid } from "@material-ui/core";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import CurrencySystem from "./CurrencySystem";
const GraphScreenLeft = () => {
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
              <div style={{ display: "flex", width: "100px", height: "100px" }}>
                <CircularProgressbar value={100} text="$12345" />
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
      <Grid item xs={12} style={{ marginTop: "20px" }}>
        <h3>Conversion Rates</h3>
        <CurrencySystem
          color="#373B41"
          currency="Local Currency"
          value="1,234,095"
        />
        <CurrencySystem color="#FFE771" currency="Bitcoin" value="1,234,095" />
        <CurrencySystem color="#5FCC8B" currency="Ethereum" value="1,234,095" />
        <CurrencySystem color="#EC5B5B" currency="Ripple" value="1,234,095" />
        <CurrencySystem color="#608EE2" currency="Tether" value="1,234,095" />
      </Grid>
    </Grid>
  );
};

export default GraphScreenLeft;
