import React from "react";
import { Grid, Paper } from "@material-ui/core";
import GraphScreenLeft from "./GraphScreenLeft";
import GraphScreenCenter from "./GraphScreenCenter";

import { Hidden } from "@material-ui/core";
import randomColor from "randomcolor";
import { useSelector } from "react-redux";
import CurrencySystem from "./CurrencySystem";

const GraphScreen = () => {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  return (
    <>
      <Grid
        container
        style={{
          display: "flex",
          justifyContent: "center",

          overflowY: "hidden",
        }}
      >
        {/* left grid */}
        <Grid item md={3} xs={12}>
          <GraphScreenLeft />
        </Grid>
        {/* center grid */}
        <Grid item md={9} xs={12}>
          <GraphScreenCenter />
        </Grid>

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

export default GraphScreen;
