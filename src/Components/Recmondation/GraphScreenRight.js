import React from "react";
import CurrencySystemRound from "./CurrencySystemRound";
import { Button, Grid } from "@material-ui/core";

const GraphScreenRight = () => {
  return (
    <>
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
        <Grid item xs={12}>
          <h1 style={{ color: "#608EE2" }}>
            Investment<br></br> Distribution
          </h1>
        </Grid>
        <Grid item xs={12} style={{ marginTop: "25px" }}>
          <CurrencySystemRound
            color="#FFE771"
            currency="Bitcoin"
            value="1,234,095"
          />
          <CurrencySystemRound
            color="#5FCC8B"
            currency="Ethereum"
            value="1,234,095"
          />
          <CurrencySystemRound
            color="#EC5B5B"
            currency="Ripple"
            value="1,234,095"
          />
          <CurrencySystemRound
            color="#608EE2"
            currency="Tether"
            value="1,234,095"
          />
        </Grid>
        <Grid item xs={12} style={{ marginTop: "50px" }}>
          <Button
            variant="contained"
            style={{ background: "#6200EA", color: "white" }}
          >
            Save as PDF
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default GraphScreenRight;
